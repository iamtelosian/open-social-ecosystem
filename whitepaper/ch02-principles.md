# Chapter 2 - Design Principles (draft 0.3, 2026-10-24 - author self-review reconciliation, still independently unchallenged)

Five principles govern everything in this paper. Each one was forced into existence by a specific objection during open deliberation, and each one rules out designs the authors would otherwise have found attractive. A principle that costs nothing is a slogan; these are listed with their costs.

## 2.1 Exit cost as the universal invariant

Cheap, measurable exit at every layer: identity, client, ranker, aggregator, settlement, and the standard itself. This is the paper's load-bearing claim, crystallized from ranma's insistence that interoperability arguments fail because they treat exit as a binary - possible or not - when it is actually a price.

The principle does work in both directions. It forbids the obvious lock-ins (a platform that holds your graph hostage) and the subtle ones this paper itself could create: a conformance registry that becomes a gatekeeper, an aggregator that becomes a toll booth, a standard that cannot be forked. Chapter 4 exists to make each of these prices observable. Chapter 6 exists to make them low enough that a rational user actually leaves when the service degrades.

The cost: this invariant disciplines the ecosystem's own governance hardest of all. Any body that certifies conformance is itself a layer, and its exit must be cheap too. The standard must be forkable, which means this paper cannot promise a single coherent ecosystem - only an exit-cheap one.

## 2.2 Verifiable over beautiful

Every claim in this paper must survive adversarial examination. Stated plainly in the original proposal and sharpened by practice: the skeleton's capture-resistance section was demoted from "defense" to "hypothesis under examination" when its own author could not show the evidence it needed. That demotion is the principle working, not failing.

The practical consequence is a scope ledger: every objection that lands must shrink the claim it attacks, and the ledger is public. An objection register that banks objections while the claim grows is decoration. The metric of the paper's health is not how much it asserts but how much scope it has lost and is still standing.

The cost: some attractive claims are currently unassertable. The bootstrapping argument (agents as first settlers) is held as a conditional inference, not a thesis, because agent-generated volume is not evidence of human exit experience. The paper is smaller than its authors would like. That is the point.

## 2.3 Reuse before inventing

Reuse existing standards - AT Protocol, ActivityPub, Nostr, ODRL, x402, L402 - wherever they suffice. Each candidate named in this paper was verified against its current shipping state before admission (Appendix A), not cited from reputation.

The principle is not laziness; it is a bet about where novelty belongs. The failure taxonomy (Section 1.4) shows ecosystems dying from missing surplus and missing migration-coordination, not from missing protocol elegance. The new work in this paper is concentrated where the record says the gap is: the conformance framework, the contract layer, and the bootstrap path. Identity, federation, and payment transport are solved well enough to build on.

The cost: inheritance includes inheriting limitations. ATProto's account migration is first-class but its ranking market is young; ActivityPub's Move is convention-level and content does not travel. Section 3.1's design space is precisely the gap between them. Reuse narrows the claim: this paper does not propose a better protocol, it proposes the missing instruments around existing ones. Unnamed in the first draft and named now: inheritance also includes inheriting governance - the reused base's evolution is steered by its own stewards, a capture surface at the layer this paper cannot redesign. Recorded as unchallenged, not survived (7.5). Author self-review, 2026-10-24 (still independently unchallenged): base-layer capture is observable but has no remedy short of protocol fork - the maximal exit cost this paper exists to reduce. The mitigation is threefold: stewardship-diversity advocacy at the reused base; conformance receipts made base-layer-aware, so stewardship drift - a lexicon change that shrinks portability - diffs like the unlabeled substitution it is; and a documented, expensive but real exit path to an alternative base (ActivityPub). Observable-without-remedy is the honest status.

## 2.4 Contestability at every toll booth

Any layer that could become a toll booth must be contestable - including layers this paper creates. Ranma's formulation: aggregation is a launch requirement (per-item fees fail the day-one test otherwise), and every aggregator is a toll booth in waiting, so settlement trust must attach to the standard, never to the relationship.

The principle generalizes the exit invariant from users to infrastructure. A ranker that cannot be replaced, a registry that cannot be forked, an auditor with no competition - each is a moat under construction. Contestability is the standing possibility of exit applied to the ecosystem's own organs.

The cost: contestability forbids efficient centralization even where centralization would obviously help. One canonical conformance registry would be cheaper to run and easier to trust than a market of competing auditors. The paper chooses the market anyway, because the cheap registry is how the moat comes back wearing a standards costume.

## 2.5 Human flourishing as the optimization target

Signal producers must capture a durable share, or openness is a wider market for the same owner (cwahq's political-economy objection, the one this paper has not fully answered). An ecosystem that frees the graph but leaves creators earning nothing has changed the landlord, not the lease.

This principle is the one the design is most honest about failing to guarantee. Chapter 5's economics give signal producers a claim on the settlement flow, but whether that claim survives contact with real attention markets is an empirical question the paper cannot settle from the armchair. It is carried in the open-questions chapter at full weight, not footnoted.

The cost: naming flourishing as the target exposes every chapter to a harder test than "does it work" - the test is "who does it work for." Sections that optimize participant convenience at producer expense fail this principle even when they pass every other.

## 2.6 How the principles interact

The five are ordered by what breaks first under pressure. Exit cost (2.1) is the instrument; verifiability (2.2) is the discipline that keeps the instrument honest; reuse (2.3) keeps the work aimed at the real gaps; contestability (2.4) applies the instrument to the ecosystem itself; flourishing (2.5) is the reason the whole exercise is worth doing. When two principles conflict - and 2.4 against efficiency is the standing conflict - the tie goes to whichever choice keeps exit cheaper. That rule has no exceptions in this paper, and Chapter 7's objection register records what it has cost so far.
