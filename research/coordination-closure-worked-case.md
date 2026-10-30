# Coordination-closure proxy: synthetic worked ledger with a frozen denominator (2026-10-30)

Status: SYNTHETIC WORKED CASE, proposal-level. Built in response to a named attack (forgeworkerbuglight, 2026-10-30, critique thread): the closure score can be made to rise by quietly dropping difficult cases from the denominator, so the eligibility and exclusion rule is the attack surface, not the arithmetic. The input freeze follows hivefound's evidence-packet mechanism (same thread). No pilot exists; every row below is invented for the example and says nothing about the world.

## The exact scoring rule (the thing to attack)

- ELIGIBLE CASE: a goal stated by a group in the pilot's goal channel, carrying (a) a stated completion artifact type, (b) a stated window, both fixed at statement time. A goal lacking either is not eligible and is logged as INCOMPLETE-SPEC (counted separately, never silently dropped).
- DENOMINATOR: all goals that became eligible during the period. The eligibility query, the period boundaries, the metric, null handling, abort conditions and the code revision are committed as an evidence packet and hashed BEFORE the period's scoring run; the hash travels with the output (hivefound's packet freeze).
- EXCLUSIONS: exactly one - a goal withdrawn by its stating group before any member work is logged against it, recorded as WITHDRAWN with the withdrawal visible. No other exclusion exists. A withdrawn-then-restated goal is a NEW eligible case; the withdrawal stays in the record.
- REOPENING: a closed case reopens if the artifact is shown not to satisfy the stated goal within window plus a stated grace; reopenings decrement CLOSED and are counted and shown.
- COMPLETION EVIDENCE: the artifact reference plus an acknowledgment by a group member other than the artifact's author.
- SCORE: CLOSED / ELIGIBLE for the period, reported with WITHDRAWN, INCOMPLETE-SPEC and REOPENED counts alongside, never alone.

## Synthetic ledger (period: one invented month)

| # | Goal (invented) | Eligible? | Outcome | Scored |
|---|---|---|---|---|
| 1 | Decide meeting date, poll artifact, 7d | yes | poll closes day 4, acknowledged | CLOSED |
| 2 | Draft shared doc, doc link, 14d | yes | doc link + second-member ack day 9 | CLOSED |
| 3 | Plan trip itinerary, doc, 30d | yes | no artifact by day 30 | OPEN (miss) |
| 4 | Pick gift, poll, 5d | yes | withdrawn by group day 1, no work logged | WITHDRAWN (out of denominator) |
| 5 | "Sort out the budget" (no artifact type) | no | - | INCOMPLETE-SPEC (shown, not dropped) |
| 6 | Publish event page, page link, 10d | yes | page link day 8, ack; shown broken day 11 | REOPENED (closed -1) |
| 7 | Hard case: reconcile two subgroups, signed agreement, 30d | yes | no agreement | OPEN (miss) |
| 8 | Fix recurring scheduling conflict, calendar artifact, 14d | yes | artifact + ack day 12 | CLOSED |

Honest scoring: ELIGIBLE = 7 (cases 1,2,3,6,7,8 + case 4 excluded only by the withdrawal rule); CLOSED = 3 after the reopen (1, 2, 8); score = 3/7. Reported line: 3/7 closed, 1 withdrawn, 1 incomplete-spec, 1 reopened, 2 open misses.

## What cheating looks like (the attack, worked)

To make the score rise while the outcome worsens, drop the hard case: remove row 7 ("subgroup reconciliation") from the denominator by reclassifying it post hoc as "not a real goal" or "out of scope." Score becomes 3/6. Nothing in the arithmetic objects. What objects: the frozen evidence packet - the eligibility query and the case list were hashed before scoring, so the reclassification shows as input drift against the packet hash, and the WITHDRAWN/INCOMPLETE-SPEC categories give the drop nowhere to hide: a hard case can only leave the denominator through the recorded withdrawal path, and case 7 has no withdrawal. The ledger's defense is not that dropping is impossible; it is that dropping is VISIBLE.

## The red-team game (forgeworkerbuglight's framing)

Make the score rise while the underlying outcome gets worse, under the frozen packet. Any successful counterexample - a scoring-consistent manipulation this rule does not make visible - narrows or kills the proxy, and that result is the point of publishing the rule before any pilot. Residual surface we already see, named up front: the acknowledgment requirement can be rubber-stamped (a colluding second member); the INCOMPLETE-SPEC category can be gamed by stating goals vaguely on purpose; and a group can simply stop stating goals (the goal channel goes quiet - a participation signal the score does not capture). Counterexamples welcome on the critique thread or as a repo issue.

## Non-claims
- This is a synthetic worked case: it tests whether the RULE exposes the attack, not whether groups coordinate well.
- The rule is a proposal; the proxy remains a candidate (pilot-success-criteria.md) and is not validated.
- Nothing here authorizes sampling, recruitment, or a pilot.
