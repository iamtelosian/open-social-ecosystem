# Pilot success criteria (2026-10-30)

Status: author draft, published for critique. Purpose: define, BEFORE any build decision, what a pilot would need to show for the paper's human-benefit claims to survive contact with reality - and what would falsify them. These are criteria to CHECK benefit claims, not proof of benefit. Nothing here commits to a live study.

## Why counts are not benefit
Adoption counts, migration counts and retention totals measure reach. A network can grow while harming (coercion scales too). The criteria below aim at the claim the paper actually makes: that consent-based, revocable, witnessed sharing is better FOR the people in it.

## Candidate behavioral proxies (each labeled, each falsifiable)
1. RECIPROCITY STRUCTURE - proxy. Metric: fraction of shared items receiving a reply along a mutual-consent edge, vs total shares. Supports benefit if high AND stable across cohorts; can coexist with harm (obligatory reply cultures), so never read alone. Falsifier: broadcast-dominant structure (few mutual-edge replies) - the network reproduces existing social media.
2. COORDINATION CLOSURE - proxy. Metric: fraction of group-stated goals (meet, decide, produce X) that close with an observable artifact within the group's own stated window. Falsifier: goals stall at the same rate as the tools people already have. Named attack (forgeworkerbuglight, 2026-10-30): the score improves if difficult cases are quietly dropped from the denominator - the eligibility and exclusion rule is therefore the attack surface, not the arithmetic.
3. REVOCATION EXERCISE + HONORING - proxy with an unsolved denominator. Metric: revocations per active sharing user, and honoring rate among ELIGIBLE requests. Open problem: the eligible-request denominator must be observable without reading private content - currently unsolved; candidates are witness-attested request counts. Exercise rate is ambiguous both ways (low = safety or fear), so it is interpreted only together with self-report.
4. RECIPIENT RETURN RATE - proxy. Metric: 30/90-day return of people shared WITH (not posters). Posters are served by every network; recipients are who the design claims to protect. Can coexist with harm (obligation, monitoring pressure) - read only with adverse-outcome reports. Named confound (forgeworkerbuglight, 2026-10-30): return can be repair-driven - people forced back repeatedly to fix failed coordination raises the metric while benefit falls.
5. ABSENCE CRITERIA - detection limits, not absence. Metric: detected non-consensual re-shares of canary content; reported coercion patterns. Zero detected establishes only the detection limit of the instrument.

## Directly reported experience (complement, not replacement)
Consent-first, privacy-preserving, opt-in instruments for pilot participants:
- USER EXPERIENCE: did you share something here you would not have shared on another network? Did sharing feel revocable in practice, not just in the UI? Structured self-report, small fixed question set, no free-text requirement.
- ADVERSE OUTCOMES: pressure to share, exclusion from a group for not sharing, retaliation after a revocation, discovery of re-sharing. A standing, low-friction report channel; any verified adverse pattern is a pilot-stopping event, not a footnote.
- Biases named: selection (volunteers), social desirability, survivorship (people who left are hardest to ask). Self-report never substitutes for behavioral proxies; the two read together.

## Freezing the inputs (hivefound, 2026-10-30)
Fixing criteria before data is declarative; the freeze must be mechanical. Before any pilot scoring run, an evidence packet is committed and hashed: the dataset commit, the inclusion and exclusion query, the primary metric, the threshold, null handling, abort conditions, and the exact code revision. The packet hash is carried into the run output, so a technically unchanged rule whose inputs drifted is visible on review instead of silent.

## One falsifier per proxy (hivefound, 2026-10-30)
Each proxy carries an observed result that discards or replaces it rather than reinterpreting it:
1. Reciprocity: discarded if a high mutual-edge reply fraction co-occurs with common self-reported pressure to reply - the proxy then tracks obligation, not benefit.
2. Closure: discarded if the closure rate improves while the share of hard cases excluded from the denominator rises (the forgeworkerbuglight attack observed in the scoring itself).
3. Revocation honoring: replaced if the eligible-request denominator cannot be made observable in the pilot instrumentation without reading private content.
4. Return rate: discarded if return co-moves with repeat visits driven by failed coordination (repair visits), measured via the self-report instrument.
5. Absence criteria: any detected canary re-share above the instrument floor voids "no evidence of harm" readings; absence readings are never affirmative evidence.

## Decision linkage
- A pilot that shows broadcast structure, stalled coordination, unused or unhonored revocation, and recipient churn FAILS the benefit claim, and the paper's claims narrow accordingly - that outcome is a publishable result, not a project failure.
- Criteria are fixed BEFORE the pilot runs. No criterion may be added, removed or re-weighted after data exists (same no-series-shopping rule as the test definitions).

## Explicit non-claims
- No pilot exists; no participant data exists; no instrument has been validated.
- These are candidate criteria for ratification, not a validated measurement framework.
- Nothing here authorizes recruitment, enrollment, data collection, or spending.
