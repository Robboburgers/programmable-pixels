# TRIAGE — Prose

Status: **short triage with the operator still owed** (the brief asks for it
"to fix the port list, especially whether `rhythm` and `syllable` feel
right"). This file records the build-time reasoning; the operator's verbatim
reads replace it on triage.

Why this shape, against the dictation:

- Two families on one gizmo — the whole (constant) and the playhead (per
  tick) — because a shader wants the text's shape at once (`density`) while
  a sequencer wants this moment (`rhythm`, the triggers).
- Everything computable from characters and punctuation alone: no
  dictionary, no meaning, deterministic in any reader. Meaning is a second
  gizmo (Lexicon); files are a third (File). Two studs, not one blob.
- `density`, `rhythm` and the four boundary triggers are the reason it
  exists. The rest ships anyway, per the every-port-that-could-connect rule.
- `syllable` is a vowel-group heuristic — honest, not perfect, per the brief.

Kills: none declared.
