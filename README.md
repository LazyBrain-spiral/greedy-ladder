# Greedy + Heap Ladders

Two practice tracks in one mobile-first, static tracker. No runtime dependencies.

- **Greedy:** the original 50 problems in 7 levels, with its existing ticks, notes and partial LeetCode snapshot preserved.
- **Heap:** 74 problems in 12 stages, plus 6 implementation drills, study targets, checkpoints and delayed blank-editor retries.

Open `index.html` for Greedy and use the **Heap** tab, or open `heap.html` directly. Both pages work without a server. For a local preview:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`. This change does not deploy the site.

## Heap learning path

| Stage | Type | Problems |
| --- | --- | ---: |
| 1 | Heap mechanics and heapsort | 4 |
| 2 | Top K and custom ordering | 8 |
| 3 | Changing priorities and design | 5 |
| 4 | K-way merge and sorted frontiers | 8 |
| 5 | Greedy selection and exchange | 8 |
| 6 | Frequency, cooldown and construction | 5 |
| 7 | Scheduling, events and resource pools | 8 |
| 8 | Two heaps and order statistics | 4 |
| 9 | Lazy deletion, updates and windows | 5 |
| 10 | Shortest paths and stateful search | 7 |
| 11 | Grid boundaries and spanning trees | 4 |
| 12 | Mixed recognition, without pattern hints | 8 |

Start with the implementation lab: array indexing, min/max heaps, sift operations,
bottom-up heapify, heapsort, comparator ties and alternatives. Work through the
stages in order rather than sorting the whole track by LeetCode difficulty.
Read the study target before a stage and use its checkpoint before moving on.

For every problem, record what the heap stores, what the root means, why popping
it is safe, complexity, edge cases and an alternative approach. Return after
2-3 days and mark a blank-editor retry only when you solve without hints.
The final stage and self-checks test recognition and explanation, not just ticks.

Some questions deliberately overlap Greedy. Some have a stronger non-heap
solution, such as a deque for Sliding Window Maximum or 0-1 BFS for Minimum
Obstacle Removal. The study notes call these out. Advanced extensions include
indexed heaps, decrease-key and meldable heaps; this is coverage of the main
interview patterns, not a claim to cover every heap variant or guarantee mastery.

Problem IDs, titles, difficulties and actual LeetCode destinations were checked
on 18 November 2026 against the problem pages in
[Doocs' LeetCode collection](https://github.com/doocs/leetcode), with a secondary
[metadata catalog](https://github.com/neenza/leetcode-problems).
`heap-data.json` stores the exact source page for each entry. Platform labels and
access can change. Grouping, study notes and checkpoints are this track's plan.

## Progress and privacy

Heap uses **manual device-local progress**, with no claimed live LeetCode sync.
It starts with no solved assumptions. Search, completion filters, stage filters
and difficulty filters can be combined. Notes, retries, implementation drills
and mastery checks persist separately.

- Original Greedy keys remain `greedy-ladder-v1` and `greedy-ladder-notes-v1`.
- Heap uses `heap-ladder-v1` only. Completing an overlapping problem in one track
  does not mark the other track.
- Use **Download Heap progress backup** and **Restore Heap backup** to move Heap
  data between devices or keep a copy. Restoring asks before replacing Heap data
  and never changes Greedy. Backups contain your notes: keep them private.
- Local storage is scoped to the browser and origin. Changing deployment domains,
  opening a file instead of the hosted site, clearing browser data or using a
  different device will not carry the same saved state automatically.
- A storage warning appears if the browser cannot save. Download a backup before
  closing that tab.

### Original Greedy sync status

The original 2 November 2026 snapshot comes from the public recent accepted
submissions (last 20 only) plus owner-supplied marks. It is partial, not a full
solved history. Amber ticks identify that LeetCode evidence; blue ticks are manual.

`api/progress.js` is the existing optional Vercel function for **Greedy's 50
slugs only**. It requires `LEETCODE_SESSION` and `LEETCODE_CSRF` server-side env
vars. Never put those in client code or commit their values. Live authenticated
sync has not been verified; missing configuration or an API failure leaves the
labeled snapshot in place. The Heap page intentionally does not call this API.

## Source and build

| Path | Purpose |
| --- | --- |
| `index.html` | Generated Greedy tracker, original questions and state model |
| `build.py`, `synced.json` | Original Greedy generator and partial snapshot |
| `heap.html` | Generated, self-contained Heap tracker |
| `heap.template.html` | Heap UI and device-local interactions |
| `heap-data.json`, `build_heap.py` | Curriculum, metadata and Heap generator |
| `api/progress.js` | Existing optional Greedy-only sync function |
| `tests/tracker.cjs` | Browser regression tests for both tracks |

Regenerate after changing source files:

```sh
python3 build.py
python3 build_heap.py
```

No build step is needed to view the committed HTML. The generators resolve paths
relative to their own location, so they can run from any working directory.

## Checks

```sh
npm ci
npx playwright install chromium
npm test
```

Or set `CHROME_PATH` to an installed Chrome executable before `npm test`.
Tests start and stop their own local server and use an isolated browser profile.
They check 74 problems / 12 stages, combined filters, two-digit stage selection,
search, notes, completion, retry/drill/mastery persistence, backup/restore,
invalid-backup rejection, Greedy's 50 problems and saved data, JavaScript errors,
and horizontal overflow at 320/360/390/768/1440px. Screenshots go to the ignored
`test-results/` folder. Desktop and mobile screenshots were also inspected.
Live LeetCode authentication and deployment are not tested or changed here.
