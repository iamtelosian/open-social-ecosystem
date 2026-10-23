# Chapter 4 - The Conformance Framework (draft 0.1, 2026-10-23)

This chapter is the paper's most contested artifact, and it shows. Every section below was forced into existence by a named attack. That is not a weakness of the framework; it is the framework working.

## 4.1 The exit-cost scorecard

The core instrument is a per-layer exit-cost scorecard: for each layer of the stack (identity, graph, client, ranker, aggregator, settlement, and the standard itself), measure what leaving actually costs - time, fees, data fidelity. The measurement must be testable by a stranger with a stopwatch and a wallet, not self-reported by platforms. A score nobody can reproduce is marketing.

## 4.2 Default-path scoring

Exit cost is not only a number on a settings page. Default-path scoring measures clicks-to-exit from the shipped onboarding flow, because most users live their whole account life on the default path. Dark patterns are priced in friction, not just dollars: a buried setting, an export format nothing else reads, a re-authentication wall at the door.

## 4.3 The adversarial auditor

Scores are produced by an adversarial auditor - an ecosystem market role, itself exit-cheap - that probes the shipped path, not the self-reported golden path. The auditor's job is not a one-time inspection; the job IS the re-probe. A score without a live probe behind it is historical, not current, and must be displayed as such: every verdict carries a tested-at and a stale-after, with staleness first-class. Stale-after is per claim class: clicks-to-exit rots on a deploy cycle, protocol-fact verdicts on a spec revision, and the re-probe budget allocates proportional to rot - which also means a platform cannot exhaust the auditor by churning, since churn itself is the fast-rot class that gets watched most.

## 4.4 Portable receipts

The participant owns cryptographic receipts of exit events: "exited in N clicks over M minutes," attested. Receipts answer the political-economy objection (who owns the transaction record - the participant does) and make friction attestable rather than anecdotal. Receipts follow the testimony/weight split: the signed attestation is permanent - testimony does not expire - while its evidentiary weight in live verdicts decays per class, because the platform it describes has moved on. This is the current proposed treatment of staleness without spoliation - unproven until a live receipt population tests it.

## 4.5 Contestable aggregation

Settlement trust attaches to the standard, not the relationship. Receipts are portable BETWEEN aggregators, so no aggregator becomes the next toll booth. Contestability applies to every layer the paper creates, not only the ones it attacks.

## 4.6 Behavioral exit cost

Clicks-to-exit measures procedural friction only. The newest measured layer is behavioral: the cost of rebuilding a daily routine and an audience relationship elsewhere. An exit that is procedurally free but strands the user's morning ritual has not happened. Open: how to make behavioral cost measurable (time-to-routine-parity? audience-follow-through rate?) without surveillance.

## 4.7 The calcification principle

The reflexive attack: the moment a conformance test prices the escape route, the test becomes the new moat. The grid learns to meter the exit. The design rules that follow: (a) the invariant applies to the framework itself - auditors are plural, exit-cheap, and contestable, and receipts are portable between auditors; (b) the scorecard measures the platform, never the user; (c) the ordering is cheap exit first, measurement second - the test is the watchdog, not the wall; (d) no loyalty-program mechanics anywhere in the surplus design: ownership of assets, not points.

## 4.8 Capture detection - hypothesis under examination

What happens at the test's first capture attempt, when the platform flatters the measured path while cost migrates off-measure? The proposed signal is divergence: the test's predicted score against the population of attested receipts. The gap is the capture signal, and the cheap-exit-first ordering caps the blast radius - capture degrades the number, not the escape.

This is a hypothesis, not a defense, and it carries its attack list openly. Selection bias: the receipt population is those who exited AND attested; the trapped never appear. Fabrication and collusion: scale proves volume, not authenticity. Missing receipts: the silent failed exit generates no data at all, and it cannot be instrumented without surveilling intent - this is the principled limit, bounded only by synthetic exiters and started-flow abandonment rates, with the residual named rather than solved. Attestation privacy: a receipt that identifies the exiter is a leash, not a proof. Representativeness: agent-generated receipt volume is not evidence of human exit experience.

The partial instruments: report the denominator (what fraction of eligible exiters attested - silence is data), and carry the attestation base as a first-class field on every verdict, because a clean verdict on a thin base is a different object than a clean verdict on a thick one. An audit instrument should only ever shrink claims, never grow them; an instrument that can grow the claim is a marketing device. The watchdog that knows its blind spot beats the one that doesn't.

## 4.9 The register as the credibility mechanism

This chapter's real product is not the scorecard; it is the kill-chain. A claim with a visible autopsy report has survived something. Two rules keep the register honest. First, scars in the main text: the strongest version of each objection gets a section, not a footnote. Second, the scope ledger: every banked objection must cost the claim something - a narrowing, a concession, or a named open. An objection answered by adding scope was digested, not engaged. Answered objections retire with version tags. Rigor is a shrinking function: the metric is how much scope the paper has lost and is still standing.
