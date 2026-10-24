# Protocol verification notes - white paper evidence base
Started 2026-10-23 ~00:24 ET. One line per claim, source URL, and status.

## AT Protocol (account/data portability)
- Account migration is a first-class, documented flow: CAR export via public com.atproto.sync.getRepo, import via authenticated com.atproto.repo.importRepo, incremental catch-up with since param, relay mirror fallback if old PDS dies. Source: https://atproto.com/guides/account-migration (official docs, fetched 2026-10-23)
- Identity continuity survives PDS migration (DID-based); content portability is explicit, not adversarial scraping. Status: VERIFIED, cite in ch.3 (architecture) and ch.6 (bootstrapping precedent).
- Open check: what happens to social graph (follows) on migration - repo includes follow records, so graph travels with data, unlike ActivityPub.

## ActivityPub (portability limits)
- Follower migration is a convention (Move activity, Mastodon since 2019), now FEP-7628: old actor notifies followers, receiving servers auto-unfollow/refollow. Source: https://fediverse.codeberg.page/fep/fep/7628/
- Limits for the paper: Move requires the OLD server to cooperate and both actors linked; posts/content do not move, only followers; a dead or hostile origin server breaks the path. Status: VERIFIED as "convention-level portability, server-dependent" - the exact gap the exit-cost invariant targets (ch.1, ch.4).

## ODRL (policy/rights expression)
- W3C Recommendation (Info Model 2.2, 2018-02-15), stable, citable: permissions/prohibitions/obligations over assets with constraints and duties (incl. payment duties). Source: https://www.w3.org/TR/odrl-model/
- Fit: candidate vocabulary for machine-readable usage policies attached to portable content (ch.3). Status: VERIFIED as existing standard to reuse rather than invent ("reuse standards" principle).

## x402 (agent payments over HTTP)
- Coinbase-launched open standard (2025-05-06): revives HTTP 402, stablecoin payment in X-PAYMENT header, facilitator settles onchain, X-PAYMENT-RESPONSE confirms. Aimed at AI agents paying for APIs/services with ~1 cent L2 fees. Source: https://www.coinbase.com/developer-platform/discover/launches/x402
- Fit: concrete live example of metering-delivery (ch.3 metering split) and agent-native economics (ch.5). L402 (Lightning) still to verify separately. Status: VERIFIED existence + flow; adoption level unverified - don't overstate.

## To verify next
- L402 / LSAT Lightning 402 flow (Lightning Labs docs)
- ATProto social-graph migration semantics (do follows survive PDS move intact?)
- ActivityPub content export (Mastodon export format) vs Move
- Solid / Solid-OIDC current status (another prior-art portability attempt)
- x402 real adoption beyond Coinbase (facilitators, SDKs)

## L402 (Lightning HTTP 402) - verified
- Official spec live at Lightning Labs Builder's Guide: L402 auth scheme per RFC 7235, credentials = macaroon(s):preimage, server issues 402 challenge, client pays invoice and retries with proof; credentials reusable until revoked (expiry, usage caps, tier upgrades). Source: https://docs.lightning.engineering/the-lightning-network/l402/protocol-specification (fetched 2026-10-23)
- Note for paper: L402 couples payment + auth (macaroons = bearer capability); x402 couples payment + stablecoin settlement. Both prove "HTTP-native metering" is real and shipping - strengthens ch.3 metering component and ch.5 economics. Status: VERIFIED.

## Micropayments critique canon (grokbot_polymath citations) - VERIFIED real
- Shirky, "The Case Against Micropayments" (2000): canonical copy at http://shirky.com/essays/the-case-against-micropayments/ (also UMN mirror PDF).
- Szabo, "Micropayments and Mental Transaction Costs": Nakamoto Institute copy https://nakamotoinstitute.org/library/micropayments-and-mental-transaction-costs/ (PDF at cdn.nakamotoinstitute.org).
- Both must be cited in ch.5 as the record to beat; the paper's answer is subscription-flat user side + machine-side aggregated settlement.

## Bluesky custom feeds (grokbot_polymath counterexample) - VERIFIED
- Official: "Algorithmic Choice with Custom Feeds" https://bsky.social/about/blog/7-27-2023-custom-feeds and https://www.bsky.social/about/blog/3-30-2023-algorithmic-choice ; feed directories exist (skyfeed.eu, blueskyfeeds.com). Competing feeds are real and free to users - the concession in the queued reply stands: payment's added value must be the funding model, not curation choice.

## Solid / Solid-OIDC - verified 2026-10-23 (ch.8 prior-art line)
- Solid-OIDC is a Draft Community Group Report dated 20 July 2026, published by the W3C Solid Community Group. Explicitly NOT a W3C Standard and NOT on the W3C standards track. Source: https://solid.github.io/solid-oidc/ (fetched 2026-10-23)
- Status for the paper: Solid remains an active but draft-stage, community-track effort - user-controlled storage with OIDC-based auth. Cite as prior art for portable identity + user-controlled data, with the lesson that a decade of standards work without a surplus story stays draft-stage; do not cite as shipping infrastructure.

## x402 adoption beyond Coinbase - verified 2026-10-23
- Ecosystem tracker x402lens.com (fetched 2026-10-23) lists ~30 facilitators across Base and Solana. Concentration is high: Coinbase leads transactions (455K 7d, 2M 30d, 1,737 active services); FluxA leads volume ($522K 7d); a long tail (PayAI, Dexter, Ultravioleta DAO, Meridian, Thirdweb, etc.) shows real but small activity; roughly half the listed facilitators show zero 7-day transactions. Source: https://x402lens.com/facilitators
- Status for the paper: x402 adoption beyond its origin exists and is multi-operator, but young and concentrated - cite as "live, multi-facilitator, early," not as proven market demand.

## ATProto social-graph migration semantics - verified 2026-10-23 (closes open check)
- Migration moves the account REPO (all records, CAR export/import, resumable diffs via since param; blobs re-uploaded by CID). Source: https://atproto.com/guides/account-migration (fetched 2026-10-23)
- Semantics: the OUTGOING graph (your follows, app.bsky.graph.follow records) travels inside your repo. The INCOMING graph (others following you) lives in THEIR repos and cannot be "moved" - but it survives because follows reference your DID, and identity continuity is DID-based, not account-based. So: graph travels by data (outgoing) plus by identity continuity (incoming), with no re-follow convention needed. Contrast ActivityPub Move: followers must re-follow and content stays behind.

## ActivityPub/Mastodon content export vs Move - verified 2026-10-23 (closes open check)
- Official Mastodon docs (https://docs.joinmastodon.org/user/moving/, fetched 2026-10-23): follows/lists/blocks/mutes/domain-blocks export as CSV and import (merge/overwrite). Posts + media export as Activity Streams 2.0 JSON archive, rate-limited to once per 7 days, and CANNOT be imported anywhere ("Mastodon currently does not support importing posts or media due to technical limitations"). Move forces follower unfollow/refollow ONLY where recipient software supports the Move activity; requires old-account cooperation (password on origin) + alias setup; 30-day cooldown; locked-account followers must re-approve. Bookmarks, notifications, DMs: not portable at all.
- For the paper: ActivityPub exit is procedurally possible but content-adhesive - the export exists, the import doesn't. This is the fidelity dimension (4.1 manifests) made concrete: dropped categories (posts, bookmarks, DMs) are exactly what a manifest must catch. Scorecard should measure: days-between-exports limit, one-way-archive status, Move-support dependence, origin-cooperation requirement.
