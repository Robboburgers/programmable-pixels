# THE MANIFESTO — why gizmos

*Assembled 15 August 2026 from the operator's dictations and the documents
built around them. Robbo's words are quoted verbatim; nothing here is new.
Each section cites its source. GIZMO.md is the law; this is the reason.*

---

## 1. What a gizmo is

Four lines, banked to Robbo's notebook first, in his hand:

> **A gizmo is a function.**
> **A patch is a nested expression.**
> **The tick re-evaluates it forever.**
> **The juice is the return value.**

A gizmo is not a picture, a demo, or an effect. It is a node: a piece of
mathematics with typed ports, which computes and returns a value. The test:
*can another gizmo be plugged into it, and can it be plugged into another
gizmo?* If no, it isn't a gizmo. It's a screensaver.

A gizmo that renders an image and stops is a dead end — nothing can consume
it, nothing can drive it.

> *"A sprite is an answer. An equation is the question, still open."*
> *"Bake what doesn't need to be asked. Keep everything else a question."*

`creative_os/sessions/the-sticker-album-session.md · the_bench/the_gizmo_method.md · THE-OPEN-LETTER.md (Robbo, dictated)`

---

## 2. The stud

Robbo's Lego insight:

> Nobody asks whether a red sixer is *compatible* with a yellow twelver.
> The question doesn't exist. Not because the bricks are the same — they're
> wildly different — but because they all share **one thing: the stud**.
>
> Standardise the boring part (how things connect)
> and the interesting part (what things ARE) goes gloriously feral.

A kid's mishmash Lego house — yellow bricks, red bricks, sixers, long
twelvers, nothing uniform — is only possible because the connection standard
is absolute. The chaos isn't a bug. **The chaos is the reward.**

**Standardise the stud. Liberate the brick.**

`creative_os/manifesto/06-the-stud.md (the Lego insight is Robbo's)`

---

## 3. The wire

What travels down the wire between two gizmos? Robbo, dictated, 16 July 2026:

> You're asking what travels down it, but it tells you.
>
> Every parcel on the wire carries two things: what it is, and the thing
> itself.
>
> If it's BPM, it says BPM and it's a value — a hundred and twenty. If it's
> a clock, it says clock and it's the tick. If it's the news, it says words
> and it's the words someone's written. If it's music, it's the MIDI notes.
> If it's a fractal, it's the equation for the fractal — the maths, a way of
> describing it.
>
> The wire never needs to know. The parcel says what it is.
>
> `{shape, value}` — the label, then the cargo. MIDI, not WAV.

The shape is the type of the *meaning*, not the type of the storage — a bpm
and a percentage are both floats and must never bind. Two ports connect when
their shapes match. Mismatch does not wire. Nothing else is checked, because
**every dead protocol died of helpfulness**.

> ### The driver is swappable. The engine isn't.

`creative_os/manifesto/00-the-wire.md (Robbo, dictated) · THE-OPEN-LETTER.md`

---

## 4. Liquid and ice

The words arrived mid-play, dictated over a running gizmo, 22 July 2026:

> This is what we call the liquid, the water version. It's the mathematical
> version, but we've got a way of making ice, freezing ice, and that's baked
> pixels.

And the same day, the way back:

> How can we bring in renders and use the values in them to drive other
> things as well? So then the ice gets liquefied again and becomes a driver.

The rule, in Robbo's words, verbatim from the factory's birth certificate:

> **"Render = freeze. Reader = melt."**

The repo carries only liquid — patches, gizmo JSONs, code, the trail. Ice
stays local, or is sold. A published catalogue piece is ice; the gizmo behind
it is liquid and free. Why liquid wins, Robbo, dictated:

> "Every image I create has embedded in it the means to make that image
> again. Everything I make becomes a palette of building blocks, and they
> forever cross-pollinate each other, and the library just grows. And
> mutates."
>
> "Binaries are fossils. Text is alive."

`the_bench/dictation/2026-07-22-0655-world-engine-first-look.md · 2026-07-22-1301-hot-load-test.md (Robbo, dictated) · makers-factory/FOUNDING-BRIEF-the-makers-factory.md · creative_os/sessions/correspondence/REPLY-TO-CLOAKHOUSE-the-wire.md (Robbo, dictated) · GIZMO.md`

---

## 5. Time and the tick

