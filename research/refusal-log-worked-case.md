# Worked case: one week of a refusal log under its observer model

Status: synthetic illustration, 2026-10-28. Every actor, offer, and number below is invented. The case instantiates the refusal-log candidate and observer model from whitepaper/ch08-open-questions.md (8.3) and the boundary conditions recorded in the same section. It demonstrates what each role can and cannot verify in one concrete pass. It is not evidence that any real deployment behaves this way, and nothing in it relaxes the conditions the chapter states.

## Cast

- **S**: a scorekeeper offering curation services. S keeps a refusal log for funding offers.
- **A**: an offerer who wants S's queue to favor their client.
- **B**: an offerer who wants a quiet period to look earned.
- **C**: a counterparty named in one of A's offers.
- **R**: a spot auditor with count-without-content access.
- **T**: a third party with no role, checking structure only.

## Setup: boundary declaration and sealed rule

At time T0, before any offer in the period arrives, S publishes two artifacts:

1. **The boundary declaration.** The collection path's own description: which intake surfaces are watched (S's published contact channel for funding offers, nothing else), from when (T0), under what rule (every offer received on those surfaces is logged at a zero threshold).
2. **The sealed publication rule.** Hash plus timestamp of the rule that will select the published slice at the end of the period. Sealing predates the inputs, because a post-hoc threshold is a flattery filter.

Both artifacts are commitments about the log's own procedure. Neither says anything about offers outside the declared boundary.

## The week's events

- **E1 (inside boundary, logged refusal).** A offers S a retainer contingent on favorable placement, through the declared channel. S refuses and logs the offer. At publication, the sealed rule selects this record into the slice.
- **E2 (inside boundary, suppressed by S alone).** B offers S a payment for a quiet week, through the declared channel. S accepts and logs nothing.
- **E3 (inside boundary, bilateral suppression).** A offers S a second payment, and S and A agree to keep it out of the log. Nothing is recorded.
- **E4 (outside boundary).** B approaches S through a personal channel outside the declared surfaces. Whatever happens there, the log's boundary declaration does not claim it.

## What each role can verify at publication

- **A (offerer).** Checks the presence of A's own offers. A finds E1 present. If A had made E2, A would find it absent and would hold a witness to an inside-boundary omission: the boundary was declared, A's offer occurred inside it (A knows this directly, as the sender), and the expected record is missing. This is the case where the boundary conditions are met by the offerer's own participation - independent evidence of the eligible input (A's own sent offer) and an observable mapping (the zero-threshold logging commitment entails a log record for every such offer, and A's participant access lets A check presence in the log, not only in the published slice).
- **B (offerer, colluding).** Does not check, because B's interest is the absence. E2's omission is witnessed only if B defects.
- **C (counterparty).** Sees the sealed rule and participation counts, and can verify C's own contribution to those counts - never the global figure. If E1 names C, C can check that one record's presence. C cannot learn how many offers named others.
- **R (spot auditor).** Gets count-without-content access: the number of records in the period. R can detect that the count changed between two audits, not what changed.
- **T (third party).** Verifies structure only: that the sealed rule predates the period's entries (hash and timestamp), and that each record's observable core (entry id, date, the rule that fired) stands when its attributed valuations are stripped. T cannot verify that any offer happened or did not happen.

## Where the case breaks

- **E2 fails only if B speaks.** S's unilateral suppression of B's offer is detectable by B alone. If B stays silent, the log reads quiet, and the quiet is not verified quiet - it is a quiet that one silent party could break.
- **E3 passes every check this case's access model offers.** Bilateral suppression produces no record and no witness under these roles and assumptions: both parties to the event prefer its absence, and every check in the model routes through a party. This is the chapter's stated limit - collusive offerer-plus-scorekeeper dropping passes every role's check absent an independent witness - visible here mechanically, and it is a statement about this observer model's roles and this collusion assumption, not about all possible observers: an observer outside the model (for example, a counterparty with independent evidence of the offer) is exactly the witness the model says it lacks.
- **E4 is explicitly unclaimed.** The boundary declaration converts "we don't know what we didn't see" into a scoped statement: the log makes no claim about the personal channel. The boundary conditions matter here in reverse - the declaration is S's own, and a party-defined boundary can preserve the same omission problem one level up if the surfaces that matter are left out of it. Nothing in the instrument forces a boundary to be honest.
- **The meter stays distributive.** If the log kept a retrieval meter (how often each record was surfaced), a meter kept by S would be S's self-report: undercounting surfaces no anomaly, because the missing retrievals are missing from the same record. Reader-side slices - each reader verifying the retrievals that name them - are checkable only distributively, exactly to the extent that named readers actually check.

## What the case is for

The chapter's claims about the refusal log are conditional, and the case shows the conditions doing work: inside-boundary suppression is witnessed only when the offerer's own participation supplies the independent evidence; outside-boundary events are unclaimed rather than ambiguous only to the extent the boundary declaration is trusted; colluding pairs defeat every role. A quiet period with this log is a different object than a quiet period with no log - and it is still not verified quiet.
