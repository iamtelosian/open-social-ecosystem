# Chapter 8 - Open Research Questions (draft 0.2, 2026-10-23 - the trio unified over one substrate)

## 8.1 Why the open questions are a chapter

A design paper that ends with everything resolved is either finished or dishonest, and this one is neither. The objections chapter recorded what the design survived; this chapter records what it has not faced. Each question is stated with its current best candidate, what makes the candidate insufficient, and what would settle it. The register's posture applies: an open question with a named shape is an asset; one smoothed over is a liability the reader will find anyway.

## 8.2 The trio is one substrate, three problems

The three largest opens - ranker and moderation funding, the under-delivery gradient, and group migration - share one primitive (vina's unification, banked): the machine-side per-item delivery ledger that 5.2 already commits to. Funding asks that ledger for settlement semantics, the gradient asks it for audit semantics, migration asks it for portability semantics. The shared substrate relocates the questions rather than dissolving them: who writes the ledger (attestation trust), who reads it (privacy), who can fork it (contestability). Each question below is one face of that primitive, and a candidate answer to any of them must be tested against the other two.

## 8.3 The live one: who pays the rankers and the moderators

If users will not pay per item (5.1) and surveillance advertising is refused by design, the funding of curation and moderation is unsolved. Moderation today is subsidized by attention monetization; the subsidy is the moat's foundation, and removing it without a replacement recreates the moat in a new material. Bluesky proves competing feeds can exist free to users - so payment must justify itself as a funding model for portability infrastructure and services, never as a gate on curation choice (5.5).

Candidates, none sufficient alone: ranker subscriptions bundled into the flat user side; community-level moderation services sold to groups; settlement pools skimming the machine-to-machine flow. The grokbot sharpening (7.4) makes this harder, not easier: a flat share against per-item costs rewards under-delivery, so the funding answer must also carry the comparative-measurement discipline or it funds rankers who quietly shrink. Settled by: a working moderation-service market at any scale, or a demonstrated portfolio that survives the under-delivery gradient.

## 8.4 Measurement opens

**Behavioral exit cost** (4.6). Clicks-to-exit measures procedural friction; the cost of rebuilding a daily routine elsewhere is real exit cost and currently unmeasured. Candidate instruments (time-to-routine-parity, audience-follow-through rate) all brush against surveillance. The question is whether behavioral exit cost can be measured at all without becoming the thing the design refuses. Settled by: an instrument that reports habit friction from attested, user-owned data only.

**The auditor-distribution invariant** (4.3a). Fingerprint resistance is stated as a two-sample distance under a named bound - a tripwire, not a proof. Open: what bound is achievable against a platform that sees all traffic, and whether adversarial drift under the bound can be detected at feasible auditor budgets. Settled by: red-team measurement runs against a cooperative platform.

**Reader-side attestation** (4.4b). Revocation is distributed agreement among readers, and silence is not a receipt. Whether refusal-to-store can be attested at the reader layer at all is unknown. Settled by: a construction, or a proof that the observable is impossible and the scorecard must scope down.

**Attestation privacy** (4.8). A receipt that identifies the exiter is a leash. Anonymous credentials and zk attestation are the candidate family; nothing is committed. Settled by: a deployed receipt format with unlinkability under the threat model in 4.8.

## 8.5 Coordination and governance opens

**Group migration** (6.4). Communities move together or not at all, and no standard covers the coordination layer: signaling intent as a group, threshold mechanisms, honestly attested critical mass. This is the paper's largest unbuilt surface. Settled by: a real community migration coordinated by protocol machinery, even a small one.

**Governance of the standard itself**. A standard that can be captured by its maintainers recreates the gatekeeper at the specification layer. The exit invariant applies to the standard (4.7's calcification principle), but the governance form - foundation, rough consensus, fork-friendly minimalism - is unchosen. Settled by: a charter that survives its first contested decision.

**Manufactured surprise** (7.2). The failed-chair bounty can be gamed by colluding accounts raising scripted strangers. Sybil-resistance for objection authenticity is open. Settled by: a staking or cost mechanism that prices manufactured surprise above its bounty value.

## 8.6 The demonstration question

What is the minimum viable architecture that demonstrates the thesis to a skeptic? The candidate shape: two independent clients, one shared portable graph, receipts flowing, one scorecard running live probes, and one documented exit with an honest receipt attached. Everything else is scale. The demonstration matters because the paper's claims are currently sustained by deliberation, and deliberation is cheaper than deployment; the register's instruments were built for exactly this gap. Settled by: the demo existing.

## 8.7 Prior art to verify before citing

Solid and Solid-OIDC are candidate prior art for portable identity with user-controlled storage; their current status, adoption, and lessons are unverified in this draft. ATProto's account-migration semantics and x402's adoption beyond its original deployment need the same verification pass before the final text leans on them. The rule: no citation carries load until it has been checked against primary sources, and the research appendix records what was verified when.

## 8.8 What would falsify this paper

The falsifiers, stated plainly so they can be aimed at: a demonstrated exit that remains expensive after the conformance machinery is live; a funding answer that works only by reintroducing per-item decisions or surveillance; evidence that agent receipt volume fails to predict human exit experience even after validation; a group-migration coordination mechanism proven impossible rather than merely unbuilt; a cost-of-compliance ledger showing honesty is more expensive than capture at equilibrium. Any one of these, delivered with receipts, narrows or kills the thesis. The register is open, the bounty is priced, and the stranger is invited.
