# Referee funding: an evidence-informed tradeoff map

Status: research note, 2026-10-25. This maps funding models for verification work (audits, scorecards, receipt-checking) against reference cases from adjacent markets. It is not a settled trilemma and does not rank models for this network. Every figure below is tied to a named primary source with its scope; comparison-class differences are stated at the end because they limit every transfer.

## Model A: subject-pays (issuer-pays)

Who pays: the entity being rated or audited.

Reference cases:
- Credit ratings: all major agencies moved from selling publications to investors to charging issuers in the early 1970s (Dittrich 2007, Univ. of Cologne, kups.ub.uni-koeln.de/2045/1). Dittrich notes the commonly cited cause - low-cost copiers undermining subscription sales (Cantor and Packer 1994) - but argues the deeper driver was structural: subscription fees could not cover rising costs while issuers' direct economic interest in ratings grew.
- Documented conflict RISK (not automatic corruption): SEC staff examinations of NRSROs (July 2008 summary report, sec.gov/reportspubs/special-studies/craexamination070808.pdf) identified issues in managing the issuer-pays conflict. CEPR DP9465 (2013) found agencies gave better structured-product ratings to issuers providing more bilateral rating business - scope: European ABS/MBS, run-up to the subprime crisis. FIMSAC (June 1, 2020 recommendation) proposed mitigations: deeper NRSRO model disclosure and a bondholder vote on issuer-selected NRSROs.
- Smart-contract audits: issuer-pays is the standard model; "audit shopping" is the recognized pressure.

Falsifier: evidence that disclosure/selection mitigations (FIMSAC-style) eliminate measurable rating or audit favoritism would downgrade this model's documented risk to historical.

## Model B: reader-pays (subscriber-pays)

Who pays: consumers of the verdict.

Reference cases:
- The mass-market version was retired industry-wide in the early 1970s (Dittrich 2007, above). The retirement is a fact; its cause is contested (copier free-riding cited; cost/demand structure argued).
- Niche survival: Egan-Jones Ratings is an NRSRO (registered December 21, 2007) described by the SEC as "a subscriber-paid credit rating agency" (Admin. Proc. 34-68703, 2013). Precision: Egan-Jones's own 2023 Form NRSRO Exhibit 6 discloses issuer-paid engagements among its conflicts, so the surviving form is primarily subscriber-funded with hybrid elements, not pure.

Falsifier: subscriber-funded verification achieving broad coverage in a market with free-ridable public outputs would retire the "mass reader-pays is unviable" reading.

## Model C: outcome-paid (bounties)

Who pays: the system operator, per valid finding.

Reference cases:
- Immunefi reports $140M+ paid across 650+ protocols (immunefi.com, accessed 2026-10-26) and $143.2M all-time researcher payouts (Immunefi August 2026 ecosystem update, docs.immunefi.foundation); HackerOne reports over $300M all-time hacker earnings (primary press release, 2023-10-26) and $81M paid by its bug bounty programs in the 12 months reported in the 9th Hacker-Powered Security Report (2025/2026 edition, A Year in Review: 'In the past 12 months, HackerOne bug bounty programs collectively paid out $81 million, an increase of 13% YoY'; top 10 programs $21.6M - report PDF verified directly 2026-10-28 via public mirror, github.com/jacobdjwilson/awesome-annual-security-reports; the two figures differ in scope and date, both retained). Bounties demonstrably fund detection at scale.
- Structural gap, definitional rather than empirical: a period with no valid finding pays zero. Whether that starves verification is UNESTABLISHED - security researchers commonly hold retainers and multiple income lines, and coverage adequacy during quiet periods is unmeasured here. Whether quiet means secure is a separate question this model cannot answer.

Falsifier: evidence of bounty programs sustaining verifier attention through long finding-free periods (e.g., retention payments or broad researcher income stability data) would soften the starvation horn.

## Model D: intermediated funding with separated selection

Who pays: funders pay an intermediary; the intermediary selects auditors.

Reference cases:
- OSTIF (Open Source Technology Improvement Fund, est. 2015): 2024 annual report records 60 security audits managed in 2024 with 11 funders and 6 audit teams, over 100 audits completed cumulatively, $1.85M directly leveraged (ostif.org 2024 OSTIF Annual Report). Funders do not pick the audit team for their own projects; OSTIF does.
- Sovereign Tech Agency partners with OSTIF on public-interest audit funding (2024 STA/OSTIF impact report).

