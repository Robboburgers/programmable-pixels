# IDEA — the live studio: tweak gizmos on the site with Claude

Near-term. Written 15 August 2026. Lives in `ideas/`. Buildable after
reader.js exists.

## The picture

The operator opens their own site, turns on a mode, and talks to Claude
beside a running gizmo: "heavier, slower, more grain." Claude rewrites the
gizmo's `expr` body, the reader hot-reloads it, the stage shows it. No
test bed; the site is the runtime. Keep it and it becomes a new version
with lineage pointing at the old one. The gizmo evolves in public and
carries its history.

## What it is, in gizmo terms

Three small things:

1. **Hot-reload in the reader**: replace a loaded gizmo's body at runtime
   without restarting the graph. One function.
2. **LLM as a gizmo**, not Claude specifically: a Transform. In: `words`
   (instruction + current body + the gizmo's DNA + GIZMO.md). Out:
   `words` (new body). Its `apis` block declares the endpoint, cost per
   call, and `key_name`. Anthropic, OpenAI, or a local model (Ollama,
   llama.cpp) are the same shape; swap the gizmo, keep the wire. Nothing
   in this mode may require a paid key to work, only to work better.
3. **Talk to it**: Mic → Whisper → LLM → hot-reload is a four-gizmo patch.
   Whisper is a Transform, audio `field` in, `words` out, local or API,
   declared in `apis`. Click a gizmo, hold to talk, watch it change. The
   dictation box under the piece is that patch's UI, focused on the
   clicked gizmo so the LLM's input carries *this* body, *this* why.

The DNA is the context. A local model with a good folder in front of it
does better than a big model with nothing. That is the "context lives in
the data" rule earning its keep.

## Rules that keep it safe

- **The key is never in the repo.** Operator mode holds the key in the
  browser's local storage on the operator's machine only. Visitors never
  see the mode. Everyone can wire and box; only the operator can rewrite.
- **Site shows, studio makes.** Live edits go to a `work/` copy the reader
  loads beside the published version. Nothing on the public site changes
  until `/publish` writes across with a new version and lineage. Feels
  live; commits stay proper.
- **Liquid only.** Bodies of type `expr` can be edited live. Scripts
  (Blender, Python) still go through the studio.
- **Sandbox holds.** A rewritten body is still sandboxed and still pure:
  ports and `t` only. If Claude writes something that reads a global, the
  reader refuses it, same as any gizmo.

## Why it matters

It is the "live code" strand of the catalogue made real, and the first
intelligence-as-gizmo. A stranger who clones the site and points the LLM
gizmo at a local model has a live studio too, for free. That is the clone
promise extended to making.
