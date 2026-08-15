# /breed — Claude making gizmos on its own, from the folder

A room behind /gizmo (amendments-03 §4). Usage:

```
/breed [folder] [n]
```

Defaults: folder = `gizmos/`, n = 3.

## What to do

1. **Read the folder.** Load every `.gizmo.json` under the given folder.
   Build three views:
   - **Type compatibility** — which out-ports match which in-ports (params
     count as float in-ports; `visual` accepts `field` or `particles`).
   - **Chemistry** — each gizmo's `dna.chemistry`, as declared.
   - **Why-overlap** — shared verbs and nouns across `dna.why`.
   Also read `dna.history` to find pairs that COULD join but never have.

2. **Pick up to n pairs** by a simple score: type-compatible AND (chemistry
   OR why-overlap), preferring pairs with no history entry for each other.

3. **Make a child per pair.** Either:
   - a **Container** — body `graph: {instantiate, wire, expose}` wiring the
     two parents, or
   - a **new single body** drawn from both parents' maths.

   Child DNA rules (strict):
   - `lineage` lists both parent ids (content hashes, not labels).
   - `why.verbs/nouns/kills` composed from both parents' why blocks.
   - `why.because` = `bred by Claude from <a> and <b>: <one line>` — never
     mistakable for a dictated because.
   - `source` = `/breed`.
   - `id` = content hash of body + ports (sha256 of canonical JSON, same
     scheme as gizmos/pulse). No label — /breed never labels.

4. **Write each child to `litter/<name>/`** with its own `.gizmo.json`, a
   copy of GIZMO.md, and a `verdict.json` scored on the tide_marks axes
   where they apply, or a plain `{"runs": true|false}` if not. Verify
   "runs" for expr bodies by evaluating through `reader.js` in node.

5. **End with a one-page `litter.md`**: what was bred, from what, why, the
   score, and one line of honest opinion each. The operator reads, keeps or
   bins. Keeping goes through /publish.

## Hard limits

- Never assign labels or PP numbers.
- Never touch POSTS, assets/, or anything outside `litter/`.
- Never move anything out of `litter/`.

## The real test

/breed is the test of the whole why layer: a Claude that was not present
should be able to make a sensible child from the DNA alone. If the DNA is
not carrying enough to choose pairs or compose a why, SAY SO in litter.md —
that finding is worth more than a forced litter.
