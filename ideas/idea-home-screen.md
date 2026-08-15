# IDEA — the gizmo home screen

Intent only. Not for building yet. Written 15 August 2026. Lives in
`ideas/` next to idea-nostr.md.

## The picture

The recursive-subdivision image (nested squares, sage ground, black ink)
is a home screen. Each cell is a gizmo. A cell can be a clock, or a
Container of an API gizmo feeding a shader, or a box of boxes. The whole
screen is one HTML page ticked by one reader. That is a phone whose OS is
a folder of gizmos, all readable, wirable and swappable.

## Why the gizmo model fits an OS

- Ports: the clock drives the wallpaper without either knowing the other.
- APIs block: every "app" declares what it calls and what it costs, so the
  OS can show what everything is doing and spending.
- Purity + sandbox: a gizmo from a stranger's swap runs on your screen and
  can only reach its ports. Better than app permissions, and free from the
  design.

## Near and far

**Near, buildable now:** a launcher. A full-screen web page that is your
home screen, running inside the phone's real OS. It is the site's reader
laid out as a quadtree, with WebGL/WebGPU, sensors, and whatever APIs the
platform allows. This is a good test of the reader on small screens.

**Far, needs the platform's keys:** the reader is the OS, direct to GPU
and radios. Not ours to decide. The design does not change between near
and far, which is the point: build the launcher, and if the keys arrive
it is already the OS.

## What this needs from the base design

Nothing new. It is the site's reader plus the quadtree view from
amendments-02, on a phone. The only thing to keep in mind now: the reader
must be small enough and pure enough to run on a phone with nothing else.
That is already the rule.

## Caution

Do not let this pull design from the front door either. It is where the
lanes-board-output site goes if it works, not a fork.
