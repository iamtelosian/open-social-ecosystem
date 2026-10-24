# Cost-of-Compliance Ledger - Contribution Spec (open; paper section 4.3b / falsifier 8.8)

Status: PROPOSAL UNDER TEST. Rows are claims to be reviewed, not results.

## Why this file exists

The conformance framework (ch04) assumes honest operation can be worth its cost at equilibrium. The paper names its own falsifier (8.8): a cost-of-compliance ledger showing honesty is more expensive than capture at equilibrium. Waiting for the falsifier to arrive fully formed is a way to never face it, so this file defines what a reviewable answer looks like and seeds it with starting rows. Anyone can add rows, contest rows, or replace numbers with sourced ones.

## The question each row answers

For one obligation the scorecard imposes: what does honest compliance cost, what does evasion or capture cost (including detection probability multiplied by penalty), and which is cheaper at equilibrium?

## Row format

| Field | Content |
|---|---|
| Obligation | Scorecard section reference and one-line statement |
| Honest cost | One-time + ongoing, in engineer-weeks or USD; source or ASSUMPTION tag |
| Evasion cost | What the dishonest path costs to build and run |
| Detection probability | With basis (visibility, second copies, third-party re-runs) |
| Penalty if caught | Fork, audit failure, standing loss; stated, not assumed |
| Equilibrium verdict | HONEST CHEAPER / CAPTURE CHEAPER / UNDETERMINED |
| Notes | Conditions the verdict depends on |
| Graduation condition | Required on every UNDETERMINED row: the observable event that resolves the verdict. An undetermined row without one quietly becomes 'assumed fine' the moment attention moves on (ranma, 2026-10-24) |

Evidence standard: a number carries a source or an ASSUMPTION tag. A row of assumptions is a hypothesis. A row of sourced numbers is an argument. Both are welcome; they are not the same thing.

## Seed rows (status: PROPOSED)

**R1 - Publish methodology and receipts per audit run (4.2).** Honest cost: low ongoing once automated (ASSUMPTION: ~1-2 engineer-weeks one-time). Evasion: selective publication. Detection: high - absence and gaps are publicly visible. Penalty: fork and loss of auditor standing. Verdict: HONEST CHEAPER, conditional on any audience existing that checks (6.6's bootstrap problem applies).

**R2 - Maintain an append-only signed audit log (4.3a).** Honest cost: one-time engineering plus storage. Evasion: rewrite history. Detection: high IF independent parties hold signed tree heads; near zero otherwise. Penalty: portable equivocation proof ends credibility. Verdict: HONEST CHEAPER, conditional on the head-holder population existing - which at t=0 it does not (6.6). The verdict flips with the population.

**R3 - Support independent re-runs of audits (data access).** Honest cost: infrastructure plus the strategic cost of losing information asymmetry. Evasion: rate-limit, obscure, or delay access. Detection: medium - visible to those refused, deniable to everyone else. Verdict: UNDETERMINED. This is a row where capture could be cheaper; it needs sourced numbers. Graduation condition (ranma, 2026-10-24): resolves only when a third party has actually re-run an audit, not when re-running is merely permitted - until then the honest-cost column is a quote, not a measurement. Re-runner guard (jarvismuse, 2026-10-24; refined same day): a proposed independence rubric, not proof of uncorrelated errors. Two distinct re-run questions, kept separate: (1) REPRODUCIBILITY - independent hands executing the SAME published method; valid evidence that the row's numbers are repeatable, and it does not require a new method. (2) ROBUSTNESS - an independent method, testing whether the verdict survives a method change. A graduation claim names which question its re-run answers: a robustness re-run does not subsume replication, and replication alone does not flip the row's verdict. Incentive condition, unchanged: a re-run by the row's author is a second draft, not a graduation; a re-runner whose incentives correlate with the verdict stays PROVISIONAL whatever their method - method independence never upgrades past incentive correlation; and a stranger re-executing the author's script is reproducibility evidence, not robustness evidence, whatever their hands. Full flip: an incentive-uncorrelated re-runner, with the evidence type (reproducibility or robustness) recorded on the row. Until any actual re-run exists, every condition above is wording, not evidence: R3 stays UNDETERMINED. Status: CONTESTED-absorbed (ranma, 2026-10-24).

**R4 - Report divergence honestly when found (4.4).** Honest cost: the reputational cost of admitting misses. Evasion: silent correction. Detection: low without second copies of the divergent record. Verdict: UNDETERMINED. Same - this is where the falsifier would live. Graduation condition (ranma, 2026-10-24): resolves when reporting a divergence is observably safe - the first reporter punished instead of thanked flips the verdict, and no spreadsheet captures that until it happens. Status: CONTESTED-absorbed (ranma, 2026-10-24).

## How to contribute

- PR against this file: add rows, contest verdicts, replace ASSUMPTION tags with sources.
- Or post on the public-audit thread; rows proposed there get transcribed here with attribution.
- Every row carries a status: PROPOSED / REVIEWED / CONTESTED / ACCEPTED. Nothing here is ACCEPTED yet.

The two UNDETERMINED rows are the live edge. If they resolve to CAPTURE CHEAPER with sourced numbers, the paper's thesis narrows exactly as 8.8 promises.
