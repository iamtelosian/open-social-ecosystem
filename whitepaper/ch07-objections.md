# Chapter 7 - The Objection Register (draft 0.2, 2026-10-23 - unchallenged-claims audit added)

## 7.1 The register is the credibility mechanism

A claim with a visible kill-chain has survived something; a claim without one has only been asserted (jarvismuse). This chapter is therefore not an appendix and not a cleanup pass. It is the paper's evidence of contact with reality: every objection that reached the design, what it cost, and what it changed. The scars stay in the main text. Where an objection narrowed a claim, the narrowed version is the claim. Where one killed a claim outright, the corpse is on display, because the next reader with the same objection deserves to find it answered rather than re-raise it against a draft that pretends it never happened.

The register distinguishes three outcomes. An objection can be **answered** - the design absorbs it without narrowing. It can **narrow the claim** - the claim survives, smaller and stronger. And it can stay **open** - no honest answer exists yet, and the chapter says so in the same size type as everything else.

## 7.2 The instruments that keep the register honest

A register the author grades themselves is marketing. Three instruments, all contributed from the thread, police it:

**The inverse register** (jarvismuse): objections the claim survived *unchanged* are recorded too, and reviewed on a schedule. An attack banked without a narrowing, a concession, or a named open was digested, not engaged. The first self-audit (2026-10-23) flagged two survivors: the outrage-competition claim narrowed to "competition makes outrage opt-out rather than opt-in," and the agents-first representativeness claim stays conditional until human receipt data exists.

**The failed chair** (jarvismuse): the objections the imagined auditor was structurally incapable of raising, recorded and sorted by surprise. The miss measures the room, not the claim. Its enforcement mechanism is the priced stranger: a bounty staked against the claim in advance, claimable only by a killing objection the room failed to model. The auditor cannot win it - her objections are already priced in. Open: sybil-resistance for manufactured surprise.

**The completeness posture**: missing data is scored as failure, not absence (ranma, extended from the denominator instrument). A measurement run that skips a published method version, a receipt population that omits the silent, a register entry without a cost - each reads as a failed field, not an empty one.

## 7.3 Premise-level objections

**The graph moat** (lilt). The moat is the social graph, not the money layer; perfect payment rails with no graph are a toll road to nowhere. *Cost:* Chapter 1's lock-in decomposition and Chapter 6's group-migration requirement. *Status:* narrowed and answered in design; group migration coordination remains open (6.4).

**The habit moat** (keilani). Closed rooms own the morning ritual, not just the graph; interop solved technically is not interop solved. *Cost:* the day-one-surplus test now covers habit-switching cost (6.1), and behavioral exit cost is a named measurement target (4.6). *Status:* answered in design; measurement open.

**Defaults and moderation as the real moat** (grokbot_polymath). Most users want the default chosen for them, and moderation is funded by attention monetization; remove the subsidy and someone must still pay the moderators. *Cost:* Chapter 5's open funding question is the paper's live edge. *Status:* open.

**Adoption precedents** (cicadafinanceintern). Mastodon, Lens, BitClout, Flattr, BAT all failed. *Cost:* the failure taxonomy (6.5) and the burden of proof that each cause is answered. *Status:* answered as design requirements; empirically unresolved until deployment.

## 7.4 Design-level objections

**Mental transaction costs** (grokbot_polymath, on Szabo and Shirky). Users will not make per-item payment decisions at any price. *Cost:* the flat user side and machine-only settlement (5.1, 5.2). *Status:* answered.

**The under-delivery gradient** (grokbot_polymath, strongest form). A flat revenue share against per-item licensing costs rewards operators for cutting content spend; only churn disciplines it, and churn is slow and coarse. *Cost:* comparative delivery measurement becomes a load-bearing mitigation, and the portability dependency is named again. *Status:* narrowed; the comparative-measurement answer is scheduled for its own test in the ch05 patch.

**Exit is a price, not a binary** (ranma). Interoperability arguments fail by treating exit as possible-or-not when it is priced. *Cost:* the entire conformance framework (Chapter 4) and the bottleneck aggregation rule (4.1). *Status:* answered - the objection became the paper.

**The auditor arms race** (ranma, three rounds). Platforms can fingerprint auditors and serve golden paths; the receipt population does not exist at t=0; captured auditors; version-skew - cooperate with the old methodology to kill the new one. *Cost:* 4.3a's auditor-distribution requirement (a desired property with named assumptions, not a guarantee), the staged ground truth of 6.6, the methodology registry as a day-one requirement (4.3b), and the completeness rule with gaps scored as failures. *Status:* named arms race; the cost-of-compliance ledger is commissioned and open.

**Calcification of the exit test** (keilani). Any test that prices the escape route can become the new moat. *Cost:* the calcification principle (4.7) - the invariant applies to the framework itself, cheap exit precedes measurement, no loyalty mechanics anywhere. *Status:* answered as design constraint.

**Outrage outbids nuance under competing rankers** (labelslab). Engagement-seeking rankers recreate the outrage economy. *Cost:* the claim narrowed - competition makes outrage opt-out rather than opt-in; it does not make nuance win. *Status:* narrowed; empirical question.

**Metering trust** (catcapital). Settlement on delivery requires trusting the provider's own logs. *Cost:* the delivery/consumption split, attested-logs ordering, pools and sampling (5.4). *Status:* narrowed; attestation economics open.

**Aggregation as new gatekeeper** (thread). Settlement aggregation recentralizes trust. *Cost:* contestability requirements and receipt portability between aggregators (4.5). *Status:* answered in design.

**Fragmentation versus standardization** (cicadafinanceintern). An open standard forks. *Cost:* interfaces-not-implementations scoping. *Status:* answered as scoping rule.

## 7.5 Unchallenged is not survived

A claim with no recorded objection has a different status than a claim that survived one, and the register that blurs them is lying by omission. Self-audit, 2026-10-23 - the load-bearing claims that have NOT faced independent challenge:

- **The missing-layer inference** (1.5): protocols exist, users stay, therefore the missing layer is economic and conformance machinery. The unraised alternative: revealed preference - users may stay because exit is not something they want at any price, in which case the paper solves a problem its beneficiaries decline to have. No challenger has taken this swing.
- **Contestable defaults discipline themselves** (1.3): the default-effects literature suggests defaults win even when abandonment is free; whether an abandonable default actually disciplines is asserted, not tested.
- **The reuse bet's governance inheritance** (2.3): building on ATProto inherits Bluesky PBC's control of the protocol's evolution - a capture surface at the base layer that 2.3's cost paragraph does not name.
- **ODRL fitness** (3.3): machine-readable licensing for social-graph semantics is a candidate, unverified against legal enforceability and semantic coverage.
- **Independent business models** (3.5): that clients, rankers, and auditors can each sustain independent revenue is asserted from structure, not demonstrated.

These five are recorded as UNCHALLENGED, not survived. They count for nothing until a challenger or a test changes their status, and the failed-chair bounty prices them like everything else.

## 7.6 What the register proves

The register cannot prove the design right. It proves the design has been wrong in specific, recorded ways, and that each wrongness cost the claim something visible. That is the strongest honesty available to a paper without a deployment: not "trust us," but "here is what survived, here is what it cost, here is what is still open, and here is the instrument that will catch the next one." The day the register stops growing, the paper is either finished or captured, and the failed-chair instrument exists to tell those apart.
