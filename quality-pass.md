# QUALITY PASS — all 165 gizmos against the final runtime

Task logged per amendments-03 §3; opened 15 August 2026 when the reader.js
refactor landed. The runtime is now final (reader.js is the only engine),
so the pass can start whenever the operator says go.

## Method so far

Automated sweep through reader.js in Node: compile, evaluate 32×32 grid at
several ticks, check finite, check not flat. Results: **165/165 compile and
evaluate, zero non-finite values, 161/165 produce varying pixels.**

## Findings (all pre-date the refactor — verified black/broken under the
legacy engine too)

1. **PP-036 Cracked Mud — black.** Body calls `voronoi2(x, y, nth, jitter)`
   (4-arg F1/F2 cellular noise). No engine ever implemented the 4-arg form;
   extra args are ignored, so f1 === f2, border = 0, output 0. Fix: add an
   F1/F2 voronoi built-in (a named event — new built-in needs the operator's
   nod) or rewrite the body on 2-arg voronoi2.
2. **PP-0B3 Voronoi Glow — black.** Same 4-arg voronoi2 cause: f1/f2 ratio
   is always 1, glow always 0.
3. **PP-0B4 Voronoi Rings — renders, but the `jitter` slider is dead.** Same
   cause, milder symptom: nth=0 degrades to nearest-distance which works,
   jitter arg ignored.
4. **PP-07F Phase Field — black.** Body masks on `-noise2(...)` expecting
   signed noise in [-1,1]; the site's noise2 (legacy and reader alike)
   returns [0,1], so the mask is always 0. Fix: body becomes
   `(0.5 - n) * 2` style remap, or a signed-noise built-in.
5. **PP-088 Radial Bands — black.** Body multiplies
   `smoothstep(w,0,band_pos) * smoothstep(w,0,1-band_pos)` — the two
   conditions (band_pos < w AND band_pos > 1-w) can never both hold.
   Logic bug from mining; likely intended `+` or a min-distance form.

## Not yet done

- Visual pass (do the other 160 look right, not just vary).
- Slider-range pass (params that do nothing across their range).
- Body fixes for the five above — body edits change content hashes, so fix
  before ids are relied on for swaps, and record the change as a version
  bump in DNA.
