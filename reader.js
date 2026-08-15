/* ============================================================
   reader.js — the plugging engine. PP-0BE candidate; not yet numbered.

   The reader: loads gizmo definitions, resolves wires by type,
   ticks the graph pull-based with per-tick caching. No opinion on
   appearance, no networking. The website is the first instance.

   Contract (GIZMO.md v1):
   - A gizmo declares typed in/out ports and can be ticked.
   - Parcels are {type, value}; ports connect only on type match.
     Union exception: `visual` accepts `field` or `particles`.
   - Params double as float in-ports. A float arriving on a param
     port is clamped to 0..1 and mapped onto the param's [min,max].
   - `t` is an integer frame counter owned by the reader. Gizmos
     never read a clock.
   - expr built-ins v1 (pinned): sin cos tan acos sqrt abs atan2 PI
     floor ceil round min max pow exp log clamp smoothstep fmod
     fract noise2 turbulence2 voronoi2 cellnoise2.
   - noise2 is seeded with a fixed seed: identical liquid renders
     identical pixels on every reader.
   ============================================================ */
(function (global) {
  "use strict";

  /* ---- deterministic noise (fixed seed 0x50503001) ---- */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const perm = new Uint8Array(512);
  (function () {
    const rnd = mulberry32(0x50503001);
    const p = [];
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  })();
  function grad2(h, x, y) {
    const u = h < 4 ? x : y, v = h < 4 ? y : x;
    return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
  }
  function noise2(x, y) {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
    x -= Math.floor(x); y -= Math.floor(y);
    const u = x * x * x * (x * (x * 6 - 15) + 10),
          v = y * y * y * (y * (y * 6 - 15) + 10);
    const a = perm[X] + Y, b = perm[X + 1] + Y;
    return .5 + .5 * (
      (1 - v) * ((1 - u) * grad2(perm[a] & 15, x, y) + u * grad2(perm[b] & 15, x - 1, y))
      + v * ((1 - u) * grad2(perm[a + 1] & 15, x, y - 1) + u * grad2(perm[b + 1] & 15, x - 1, y - 1))
    );
  }

  /* ---- expr built-ins v1 ---- */
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function smoothstep(e0, e1, x) { const t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); }
  function fmod(a, b) { return a - b * Math.floor(a / b); }
  function fract(x) { return x - Math.floor(x); }
  function turbulence2(x, y, oct) {
    oct = oct || 4;
    let val = 0, amp = 1, freq = 1, total = 0;
    for (let i = 0; i < oct; i++) {
      val += amp * Math.abs(noise2(x * freq, y * freq) * 2 - 1);
      total += amp; amp *= 0.5; freq *= 2;
    }
    return val / total;
  }
  function voronoi2(x, y) {
    const ix = Math.floor(x), iy = Math.floor(y);
    const fx = x - ix, fy = y - iy;
    let md = 8.0;
    for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) {
      const ox = i + fract(Math.sin((ix + i) * 127.1 + (iy + j) * 311.7) * 43758.5453) - fx;
      const oy = j + fract(Math.sin((ix + i) * 269.5 + (iy + j) * 183.3) * 43758.5453) - fy;
      const d = ox * ox + oy * oy;
      if (d < md) md = d;
    }
    return Math.sqrt(md);
  }
  function cellnoise2(x, y) {
    return fract(Math.sin(Math.floor(x) * 127.1 + Math.floor(y) * 311.7) * 43758.5453);
  }

  const BUILTINS = {
    sin: Math.sin, cos: Math.cos, tan: Math.tan, acos: Math.acos,
    sqrt: Math.sqrt, abs: Math.abs, atan2: Math.atan2, PI: Math.PI,
    floor: Math.floor, ceil: Math.ceil, round: Math.round,
    min: Math.min, max: Math.max, pow: Math.pow, exp: Math.exp, log: Math.log,
    clamp, smoothstep, fmod, fract,
    noise2, turbulence2, voronoi2, cellnoise2
  };
  const BUILTIN_NAMES = Object.keys(BUILTINS);
  const BUILTIN_VALUES = BUILTIN_NAMES.map(k => BUILTINS[k]);

  /* ---- expr compiler ----
     Statements split on ";", bare assignments become vars, the last
     expression is the return value. Same grammar for float bodies
     (ignore x,y) and field bodies. */
  function compile(src, paramNames) {
    const stmts = src.split(";").map(s => s.trim()).filter(Boolean);
    const body = [];
    for (let i = 0; i < stmts.length - 1; i++) {
      const eq = stmts[i].indexOf("=");
      if (eq > 0 && !/[=!<>]/.test(stmts[i][eq - 1]) && stmts[i][eq + 1] !== "=") {
        body.push("var " + stmts[i]);
      } else {
        body.push(stmts[i]);
      }
    }
    body.push("return (" + stmts[stmts.length - 1] + ");");
    const args = ["x", "y", "t"].concat(BUILTIN_NAMES).concat(paramNames);
    return new Function(...args, body.join("\n"));
  }

  const TYPE_OK = (from, to) =>
    from === to || (to === "visual" && (from === "field" || from === "particles"));

  /* ---- the runtime ---- */
  function createReader() {
    const nodes = new Map();
    const wires = [];

    function instantiate(id, def) {
      const params = def.params || {};
      const paramNames = Object.keys(params);
      const outs = (def.ports && def.ports.out) || [];
      const src = (def.body && (def.body.expr || def.body.do_pixel)) || def.do_pixel;
      const codeSrc = (def.body && def.body.code) || def.code;
      let fn, kind;
      if (codeSrc) {
        /* bench-schema code body: a full JS function (params, inputs, t)
           returning a {port: value} map — the multi-output form */
        kind = "code";
        fn = new Function("return (" + codeSrc + ")")();
      } else if (src) {
        kind = "expr";
        fn = compile(src, paramNames);
      } else {
        throw new Error(id + ": no body");
      }
      const values = {};
      for (const k of paramNames) {
        const p = params[k];
        values[k] = p.value !== undefined ? p.value : p.default;
      }
      nodes.set(id, { id, def, fn, kind, params, paramNames, values,
                      inputValues: {}, outs,
                      outName: outs[0] ? outs[0].name : "out",
                      outType: outs[0] ? outs[0].type : "float",
                      cacheT: null, cacheV: null });
      return nodes.get(id);
    }

    /* Adapt a site POSTS gizmo (do_pixel) into a node: params become
       float in-ports, the single output is a field. */
    function fromPost(id, post) {
      return instantiate(id, {
        name: (post.title || id).replace(/\s+/g, ""),
        class: "Generator",
        ports: {
          in: Object.keys(post.params || {}).map(k => ({ name: k, type: "float" })),
          out: [{ name: "field", type: "field" }]
        },
        params: post.params || {},
        body: { expr: post.do_pixel }
      });
    }

    function inPortType(node, name) {
      const declared = node.def.ports && node.def.ports.in &&
        node.def.ports.in.find(p => p.name === name);
      if (declared) return declared.type;
      if (node.params[name]) return "float"; // params double as float in-ports
      return null;
    }

    function connect(fromId, fromPort, toId, toPort) {
      const from = nodes.get(fromId), to = nodes.get(toId);
      if (!from || !to) throw new Error("no such gizmo: " + (from ? toId : fromId));
      const outDecl = from.outs.find(p => p.name === fromPort);
      if (!outDecl) throw new Error(fromId + " has no out port " + fromPort);
      const toType = inPortType(to, toPort);
      if (toType === null) throw new Error(toId + " has no in port " + toPort);
      if (!TYPE_OK(outDecl.type, toType))
        throw new Error("no match: " + outDecl.type + " ≠ " + toType);
      const wire = { fromId, fromPort, toId, toPort };
      wires.push(wire);
      to.cacheT = null; // the wire takes effect this tick, not the next
      return wire;
    }

    /* Remove a wire made by connect. Accepts the wire object or a
       matching {fromId, fromPort, toId, toPort}. */
    function disconnect(wire) {
      let i = wires.indexOf(wire);
      if (i < 0) i = wires.findIndex(w =>
        w.fromId === wire.fromId && w.fromPort === wire.fromPort &&
        w.toId === wire.toId && w.toPort === wire.toPort);
      if (i < 0) return false;
      wires.splice(i, 1);
      const to = nodes.get(wire.toId);
      if (to) to.cacheT = null;
      return true;
    }

    /* Pull one node's output at tick t. Cached per tick; a float
       feeding a param port is clamped 0..1 and mapped to [min,max]. */
    function pull(id, t, _seen) {
      const node = nodes.get(id);
      if (!node) throw new Error("no such gizmo: " + id);
      if (node.cacheT === t) return node.cacheV;
      _seen = _seen || new Set();
      if (_seen.has(id)) throw new Error("cycle at " + id);
      _seen.add(id);

      const values = Object.assign({}, node.values);
      const inputs = Object.assign({}, node.inputValues);
      for (const w of wires) {
        if (w.toId !== id) continue;
        let v = pull(w.fromId, t, _seen);
        const fromNode = nodes.get(w.fromId);
        if (fromNode.kind === "code") v = v[w.fromPort]; // multi-output: pick the port
        const p = node.params[w.toPort];
        if (p && p.min !== undefined && p.max !== undefined) {
          values[w.toPort] = p.min + clamp(v, 0, 1) * (p.max - p.min);
        } else if (p) {
          values[w.toPort] = v;
        } else {
          inputs[w.toPort] = v;
        }
      }

      let out;
      if (node.kind === "code") {
        const paramObj = {};
        node.paramNames.forEach(k => { paramObj[k] = values[k]; });
        out = node.fn(paramObj, inputs, t); // {port: value} map
      } else {
        const pArr = node.paramNames.map(k => values[k]);
        if (node.outType === "field" || node.outType === "visual") {
          out = (x, y) => node.fn(x, y, t, ...BUILTIN_VALUES, ...pArr);
        } else {
          out = node.fn(0, 0, t, ...BUILTIN_VALUES, ...pArr);
        }
      }
      node.cacheT = t; node.cacheV = out;
      return out;
    }

    function setParam(id, name, v) {
      const node = nodes.get(id);
      if (node) { node.values[name] = v; node.cacheT = null; }
    }

    /* static value on a declared in-port (e.g. Prose.text when nothing
       is wired into it); a wire on the same port wins per tick */
    function setInput(id, name, v) {
      const node = nodes.get(id);
      if (node) { node.inputValues[name] = v; node.cacheT = null; }
    }

    /* hot-reload: replace a loaded gizmo's definition at runtime without
       restarting the graph. Wires survive — they bind to the id, not the
       node. Current param values and static inputs carry over where the
       names still exist. A bad body throws and the old node stays. */
    function reload(id, def) {
      const old = nodes.get(id);
      let node;
      try {
        node = instantiate(id, def);
      } catch (e) {
        if (old) nodes.set(id, old);
        throw e;
      }
      if (old) {
        for (const k of node.paramNames)
          if (k in old.values) node.values[k] = old.values[k];
        for (const k in old.inputValues)
          node.inputValues[k] = old.inputValues[k];
      }
      return node;
    }

    return { instantiate, fromPost, connect, disconnect, pull, setParam, setInput, reload, nodes, wires };
  }

  const api = { createReader, compile, BUILTINS, BUILTIN_NAMES, noise2 };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  global.Reader = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
