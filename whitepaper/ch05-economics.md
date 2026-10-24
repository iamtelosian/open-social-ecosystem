# Chapter 5 - Economics (draft 0.2, 2026-10-23 - strongest-form 5.5 absorbed)

## 5.1 The record to beat

Every micropayment system for content has run into the same wall, and it is not the price. Szabo named it in 1999: mental transaction costs - the cost of deciding - exceed the cost of paying long before the payment itself becomes trivial. Shirky made the same point in 2000 against the first wave of micropayment enthusiasm: users will not make a purchase decision per article, per post, per view, no matter how small the amount. The two decades since have only confirmed them. Flattr asked readers to budget a monthly sum and distribute it across what they liked, and stayed niche. Brave's BAT put a wallet in the browser and per-site attention accounting, and the mainstream did not come. BitClout put the money at the center as the attraction and collapsed with the speculation.

The design consequence is absolute: no user-facing per-item payment decisions, ever. Any architecture that requires a person to decide, item by item, whether this post is worth a fraction of a cent has failed before it ships. The payments layer of an open social ecosystem must live where such decisions are cheap: machine to machine, in the background, settled in aggregate.

## 5.2 The user side is flat

What a person pays for, they pay for the way they pay for email or music: a subscription, one periodic decision, flat. A user subscribes to a client, a ranker, or a bundle. That subscription is the only payment decision the design is allowed to ask of them.

This is not a retreat from the payment thesis; it is a constraint that disciplines it. The interesting economy happens behind the flat edge: the client, ranker, and platform settle with signal producers, infrastructure, and each other, continuously and mechanically, against machine-readable licenses (3.3) and portable receipts (4.4). Per-item settlement exists - but only between machines, where a million decisions a day cost nothing.

## 5.3 Payments as plumbing, never product

BitClout showed what happens when the money is the content: the speculation eats the social fabric and the collapse takes both down. Lens showed the mirror failure: genuine portability with no economic surplus for the user does not retain anyone - over a hundred thousand profiles, and the rooms emptied anyway. Payments in this design fund portability and services invisibly. They are not the attraction, not the identity, not the game. The day a user opens the app to watch their balance, the design has failed.

## 5.4 Settlement mechanics

The settlement layer decomposes metering into delivery and consumption, and settles on delivery. Delivery is measurable honestly: the provider's own logs, attested by the party with the strongest incentive to keep them accurate. Consumption - attention, influence, downstream value - is contested, gameable, and toxic to measure; it stays out of the money path entirely, exactly as ad attribution should have. Royalties on top can be handled by pools, by sampling plus audit, or by cryptographic attestation (TEE, zk), in that order of preference.

Aggregation is a launch requirement, not an optimization. Payment channels, netting, and batching must make the fixed cost per settlement tiny on day one, or the day-one-surplus test (6.1) fails by arithmetic. Sub-cent L2 rails exist and are verified shipping - x402 (HTTP 402 with stablecoin settlement) and L402 (macaroon-plus-preimage over Lightning) are the current candidates; the paper does not marry either.

## 5.5 The open question this chapter refuses to hide

If users will not pay per item, and surveillance advertising is refused by design, what funds the rankers and the moderators? Moderation today is subsidized by attention monetization; remove the subsidy and someone must still pay the moderators. Bluesky proves competing feeds can exist free to users - so payment must justify itself as a funding model (for portability infrastructure, moderation services, agent-to-service commerce), never as a gate on curation choice.

The objection in its strongest form (grokbot_polymath, banked with attribution): a flat revenue share against per-item licensing costs rewards the operator for cutting content spend - every undelivered item is margin kept - and only churn disciplines it, while churn is a slow, coarse signal next to a per-item one. The design's answer beyond churn is comparative measurement: an operator under-delivering relative to peers shows in the scorecard's delivery receipts before churn moves, converting a slow per-user exit signal into a fast cross-operator one, with churn as the backstop rather than the discipline. The answer's limits are named: comparison only disciplines if subscribers can see it and act on it (the portability dependency again), and the alternative lever - weighting the share by delivered-item attestations - reintroduces per-item accounting with its own gaming surface, which is the cost the chapter accepts by keeping the share flat.

Candidates, none yet sufficient: ranker subscriptions bundled into the flat user side; community-level moderation services sold to groups rather than individuals; settlement pools that skim the machine-to-machine flow. The honest answer may be a portfolio. This is the live edge of the paper, and it is marked [open] until a proposal survives the thread.

## 5.6 Who bears the loss

Openness pays everyone except, potentially, the incumbent signal producers whose captive audiences were the asset. A design that ignores this gets captured or fought. The paper's answer is structural rather than compensatory: signal producers keep a durable share of what their signal earns (principle 5), because in an open ecosystem reputation and receipts are portable assets they own, not hostage value the platform holds. Whether that share is enough is an empirical question the conformance framework exists to measure.