The tick re-evaluates it forever. Time is a graph input, not a global: the
loop produces `t` and passes it *into* evaluation. Gizmos take `t` as an
argument; they never read a clock themselves. This is what makes freezing,
scrubbing, baking and tweening possible later.

The tick supplies the time. No timestamp needed — the value on the wire is
always now. If you want history, that's a gizmo.

This was earned, not theorised. A flow field whose canvas never clears, where
every mark is permanent — Robbo drove it and said:

> "It's got to a point and kind of frozen — I've got to play with the tools
> before it gets to the point of no return."

A thing with no clock and permanent ink cannot be driven. It can only be
witnessed and restarted. **The tick is what makes a thing playable.** He
found that by trying to play something that had no tick.

`the_bench/the_gizmo_method.md · THE-OPEN-LETTER.md (Robbo quote from t06_207)`

---

## 6. The reader

Nodes compute. Only the viewport draws. Every node is a pure function: takes
inputs, returns a value — a node never touches a canvas. Rendering happens in
exactly one place, the one Sink that owns the canvas and the loop, walks
upstream, evaluates the graph, and paints.

That Sink, grown up, is the reader: it watches a folder, loads every gizmo,
resolves wires by type, ticks the graph. It has no opinion on appearance and
no networking. On a self-owned page you build the Sink; in a host
application, the host is the viewer. Who owns the heartbeat is the only thing
that changes when a gizmo travels — and it's precisely why gizmos are
portable in the first place.

`the_bench/the_gizmo_method.md · GIZMO.md`

---

## 7. The swap

The truest statement of what all this is:

> Football stickers with your mates. "Got, got, got, need, need, got." Two
> kids, two folders, a live diff run in your head, and a trade that settles
> itself — no shop, no ledger, no middleman. That is the whole economy, and
> a seven-year-old runs it with no software at all.
>
> Bluejacking on the train, when Bluetooth was new. Making little gifts for
> phones that couldn't even hold a video, scanning the carriage for who had
> Bluetooth on, asking to pair, the stranger going "what the hell" and then
> "okay." Look in my folder, I'll look in yours. Wanna swap?

This invents no new behaviour. It removes the friction from what humans
already do the instant you hand them the barest tools: make, share, scan,
swap. The instinct is pre-baked. The OS just gives it better cables. And it's
*warm* — mates in a playground, a stranger saying okay — because when there's
no gatekeeper, sharing is just curiosity about each other's stuff.

The playground is the system. Gizmos are the stickers. "Got, got, got, need"
is the search engine. Nobody stands at the fence taking a coin off every
swap.

It grows by agreement, not force — the way a word grows. One person uses it,
it's useful, someone else uses the same one so their things fit, a scene
condenses around a shared shape. N=2 is the whole strategy, not a humble
start: two people agreeing on a cable end and it's already alive.

`creative_os/manifesto/CREATIVE-OS-MANIFESTO.md (Robbo's frame, recorded) · creative_os/sessions/the-sticker-album-session.md`

---

## 8. Free

> A shared language of cable ends. Coalesce around the same ones and it
> grows. What flows through can be anything — and that it doesn't matter
> what's inside is the whole point, because there's nothing inside to own.

You can't buy a handshake. MIDI proved it: a 1983 agreement about the shape
of the holes, still standing forty years later while every instrument and
company inside it came and went. The cable ends outlived all of it precisely
because they stayed empty.

Free to make, free to share; swap is the native trade. Gizmos copy for
nothing, so worth rides a gift-and-swap economy, not scarcity. And it should
stay too small to take:

> "Creative OS shouldn't be a platform — it should be a protocol so small it
> can't be owned. You can't hijack a handshake."
>
> "Every gizmo is a two-way jack. The world stops broadcasting at you the
> moment you can patch back."

> Everything here is free: the gizmos, this map, and the reader. Clone it,
> build, share. Free is not a kindness, it is what makes the swap work.

`creative_os/sessions/the-sticker-album-session.md · CREATIVE-OS-MANIFESTO.md · the-yellow-wire-session.md (Robbo) · GIZMO.md`

---

## Not yet written

Lines the operator has said but never dictated to a file, flagged in the
vision doc as TODO. They belong here, in his words, when he records them:

- "Constraints create features" — the exact wording.
- "Your weird is your worth."
- "Money moves or it's not money."
- "One brick at a time."
- The house line — "all the bricks are different colours, but it's still a
  house, and it's your house."

`creative_os/manifesto/01-vision.md (TODO list)`
