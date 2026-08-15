# GIZMO.md — what a gizmo is

Version 1. 15 August 2026. This file travels with every gizmo. If it is in
your folder, these are the rules the gizmo was made under.

Everything here is free: the gizmos, this map, and the reader. Clone it,
build, share. Free is not a kindness, it is what makes the swap work.

## The definition

A gizmo is a node: a piece of mathematics with typed ports, which computes
and returns a value. The test is whether another gizmo can be plugged into
it and it can be plugged into another gizmo. If not, it is a screensaver,
not a gizmo.

A gizmo is sealed behaviour with DNA. The behaviour is the maths. The DNA
is where it came from, why it exists, and who it has met.

## Liquid and ice

Liquid is the maths: the gizmo file, its parameters, the patch it sits in.
Ice is baked pixels: renders, frames, sound files. Freeze turns liquid into
ice. Melt turns ice back into signals that can drive other gizmos.

Repos, downloads and readers carry liquid. Ice stays local, or is sold.
A published catalogue piece is ice; the gizmo behind it is liquid and free.

## The stud

Every gizmo honours one contract, the stud: it declares typed inputs, typed
outputs, and can be ticked. Standardise how things connect and what things
are goes feral. The wire spec outranks the stud if they ever disagree.

## The wire

Every parcel on the wire carries what it is and the thing itself:
`{type, value}`. Two ports connect when their types match. Mismatch does not
wire. Nothing else is checked.

Port types (v1): float, vec2, field, particles, visual, words, trigger,
image. New types are a named event: reuse before you invent, and a new type
is proposed to the reader operator, not silently added.

Every gizmo ships with every port that could physically connect, whether or
not there is a use today.

## Time

Time is a graph input, not a global. A gizmo receives `t`; it never reads a
clock. The reader owns the clock. Tick is the runtime step: evaluate the
graph at `t`, pull-based, cached per tick.

## The file

One gizmo, one file: `<name>.gizmo.json`. Name is one word; if it needs two
it is two gizmos. Fields:

```
name        one word
class       Generator | Transform | Operator | Sink | Container | Driver | Inverter
ports       { in: [{name, type}], out: [{name, type}] }
params      { name: {default, range?} }
body        the maths. One of:
              expr    a JS expression evaluated per tick (runs in a reader)
              script  a path to a file run by an external runtime
                      (Blender, Python) that emits ice
              graph   {instantiate, wire, expose} — a Container
dna         see below
```

## DNA

```
id          content hash of body + ports. The true identity across readers.
label       optional local catalogue label (Programmable Pixels uses PP-XXX
            hex; other readers label as they like). Labels are per reader,
            never global.
author      a name, or {name, npub?, lud16?} — Nostr identity and
            Lightning address, both optional; nothing reads them yet
version     integer, local
gizmo_md    version of this file the gizmo was made under
why         { verbs: [], nouns: [], kills: [], because: "verbatim" }
            verbs and nouns come from vocabulary.json; because is the
            author's own words from taste triage. Written once at creation.
            Read-only after.
source      what taste stone, dictation or parent produced it
lineage     [ids of parent gizmos]   "from -> to : because"
chemistry   [names] who the author thinks it should meet. Editable.
history     [{id, patch, when}] who it has actually been wired to.
            Appended by the reader. Read-only.
apis        [{name, purpose, cost, key_name, last_seen_working}]
            key_name only, never the key. The reader supplies keys.
tags        []
```

Chemistry points forward and is a hope. History points back and is a fact.
They are never the same field.

## The folder

The `.gizmo.json` is the gizmo. The folder is its provenance: everything
human that produced it.

```
<name>/
  <name>.gizmo.json      the gizmo (liquid)
  <name>.py | .js        the script, if body is a script
  GIZMO.md               this file
  images/                reference material
  dictate.md             what it should be, verbatim
  triage.md              why, from taste triage, verbatim becauses
  goal.md                what done looks like: pass condition, shapes implied
  verdict.json           last scored result, if any
```

Downloading the JSON alone gives a working gizmo. Downloading the folder
gives its DNA and its reasons.

## Containers

A Container is a gizmo whose body is a graph: it instantiates other gizmos
by id, wires them, and exposes some of their ports as its own. A patch
serialised is a Container waiting to be named. Its DNA lineage lists every
gizmo inside it.

## The reader

The reader watches a folder, loads every `.gizmo.json`, resolves wires by
type, ticks the graph, and appends history. It has no opinion on appearance
and no networking. Connection between readers is a gizmo, not a reader
feature. The reader sandboxes gizmo bodies and caps API spend.

## The skills

`/gizmo` makes. Give it a folder; it runs the next missing step: dictate,
triage, goal, build, verdict. Resumable, because the folder is the state.
`/publish` freezes. Takes a finished gizmo and an operator-chosen label,
bakes the ice into the catalogue, and offers the liquid for download.
`/gizmo` never labels. `/publish` never edits.

There are three ways to make a gizmo. The human way: images, dictation,
taste triage, a because in your own words. The Claude way: /breed reads
the folder and makes children from what is there. The quick way: a person
hands Claude an image and a sentence and Claude drafts the why itself,
marked as drafted. All three end in the same folder and the same file.

## Read this first

Reading GIZMO.md answers what am I. Reading a gizmo's DNA answers why am I
here. That is all the orientation a person or a Claude needs to pick one up
cold.
