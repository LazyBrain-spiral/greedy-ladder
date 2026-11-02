// Greedy Ladder progress sync. Runs server-side on Vercel; the LeetCode session
// cookie lives only in Vercel env vars (LEETCODE_SESSION, LEETCODE_CSRF), never
// in the frontend bundle. Returns only the caller's solved slugs for the 50
// listed problems plus a timestamp.
const SLUGS = new Set(["assign-cookies", "lemonade-change", "array-partition", "maximum-69-number", "largest-perimeter-triangle", "maximum-units-on-a-truck", "can-place-flowers", "di-string-match", "minimum-cost-to-move-chips-to-the-same-position", "minimum-number-of-moves-to-seat-everyone", "best-time-to-buy-and-sell-stock-ii", "maximize-sum-of-array-after-k-negations", "maximum-number-of-coins-you-can-get", "boats-to-save-people", "bag-of-tokens", "largest-number", "container-with-most-water", "non-overlapping-intervals", "minimum-number-of-arrows-to-burst-balloons", "maximum-length-of-pair-chain", "partition-labels", "two-city-scheduling", "queue-reconstruction-by-height", "car-pooling", "remove-covered-intervals", "jump-game", "jump-game-ii", "gas-station", "increasing-triplet-subsequence", "wiggle-subsequence", "furthest-building-you-can-reach", "remove-k-digits", "remove-duplicate-letters", "valid-parenthesis-string", "string-without-aaa-or-bbb", "smallest-string-with-a-given-numeric-value", "minimum-time-to-make-rope-colorful", "score-after-flipping-matrix", "broken-calculator", "task-scheduler", "reorganize-string", "distant-barcodes", "minimum-deletions-to-make-character-frequencies-unique", "split-array-into-consecutive-subsequences", "course-schedule-iii", "candy", "ipo", "minimum-number-of-refueling-stops", "patching-array", "create-maximum-number"]);
const QUERY = `query userProgressQuestionList($filters: UserProgressQuestionListInput) {
  userProgressQuestionList(filters: $filters) {
    totalNum
    questions { frontendQuestionId titleSlug questionStatus }
  }
}`;

export default async function handler(req, res) {
  const session = process.env.LEETCODE_SESSION;
  const csrf = process.env.LEETCODE_CSRF;
  if (!session || !csrf) return res.status(503).json({ error: 'sync_not_configured' });
  try {
    const solved = [];
    let skip = 0, total = Infinity;
    while (skip < total && skip < 2000) {
      const r = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'cookie': 'LEETCODE_SESSION=' + session + '; csrftoken=' + csrf,
          'x-csrftoken': csrf,
          'referer': 'https://leetcode.com/progress/',
          'origin': 'https://leetcode.com'
        },
        body: JSON.stringify({ query: QUERY, variables: { filters: { skip, limit: 100 } } })
      });
      if (!r.ok) return res.status(502).json({ error: 'leetcode_unavailable' });
      const j = await r.json();
      const d = j && j.data && j.data.userProgressQuestionList;
      if (!d || !Array.isArray(d.questions)) return res.status(502).json({ error: 'leetcode_unexpected' });
      total = d.totalNum;
      for (const q of d.questions) {
        if (q.questionStatus === 'SOLVED' && SLUGS.has(q.titleSlug)) solved.push(q.titleSlug);
      }
      if (d.questions.length === 0) break;
      skip += d.questions.length;
    }
    res.setHeader('cache-control', 'private, max-age=300');
    return res.status(200).json({ solved, syncedAt: new Date().toISOString() });
  } catch (e) {
    return res.status(502).json({ error: 'sync_failed' });
  }
}
