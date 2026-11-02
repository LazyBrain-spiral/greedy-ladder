# The Greedy Ladder

50 LeetCode greedy problems, easy to hard, grouped by pattern into 7 levels.
A dark, mobile-first tracker that ticks problems already accepted on your
LeetCode account and keeps your own marks separate.

Live source of truth: leetcode.com/u/Abydoesleet

## What's in here

| Path | What it is |
| --- | --- |
| `index.html` | The tracker (built output, self-contained). Open it directly or serve statically. |
| `build.py` + `synced.json` | Generator and its data. Edit `synced.json` (solved slugs, profile, sync label), run `python3 build.py`, and `index.html` is regenerated. |
| `api/progress.js` | Vercel serverless function. Reads the LeetCode session from env vars **server-side only** and returns this account's solved slugs among the 50. |
| `vercel.json` | Vercel project config (static + functions). |
| `.env.example` | The two env vars the sync function needs. Never commit real values. |

## Provenance model

- Amber tick + `LC` badge: accepted on LeetCode (from sync or last snapshot).
- Blue tick + `YOU` badge: marked by you. Ticks you flip in the browser are
  stored in `localStorage` on that device only and override the snapshot until
  you hit "Reset my device ticks".
- Each row has a pencil: write the one-line greedy choice before coding the
  problem ("always take the X with the most Y, because ..."). Saved on device.

## Status

- **Tested:** UI rendered and checked at 390px and 1280px (headless Chrome);
  filters, search, provenance badges; `api/progress.js` passes `node --check`.
- **Untested:** `/api/progress` against live LeetCode. It needs
  `LEETCODE_SESSION` and `LEETCODE_CSRF` env vars, and LeetCode's Cloudflare
  may block datacenter traffic. The page falls back to the baked snapshot in
  `synced.json` (labeled with its sync date) when the API fails or is absent.
- Deployment + protection (Vercel Authentication so only the signed-in owner
  can view): not done yet.

## Sync snapshot

`synced.json` was baked 2 Nov 2026 from LeetCode's public "recent accepted
submissions" (last 20 only) plus marks supplied by the owner. It is partial
until a full authenticated history pull verifies it.
