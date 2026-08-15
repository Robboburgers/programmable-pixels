# API — reading the catalogue

- `catalogue.json` — every published gizmo: label, ports, params, body, DNA.
- `gizmos/<name>/<name>.gizmo.json` — one gizmo, the liquid, ready for any reader.
- `gizmos/<name>/<name>.zip` — the folder: gizmo + provenance + GIZMO.md.
- `vocabulary.json` — the verb/noun/kill tables the whys are written in.
- Everything is static files over GET; clone the repo and you have it all.
