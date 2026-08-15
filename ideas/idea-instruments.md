# IDEA — the instruments: a phone opened up as gizmos

Intent and direction. Written 15 August 2026. Lives in `ideas/` with
idea-nostr.md and idea-home-screen.md. This one is not "not yet": it is
the direction the catalogue takes next, and Repo Claude should read it as
a brief for what kinds of gizmo to want.

## The idea

A phone is a box of instruments dressed up as apps. Camera, microphone,
GPS, accelerometer, gyroscope, compass, light sensor, clock, radio, speaker,
screen. Each one is hidden behind an app that decides what it is for.

Strip the apps back. Every instrument becomes a gizmo: a source with typed
output ports, no opinion about what it is for. The camera is a gizmo that
emits `image` at `t`. The accelerometer emits `vec2` (or three floats). The
mic emits a `field` of amplitude over time. GPS emits floats. Then a clock
is a Generator, an RSS feed is an API gizmo emitting `words`, a voice
recorder is a mic gizmo wired to a store gizmo, a radio is a stream gizmo
wired to a speaker Sink. None of these is an app. Each is a function you
can read, wire, swap and improve, and each carries a why.

The good stuff happens when instruments meet gizmos that were never meant
for them: the camera's image driving a shader, the accelerometer driving a
sequencer, the compass driving Dustfield. That is what the catalogue is
for.

## What goes in the catalogue

Two families of new gizmo, both published to Programmable Pixels:

**Instrument gizmos (sources).** One per sensor or radio the browser can
reach: camera, mic, gps, accel, gyro, compass, light, battery, clock,
speaker, screen, storage, bluetooth, nfc, notification, rss/http. Each is
a thin, honest wrapper: declared ports, declared permissions in the `apis`
block (permission is a cost), no processing, no styling. These are the
studs on the phone. Where the site can't reach the hardware (desktop
without a compass), the lane says so and offers a stand-in Generator so
the patch still runs.

**Instrument pieces (containers).** Named things built from them: a clock,
a calendar, a radio, a voice recorder, a camera toy that does one strange
beautiful thing. Each is a Container with a why. Each is a demonstration
that a phone "app" is a patch. Each gets a label.

## Rules that already cover it

Nothing new in GIZMO.md. Instruments obey the stud, emit `{type, value}`,
take `t`, read no globals. Permission and battery are declared under
`apis` as cost. Sandbox holds: an instrument gizmo from a stranger can
only reach its ports, so it cannot exfiltrate the camera. That is a better
model than app permissions and it is free from the design.

One addition to consider for GIZMO.md v2: an `instrument` class, or a
`hardware` tag, so readers can tell a source that reads the world from a
Generator that makes it up. Flag for the operator.

## Order

1. Clock and mic first: simplest, run everywhere, and prove the
   `apis`/permission block.
2. Camera and accelerometer: the ones that make crazy pieces.
3. RSS/http: the first outward-facing API gizmo, proves cost and
   last_seen_working.
4. Then the containers: a radio, a calendar, a recorder, one camera toy.
   Each is a catalogue number.

Each of these is a /gizmo run with a short dictation and triage, so the
why is real. Not /breed: instruments are deliberate.

## Where it goes

These are the gizmos the home screen is made of. Build them for the site
first, where they can be tried in a browser and swapped as stickers. When
the launcher exists, they are already the OS. When the Linux phone exists,
they are the phone.

Creative OS is this: a phone whose instruments are readable, whose pieces
are patches, whose reasons travel with them, and which anyone can clone
and give away.
