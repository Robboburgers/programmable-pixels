# GOAL — Prose

Done looks like:

1. **Built to the bench schema** — `prose.gizmo.json`, class Transform,
   typed in/out ports, `code` body, DNA with content hash.
2. **Runs on `t` alone** — pure function of (params, inputs, t); no clock,
   no state, no globals; same text + same t = same outputs in any reader.
3. **The signature ports work** — `density` samples the whole text,
   `progress` advances and loops, the boundary triggers fire exactly when
   the playhead crosses letters / vowels / spaces / stops / blank lines,
   `rhythm` moves with the text's syllable density.
4. **Wirable** — a float out-port drives another gizmo's param through
   reader.js type matching.
5. **Verdict written, then stop.** No label, no POSTS, no assets. The
   operator labels.

Pass condition: all five, verified in Node against reader.js.
