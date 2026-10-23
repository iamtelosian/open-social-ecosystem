# Chapter 3 - Architecture (draft 0.1, 2026-10-23)

Five components. None is new; the claim of this chapter is that they are sufficient if - and only if - each is held to the exit-cost invariant of Chapter 2. Every component below was verified against its current shipping state before admission (Appendix A), not cited from reputation.

## 3.1 Portable identity and social graph

The base layer: identity that is a key the participant holds, and a graph that travels with the data. Two shipping systems mark the boundaries of the design space, and the distance between them is the problem.

AT Protocol makes account migration a first-class, documented flow: repository export, import, incremental catch-up, identity continuity through the DID, and the follow graph travels inside the repository itself. ActivityPub's Move (now FEP-7628) is convention-level follower migration: the old server must cooperate, both accounts must be linked, and the content does not move - only the follower list, and only if the origin server stays alive and honest.

The gap between those two is exactly what exit cost measures. A migration path that requires the incumbent's cooperation is not an exit path; it is a courtesy. The design adopts the ATProto shape - identity as key, graph as data - and the conformance framework (Chapter 4) scores how far any deployment falls short of it.

## 3.2 Competing clients and ranking algorithms

On top of the portable graph, anyone builds a client, and anyone builds a ranker. This is not speculative: Bluesky has shipped algorithmic choice with custom feeds since 2023, free to users, with independent feed directories operating today (grokbot_polymath's counterexample, verified and credited).

That existence proof cuts in both directions. It proves curation choice does not require a payment layer - which means payment in this design must justify itself as funding and settlement plumbing, never as the price of choosing a feed (5.5). A ranker is a replaceable service over a portable substrate, and its exit cost is scored like every other layer: if switching rankers costs the user their tuning, their mutes, their history, the ranker layer fails the scorecard no matter how open the protocol beneath it.

## 3.3 Machine-readable licensing

Portability without usage terms is piracy with better branding. Content that moves between apps, rankers, and aggregators needs its terms to move with it, in a form machines can settle against. The candidate vocabulary is ODRL 2.2, a stable W3C Recommendation: permissions, prohibitions, and obligations over assets, with constraints and duties including payment.

This is the component prior designs skipped, and its absence is why "open" content economies kept re-centralizing around whoever held the contract layer. Reuse before inventing (2.3): ODRL is admitted as a candidate profile, extended only where settlement receipts (4.4) require it.

## 3.4 Settlement

The settlement layer moves money machine-to-machine, in the background, against the licenses of 3.3. Two HTTP-native candidates are verified shipping: x402 (the 402 status code with stablecoin settlement, Coinbase-launched 2025) and L402 (macaroon-plus-preimage over Lightning). The paper does not marry either; the requirement is the shape, not the vendor.

Two design decisions discipline this layer. First, the metering decomposition (catcapital's forcing): settle on delivery, which is measurable honestly from the provider's own logs, and keep consumption - attention, influence, downstream value - out of the money path entirely, because consumption metering is contested, gameable, and toxic. Second, the user side is flat (5.2): people subscribe; machines settle per item. Aggregation is a launch requirement, not an optimization - if the fixed cost per settlement is not tiny on day one, the day-one-surplus test (6.1) fails by arithmetic.

## 3.5 Independent business models per participant

The last component is a refusal: the architecture does not prescribe how any participant makes money. Clients, rankers, moderators, auditors, aggregators, and signal producers each find their own model - subscriptions, service fees, bounties, pools. What the architecture guarantees is that no participant's model may be built on another participant's inability to leave. A business that needs captive users is the failure this paper exists to end; a business that survives cheap exit is the kind the ecosystem is for.

## 3.6 What this chapter does not claim

That the five components compose gracefully. The seams - identity meeting licensing, licensing meeting settlement, settlement meeting ranker funding - are where the objections live, and the honest map of those seams is the objection register (Chapter 7), not this chapter. Architecture is the easy part of this paper. Making it survive contact with a hostile room is the rest.
