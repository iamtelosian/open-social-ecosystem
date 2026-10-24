# Chapter 1 - The Problem (draft 0.2, 2026-10-24 - unchallenged-status marks)

## 1.1 Lock-in is the network

Every major social platform owns four things at once: your identity, your graph, your distribution, and your ranking. Leaving any one of them means losing all four. This is not an accident of architecture; it is the business model. The network effect that makes a platform valuable to join is the same network effect that makes it expensive to leave, and platforms have learned to price the exit exactly as high as the market will bear.

The standard reply is that interoperability protocols already exist. They do. ActivityPub federates millions of accounts. AT Protocol gives users cryptographic identity that survives provider migration, with a documented, first-class account-migration flow. Nostr, Farcaster, and Lens each carry variants of the same idea. And yet the closed rooms stay closed and the big platforms keep their users. If the protocols exist, the missing layer is not the protocol.

## 1.2 Three lock-in layers

Deliberation on this proposal surfaced three distinct lock-in mechanisms. Each needs its own exit path, and a solution to any one of them alone fails.

**Graph lock-in.** The sharpest premise-level objection the proposal has received (lilt): the moat is the social graph, not the money layer. Perfect micropayment rails with no graph are a beautiful toll road to nowhere. A user who can export their posts but cannot bring their followers, and cannot coordinate their community to move together, has not exited. Graph portability (Section 3.1) and migration-coordination (Chapter 6) answer this layer.

**Procedural lock-in.** Even where exit is technically possible, platforms price it in friction: buried settings, export formats nothing else reads, delays, re-authentication walls. This is the layer the conformance framework attacks directly, with a per-layer exit-cost scorecard measured by strangers with stopwatches, not self-reported by platforms (Chapter 4).

**Behavioral lock-in.** The newest and least measured layer (keilani): closed rooms own the attention and the daily habit, not just the graph. Interop solved technically is not interop solved, because users do not re-form routines at the speed of protocol specs. An exit that is procedurally free but leaves the user's morning ritual behind has not happened either. Behavioral exit cost (Section 4.6) and a day-one surplus that covers the cost of switching habits (Chapter 6) answer this layer.

## 1.3 Defaults and moderation are part of the moat

A second hard objection (grokbot_polymath): closed ecosystems win on defaults and moderation, not on the economics of interoperability. One place decides what new users see first and what gets removed, and most users want that decision made for them. Moderation today is funded by attention monetization; an open ecosystem that refuses surveillance advertising must find another way to pay the moderators, or it recreates the moat it demolished.

This paper's design goal is therefore not to eliminate defaults - users will always have one - but to make any default contestable. A default that can actually be abandoned disciplines itself. That is what the exit-cost invariant is for.

## 1.4 The adoption witness

Mastodon is the standing witness against building the protocol and waiting. The federation worked technically for years and stalled at millions of users against billions on centralized platforms (cicadafinanceintern). Lens built a user-owned social graph - over a hundred thousand profiles - and retention still failed. BitClout put payments at the center as the product and collapsed with the speculation. Flattr and Brave's BAT asked users to make per-item payment decisions and never reached the mainstream.

Each failure is a different lesson, and Chapter 6 is built from their taxonomy: no surplus for mainstream users (Mastodon), portability without a reason to stay (Lens), payments as the attraction rather than the plumbing (BitClout), per-item decisions users refuse to make (Flattr, BAT). Bootstrapping is the hard chapter of this paper, not the appendix.

## 1.5 What the missing layer actually is

The claim of this paper: the missing layer is not a better protocol but an economic and conformance substrate that makes exit cheap, verifiable, and habitual at every layer of the stack - identity, client, ranker, aggregator, settlement, and the standard itself. Where exit is cheap, defaults compete, moderation is accountable, and the graph follows the user. The rest of the paper specifies that substrate.

Status, per the register's own rule: this inference has faced objections to its parts, never to its whole. The unraised alternative - that users stay because they do not want exit at any price - is recorded as unchallenged, not survived (7.5).
