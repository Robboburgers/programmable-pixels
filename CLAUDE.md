# PROGRAMMABLE PIXELS

A reader and a catalogue. `index.html` is the whole site; `reader.js`
runs every gizmo in it; `catalogue.json` lists what is published;
`GIZMO.md` is the law — what a gizmo is, its schema, its ports.

## Publishing

A gizmo is published by adding its folder under `gizmos/<name>/`
(the .gizmo.json, a zip, ice media as needed) and one entry to
`catalogue.json`. Nothing else changes.

- Never edit a published gizmo; fixes are version bumps, new files.
- Never reuse, renumber or reassign a label. Labels are five hex
  digits (PP-00001 onward); catalogue v0 (PP-001..PP-017) is closed.

## What lives here

`index.html`, `reader.js`, `GIZMO.md`, `manifesto.md` (+ the rendered
pages), `api.md`, `catalogue.json`, `vocabulary.json`,
`gizmos/<name>/`. Nothing else. This repo has no studio — no tools,
no drafts, no process. Bring your own; the reader is free and so is
everything in it.

## Style

Quiet gallery: the media is loud, the page is silent. IBM Plex Mono
for metadata; all identity tokens in `:root`.
