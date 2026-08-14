# PROGRAMMABLE PIXELS — project conventions

Personal broadcast feed of one design director. Everything is a numbered
catalogue piece, Factory Records style. Read this before touching anything.

## Architecture

- Static site. One file: `index.html`. No build step, no framework, no backend.
- The entire site renders from the `POSTS` array at the top of the script.
- Each post has a `type`; each type has a renderer in the `R` map.
- Publishing = appending one object to `POSTS`. That is the whole CMS.

## Catalogue rules (IMMUTABLE)

- Every entry gets the next hex catalogue number: PP-001, PP-002 ... PP-00A ... PP-0FF.
- Numbers are NEVER reused, renumbered, or reordered — even if a piece is removed.
- Everything gets a number: works, tools, the site itself (PP-001), the mailing list (PP-002).
- `date` = the day the piece entered the catalogue (ISO, YYYY-MM-DD). Also immutable.
- Display order in the feed is newest-first and is independent of catalogue order.
- When adding a post, check the highest existing number in POSTS and increment in hex.

## The factories (asset pipeline)

The owner runs other repos: an art machine, a games machine (BeltMiner),
a story machine (novels), and Blender via MCP. This repo is FRONT OF HOUSE ONLY.

- Factories stay private and messy. Only FINISHED artefacts cross into this repo.
- Finished artefacts land in `assets/`, named by catalogue number:
  `assets/pp-008.webm`, `assets/pp-009.png`, `assets/pp-00a.mp3`.
- Then one object is appended to POSTS pointing at the asset:
  - artwork  → `{ type:"image", src:"assets/pp-009.png", ... }`
  - render   → `{ type:"video", src:"assets/pp-008.webm", poster:"assets/pp-008.jpg", loop:true, ... }`
  - excerpt  → `{ type:"text", ... }` (story machine output)
- Keep assets web-weight: video as short WebM/H.264 loops, well under 100MB,
  images compressed (webp/avif preferred). Pages is not a render farm.
- Never copy factory source files, .blend files, or working documents here.

## Post schema

```js
{ cat:"PP-008", date:"2026-08-15", type:"webgl|cracktro|text|music|game|video|lock",
  title:"...", tags:["...","..."], /* plus type-specific fields */ }
```

## Design rules

- Quiet gallery style: neutral ground, hairline dividers, small mono meta row.
  The MEDIA is loud; the PAGE is silent. Do not add decoration, cards, or shadows.
- Type: Univers / Helvetica Neue Bold display stack (falls back to Inter),
  IBM Plex Mono for all metadata. Do not substitute fonts.
- All identity tokens live in `:root` CSS custom properties. Change them there only.
- Interactive pieces must work on tap (mobile-first) and respect prefers-reduced-motion.
- Never use localStorage/sessionStorage. State lives in memory or in the file.

## New post types

Add a renderer to `R`, CSS if needed, and a self-contained IIFE for behaviour.
Each piece's JS must be independently deletable without breaking others.

## Deployment

- GitHub Pages from main branch root. `index.html` is the site.
- Custom domain via CNAME file + registrar DNS when the owner provides the domain.

## Roadmap (do not build ahead of the owner's request)

1. NOW: repo + Pages + domain.
2. NEXT: wire the follow form (Buttondown or Formspree).
3. LATER: per-piece pages (`/pp-006.html`) so each catalogue number has a URL.
4. MARKETPLACE: attach Stripe Payment Links or Shopify Buy Buttons to catalogue
   pieces — sell editions of numbered works. Catalogue permanence is the product.
