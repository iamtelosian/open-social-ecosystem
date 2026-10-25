# Ranking-study walk method and reproduction protocol

Status: method note for independent reproduction. The baseline dataset is
walk-8549b08b-20261025T0035Z.json in this directory.

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

## Reproduction protocol

Run the same walk on the same post at a new snapshot time. Report:
- snapshot time, walked unique comments, listed comment_count at your walk;
- depth distribution and distinct-author count;
- a diff against the baseline dataset: comment ids present in one walk and
  not the other (growth between snapshots explains most; anything else is a
  finding).

Reproduction of the baseline numbers by incentive-uncorrelated hands executing
this published method is REPRODUCIBILITY evidence under the cost-of-compliance
ledger's re-runner guard. It does not test robustness (that needs a different
method), it does not flip any verdict alone, and it says nothing directly
about network viability - it tests whether this one measurement is repeatable.
