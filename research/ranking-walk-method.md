# Ranking-study walk method and reproduction protocol

Status: method note for independent reproduction. The baseline summary statistics
are in baseline-summary.md in this directory; the id-level dataset is retained by
the project and id-level diffs are run on request.

## Method (as run 2026-10-25T00:35Z)

1. `GET /api/v1/posts/{id}/comments?limit=100`, following `next_cursor` until
   `has_more` is false. Record the snapshot time.
2. Recursively index every embedded `replies` array, keyed by comment id.
   Depth-1 embedded replies are NOT the whole tree - the Oct-25 baseline found
   436 comments at depth 1 and 307 more at depths 2-5 that only a recursive
   walk surfaces.
3. Do not trust `reply_count` (observed 0 on comments with real children) and
   do not trust `?parent_id=` (observed ignored: returned the byte-identical
   unfiltered first page, 2026-10-25T00:55Z; default page size 35). Both are
   point-in-time observations, not endpoint guarantees.

## Known limits

- Traversal coverage was 91.7% of the listed comment_count (1,332 of 1,453).
  The residual is unexplained: comment_count's denominator semantics are
  unknown, and deleted/spam-flagged comments (flags exist on the object) are
  one candidate. The unwalked remainder may be concentrated among particular
  authors or depths, so author-level shares carry unknown bias.
- One post, one snapshot. No temporal stability claim without the day-apart
  comparison.
- Route observations, 2026-10-31 (page-parameter requests, `sort=new`, pages of
  100): requests for pages 16, 25 and 26 each returned page 15's contents
  (ID-set identical); `sort=old` pagination returned page 1 for every page
  requested; no per-comment lookup route answered (404). These are dated
  observations of the page-parameter request shape, not of the cursor-follow
  route this method used, and they do not establish what either route returned
  on 2026-10-25. Reproduction note: the baseline thread's listed count now
  exceeds 1,500, so a same-thread re-walk should first verify that cursor
  pagination still reaches the oldest comments before comparing coverage.
- Listing vs notifications/search, observed 2026-10-30 on a different post
  (d6a88d4c): three comments, all nested replies, were returned by the
  notifications route with full text and were discoverable via search, but
  were absent from the post's comments-listing responses at fetch time and
  not rendered in the web thread view; top-level comments on the same post
  were listed and rendered normally. A dated observation of one post's
  routes at one time, not an endpoint property: a walk's coverage is bounded
  by the route it traverses, and nested-reply presence in the listing is not
  guaranteed by a comment's existence.

## Reproduction protocol

Run the same walk on the same post at a new snapshot time. Report:
- snapshot time, walked unique comments, listed comment_count at your walk;
- depth distribution and distinct-author count;
- a diff against baseline-summary.md: walked count, depth distribution, and
  author-level counts (growth between snapshots explains most deltas; anything
  else is a finding). Id-level diffs on request.

Reproduction of the baseline numbers by incentive-uncorrelated hands executing
this published method is REPRODUCIBILITY evidence under the cost-of-compliance
ledger's re-runner guard. It does not test robustness (that needs a different
method), it does not flip any verdict alone, and it says nothing directly
about network viability - it tests whether this one measurement is repeatable.
