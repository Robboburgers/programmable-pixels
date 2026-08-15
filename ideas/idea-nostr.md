# IDEA — Programmable Pixels on Nostr

Intent only. Not for building yet. Written 15 August 2026 in the studio so
the design does not drift away from it. Lives in `ideas/`. Repo Claude:
read it, keep two DNA fields open (below), and do nothing else.

## Why Nostr fits

Nostr is already the shape of the gizmo system. Identity is a keypair, not
an account. Content is signed events. Relays are dumb pipes anyone can run.
That is a stud, a wire, and a reader. "The pipe is mortal, the signal is
portable" is nearly Nostr's founding argument. Zaps (Lightning tips on any
event) are the wallet without building one.

## Two sites, two rooms

- **GitHub Pages site** — the shop window and catalogue of record. Your
  numbers, your ice, your mailing list, editions for sale. Where a normal
  person arrives from a link and understands what this is.
- **Nostr** — the swap floor. Every gizmo published as a signed event
  carrying its `.gizmo.json`. A gizmo is a note anyone can repost; every
  publish is a zap target. Same gizmos, same DNA, second room.

They do not compete. Email is for people not yet in the network; zaps are
for people who are. Keep both, never merge them.

## What Nostr solves that we left open

1. **Cross-reader identity.** An event id is a content hash; the author is
   a pubkey. `dna.id` can be the event id and `dna.author` an npub, and
   lineage across strangers' readers just works.
2. **Connection between readers.** A relay is a gizmo: it reads a relay,
   filters for gizmo events, and drops folders into the watch folder.
   Someone builds it once. The reader itself still has no networking.
3. **Tips.** Zap on a gizmo event goes to the author's wallet. Zap on a
   Container splits by lineage if we ever want that. No processor.

## How it would be built, in order

1. `/publish` gains an optional flag that, after baking to the site, also
   signs and posts an event with the JSON. Kind to be chosen; likely a
   long-form or custom kind carrying the JSON as content and the label,
   ports and why as tags so relays can filter by them.
2. A **relay reader gizmo**: subscribes to relays, pulls gizmo events, and
   writes folders. Runs locally beside the site reader.
3. Zap button on each catalogue lane on the Pages site, pointing at the
   author's Lightning address from DNA. That is the tip layer on the main
   site too, without a wallet of our own.
4. Later: the swap itself over Nostr. Two readers publish "got" lists as
   events; the "need" match runs locally over whys and ports.

## Do now, so nothing migrates later

- Add to DNA: `author` may carry `{name, npub?, lud16?}` (npub for
  identity, lud16 for a Lightning address). Optional. Nothing reads them
  yet.
- Keep `dna.id` a plain content hash of body + ports. Do not commit to a
  hash scheme that Nostr cannot reuse; SHA-256 is fine.

## Cautions

Nostr's audience is small and specific. It is the network room, not the
marketing room. Do not let it pull design from the front door until the
front door works. Anything paid must be free to ignore: everything stays
free, tips are thanks, editions are ice.
