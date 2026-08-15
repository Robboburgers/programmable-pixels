# RECONCILE — GIZMO.md v1 vs what is built

Repo Claude, 15 August 2026. Evidence from `index.html`, `tools/`, `gizmo-analysis.md`.
Incorporates `amendments.md` (free-clause, repos-and-swaps, flat-folder rule → §7).

## 1. Schema

All 165 site gizmos (PP-018–PP-01D hand-published, PP-01E–PP-0BC generated) are
**Family B** — the makers-factory `do_pixel` seed library, whole. They were
normalised into a site-local flat shape in POSTS:
`{cat, date, type:"gizmo", title, tags, do_pixel, params, dna:{author, tags, why}}`.
This is neither Family B nor bench schema: no `class`, no `body`, and **no ports
at all** — the source's `outputs:{image:"image"}` was stripped in mining. Params
are bench-style `{value,min,max}` (`step` dropped), not v1's `{default,range?}`
— note GIZMO.md's own file spec contradicts the "bench schema is canon" ruling
here. Port vocabulary actually used on site: none. Wider corpus uses `number`,
`trigger`, `words`, `frame`, `image`, `rgba_image` (Family A) and `field`,
`particles`, `vec2`, `visual` (bench). v1's list covers most; missing/undecided:
`number`→`float` rename touches ~500 Family A gizmos, and `frame`/`rgba_image`
have no v1 home. Undecided: is a `do_pixel` gizmo's output `field` (fn of x,y,t
— what it truly is) or `image` (what the source declared)?

## 2. DNA

All 165 carry `dna.why` — **prose**, verbatim from source, often with citations
(iquilezles.org, Book of Shaders) — plus `dna.tags` and `dna.author`. Zero carry
`because`, verbs/nouns, `lineage`, `chemistry`, `history`, `id`, `version`, or
`gizmo_md`. v1 restructures `why` as `{verbs, nouns, kills, because}`; the
corpus's 165 prose whys don't decompose into that and are too good to lose —
suggest they map verbatim into `because`. Also: the wider corpus's `lineage`
grammar (`"parent -> child : MUTATION -- reason"`, ~200 snowball gizmos) is
richer than v1's `[ids]` — v1 should keep the string form alongside the ids.

## 3. Wiring

None. There is no reader.js and no graph. The engine is one IIFE in
`index.html:1178-1339`: per gizmo it compiles `do_pixel` via `new Function`,
renders a 256×256 ImageData loop, wires sliders to params, gates on
IntersectionObserver. Each gizmo is standalone — nothing matches the bench
runtime (no instantiate/connect/pull). Two things the reader.js refactor must
preserve: (a) `t` is an **integer frame counter** (+1 per rAF, per gizmo,
pauses offscreen) — all 165 expressions are speed-calibrated to that scale
(`t * 0.03` etc.); a seconds-based clock changes every piece. (b) The site
grew the expression language beyond the documented set: `turbulence2`,
`voronoi2`, `cellnoise2`, `fract`, `tan`, `acos`, `round` (see
`tools/gizmo-audit.json` unknown_funcs). v1 never defines the `expr` built-in
set — without one, "content hash = identity across readers" is hollow, since
the same body means different things in different readers. Also `noise2` is
seeded from `Math.random()` per page load, so identical liquid ≠ identical
pixels; fine for art, worth knowing before hashing.

## 4. Identity

By PP number + one-word PascalCase name. No hashes anywhere. No collisions in
the 165 (single source; the 159 batch excluded the 6 already published — see
`tools/generate-gizmo-posts.js`, which assigned PP numbers **alphabetically**,
so catalogue order ≠ creation order within the batch). The wider corpus does
collide: snowball experiments produced convergent duplicates (42% collision
rate) and `legacy/` holds full copies — content hashing will dedupe these,
which is a point in v1's favour. v1's "name is one word; if it needs two it is
two gizmos" would condemn most of the library (DomainWarp, TruchetWeave…) —
needs the explicit ruling that PascalCase counts as one word.

## 5. Ice

The 165 gizmo posts are **pure liquid** — live bodies, no baked renders, and
also no downloadable `.gizmo.json` files: the liquid lives inline in POSTS
only, so "download the JSON alone" has nothing to point at yet. Conversely
PP-008–PP-017 (9 images, 5 videos, 2 texts) are **pure ice** — webp/mp4 baked
from `renders/` (frame stacks for 3 studies are in-repo); their liquid stayed
in the factories, and the site has no link from ice back to liquid. No piece
currently has both forms.

## 6. Disagreements

- **`why` shape** (biggest): v1's verbs/nouns extraction exists for zero of
  680 corpus gizmos; the prose `why` exists for hundreds. Keep prose as
  first-class (`because`), treat verbs/nouns as an additive layer built later.
- **Params**: v1 file spec says `{default, range?}`; bench canon and all 165
  site gizmos say `{value,min,max,step}`. Pick bench, fix GIZMO.md.
- **Ports for do_pixel gizmos**: "ship every port that could physically
  connect" means retrofitting 165 gizmos; needs the `field` vs `image` ruling
  first, and a decision on whether params become input ports (they are the
  obvious wiring surface for number-producing gizmos).
- **Undefined expr runtime**: v1 must pin the built-in function list and the
  `t` convention (frames, per the corpus) or cross-reader identity fails.
- Not a disagreement, but missing prior art v1 should absorb: the corpus's
  `plays_well_with` already behaves as v1's `history` (observed wirings,
  set-union merged) — migration is a rename, not an invention.

## 7. Flatness (per amendments)

No site gizmo references another by name or path — zero cross-imports; every
body is a closed expression over its own params. But they are not
self-contained either: they lean on **reader-provided helpers**. Of the 159
audited, 21 call `noise2`, 13 `turbulence2`, 4 `voronoi2`, 3 `cellnoise2`
(plus 2 of the original 6 use `noise2`); nearly all use `clamp`/`smoothstep`/
`fmod`. These live in the reader (`index.html:1183-1244`), not in any gizmo.
So a travelling folder works when it lands **only if the receiving reader
implements the same built-ins** — the flat-folder rule holds for gizmo→gizmo
but moves the burden onto GIZMO.md pinning the expr built-in set (same gap as
§3). The helpers are small (~60 lines total); an alternative ruling is to
inline them into each travelling folder, trading purity for weight.

Awaiting operator rulings before touching site, POSTS, or numbers.
