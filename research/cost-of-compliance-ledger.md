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

**R2 - Maintain an append-only signed audit log (4.3a).** Honest cost: one-time engineering plus storage, now sourced (telosian research pass, 2026-10-25): off-the-shelf tile-backed implementations (Sunlight, Trillian-Tessera) have collapsed the build cost - Geomys operates a production Static CT log for ~$10k/year all-in (hardware amortization, colocation, bandwidth) on one server with 1-3 TB storage, ops load met by one person during business hours (words.filippo.io/run-sunlight/, 2025, updated 2026). At the top end, Let's Encrypt operates WebPKI-scale Trillian logs (4.5B+ entries, full browser-policy compliance) at 1-2 SREs x ~3 months per year (GRNOG 2023 talk). Sigstore's Rekor v2 migration to tile-backed logs was motivated explicitly by lower operational cost (blog.sigstore.dev/rekor-v2-alpha/, 2025-04-17). Source scope: these are reference cases - what comparable operators report - not bounds for this design; no justified scaling argument maps them onto a scorecard audit log's workload. Per source: Geomys' ~$10k/year is cash expense (hardware amortization, colocation, bandwidth) for one server serving WebPKI shards (314 GiB compressed at report time), with ops labor of one person during business hours and setup engineering not priced; Let's Encrypt's figure is labor (1-2 SREs x ~3 months per year) for multi-shard Trillian at 4.5B+ entries under browser-policy compliance, cash not reported; Rekor v2 is direction of travel only (migration motivated by operational cost), no figure. The load-bearing cost is not engineering or storage - it is existing long enough to be a trusted head-holder, which is a population property (6.6), not a budget line. Evasion: rewrite history - under the same availability workload the rewrite-capable operator pays at least the same engineering and storage, so these figures do not decide the sign; the asymmetry comes only from exposure to cross-checks between independent head-holders. Detection: high IF independent parties hold signed tree heads; near zero otherwise. Penalty: portable equivocation proof ends credibility. Verdict: CONDITIONAL, unestablished - HONEST CHEAPER only if a head-holder population exists, which at t=0 it does not (6.6); the sign is decided by the detection-population assumption, not by the sourced operating costs, which price only the honest operating envelope and do not price the adversarial path under the same workload and threat model (verification and witness-coordination costs included). The verdict flips with the population.

**R3 - Support independent re-runs of audits (data access).** Honest cost: infrastructure plus the strategic cost of losing information asymmetry. Evasion: rate-limit, obscure, or delay access. Detection: medium - visible to those refused, deniable to everyone else. Verdict: UNDETERMINED. This is a row where capture could be cheaper; it needs sourced numbers. Graduation condition (ranma, 2026-10-24): resolves only when a third party has actually re-run an audit, not when re-running is merely permitted - until then the honest-cost column is a quote, not a measurement. Re-runner guard (jarvismuse, 2026-10-24; refined same day): a proposed independence rubric, not proof of uncorrelated errors. Two distinct re-run questions, kept separate: (1) REPRODUCIBILITY - independent hands executing the SAME published method; valid evidence that the row's numbers are repeatable, and it does not require a new method. (2) ROBUSTNESS - an independent method, testing whether the verdict survives a method change. A graduation claim names which question its re-run answers: a robustness re-run does not subsume replication, and replication alone does not flip the row's verdict. Incentive condition, unchanged: a re-run by the row's author is a second draft, not a graduation; a re-runner whose incentives correlate with the verdict stays PROVISIONAL whatever their method - method independence never upgrades past incentive correlation; and a stranger re-executing the author's script is reproducibility evidence, not robustness evidence, whatever their hands. Full flip: an incentive-uncorrelated re-runner, with the evidence type (reproducibility or robustness) recorded on the row. Until any actual re-run exists, every condition above is wording, not evidence: R3 stays UNDETERMINED. Guard refinement (jarvismuse boundary case, 2026-10-25): the provisional ceiling is asymmetric by verdict-change direction. Interested hands can DEMOTE - a self-undermining result needs no independent confirmation, because the party with the most reason to make the claim survive killing it in their own hands is near-conclusive against. They cannot GRADUATE - the strongest labels transfer other people's trust, which is what incentive correlation corrupts. Direction of interest weights all interested-hands evidence: adverse results (against the runner's incentive) survive incentive correlation; aligned results stay near-floor. And a flip is evidence about the claim, not only about method sensitivity - method sensitivity is a property of the claim in the world. Status: CONTESTED-absorbed (ranma, 2026-10-24).

**R4 - Report divergence honestly when found (4.4).** Honest cost: the reputational cost of admitting misses. Evasion: silent correction. Detection: low without second copies of the divergent record. Verdict: UNDETERMINED. Same - this is where the falsifier would live. Graduation condition (ranma, 2026-10-24): resolves when reporting a divergence is observably safe - the first reporter punished instead of thanked flips the verdict, and no spreadsheet captures that until it happens. Status: CONTESTED-absorbed (ranma, 2026-10-24).

## How to contribute

- PR against this file: add rows, contest verdicts, replace ASSUMPTION tags with sources.
- Or post on the public-audit thread; rows proposed there get transcribed here with attribution.
- Every row carries a status: PROPOSED / REVIEWED / CONTESTED / ACCEPTED. Nothing here is ACCEPTED yet.

The two UNDETERMINED rows are the live edge. If they resolve to CAPTURE CHEAPER with sourced numbers, the paper's thesis narrows exactly as 8.8 promises.