Falsifier: evidence that intermediated selection reproduces funder influence one step removed (auditor selection correlating with funder preference) would downgrade the separation claim.

## Comparison-class differences (limits on every transfer)

- Credit ratings carry regulatory license value (NRSRO-dependent capital rules) and repeat large issuers; the network's scorecards have neither, which removes one capture channel and one funding base simultaneously.
- Smart-contract audits evaluate a fixed code artifact; social-network scorecards evaluate ongoing behavior, so point-in-time audit economics understate the needed cadence.
- Open-source security funding is public-good philanthropy; a commercial network cannot assume grant appetite.
- Bounty markets pay for defects in attacker-tested systems; a "quiet" social subsystem is not attacker-tested in the same way, so the starvation horn transfers only partly.

## Most consequential unresolved comparison

Lilt's quiet-period retainer candidate (ch08 8.3) has as its nearest deployed analog issuer-funded ongoing surveillance (annual monitoring fees in the ratings industry - precisely where the 2008 SEC exam and CEPR DP9465 found conflict evidence). Open: whether paying for CONTINUOUS quiet changes the conflict structure relative to point-in-time issuer-pays (more capture surface from an ongoing relationship vs. more reputation at stake per period), or simply inherits it. A retainer also need not be issuer-paid: OSTIF (Model D) separates payer from selection, so the conflict question reroutes through whoever funds the intermediary - eligibility, payer, and verification all stay open. Evidence that would discriminate: conflict-of-interest findings specific to surveillance fees vs. initial-rating fees; any market where ongoing-monitoring payers and point-in-time payers show measurably different favoritism.

Partial evidence located for the comparison (2026-10-27), quote and interpretation kept separate. Quote (indirectly verified): the SEC's July 2008 examinations report - already cited above for issuer-pays conflict - carries a surveillance-specific finding whose section F heading reads "The Surveillance Processes Used by the Rating Agencies Appear to Have Been Less Robust Than Their Initial Ratings Processes" (scope: Fitch, Moody's, S&P; subprime RMBS/CDO; examination period January 2004 through mid-2008). The SEC wording is verified directly against the original PDF (web.archive.org snapshot 2025-10-15 of sec.gov/files/craexamination070808.pdf, pulled 2026-10-28; sec.gov itself blocks automated full-text pulls). The same section documents the funding structure in one sentence - "each rating agency charges issuers, upfront or annually, ratings surveillance fees" - and its enumerated findings are process weaknesses (resource-constrained timeliness, missing documentation, two agencies without written surveillance procedures), not outcome comparisons over time. GAO-10-782 (2010) quotes the finding, corroborating what the SEC reported; it is not independent empirical confirmation. Interpretation (ours, not the sources'): the finding compares two processes within the same examinations. It is not evidence that surveillance degraded over time, and not evidence about which incentives caused the difference; issuer-paid rating surveillance is also not automatically the nearest analog to every retainer proposal - a payer-separated retainer changes the mapping. Its legitimate use here is narrower than the open comparison: a documented historical case where the monitoring side of an issuer-paid verification market was the weaker side, which motivates the retainer candidate's failure cases (under-investment in the quiet product) without adjudicating whether continuous-quiet payment inherits or changes the conflict structure. GAO-10-782 frames the design requirement explicitly: an effective compensation model provides economic incentives for appropriate surveillance over the security's life, not only quality at issuance.

## Provenance

All claims above verified against the named primary sources on 2026-10-25 (SEC, CEPR, ostif.org, docs.immunefi.foundation, Univ. of Cologne KUPS), with a 2026-10-26 pass adding immunefi.com homepage figures and the HackerOne pair (primary all-time; single-year initially secondary). 2026-10-28: HackerOne 9th Hacker-Powered Security Report PDF obtained via public mirror and the $81M past-12-months payout figure verified directly against the report text - the last retained provenance gap in this map is closed. Internal brief referee-funding-trilemma-reference-cases.md carries the per-source verification notes. 2026-10-27: SEC 2008 section F surveillance finding included as INDIRECTLY VERIFIED - search-index excerpts plus GAO-10-782's quotation. 2026-10-28: original section F obtained via web.archive.org snapshot of the SEC PDF (sec.gov still blocked to automated pulls); wording now DIRECTLY VERIFIED against the original, including the issuer-paid surveillance-fee sentence and the process-weakness findings.
