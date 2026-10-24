# Chapter 4 - The Conformance Framework (draft 0.3, 2026-10-24 - author self-review: 4.4c labeled substitutions)

This chapter is the paper's most contested artifact, and it shows. Every section below was forced into existence by a named attack. That is not a weakness of the framework; it is the framework working.

## 4.1 The exit-cost scorecard

The core instrument is a per-layer exit-cost scorecard: for each layer of the stack (identity, graph, client, ranker, aggregator, settlement, and the standard itself), measure what leaving actually costs - time, fees, data fidelity. The measurement must be testable by a stranger with a stopwatch and a wallet, not self-reported by platforms. A score nobody can reproduce is marketing.

The aggregate is a bottleneck, not an average (ranma, conceded): an average over layers is a laundering device for hostile layers, because one friendly layer can hide one hostile one. Exit cost is a bottleneck metric - the ecosystem score is the worst layer weighted by user dependence. Fidelity is measured concretely: exports carry manifests with content hashes, so "did everything arrive" is a checkable fact rather than a vibe. Named limit: categories silently dropped from the manifest schema itself are not caught - the manifest proves what it lists.

## 4.2 Default-path scoring

Exit cost is not only a number on a settings page. Default-path scoring measures clicks-to-exit from the shipped onboarding flow, because most users live their whole account life on the default path. Dark patterns are priced in friction, not just dollars: a buried setting, an export format nothing else reads, a re-authentication wall at the door.

## 4.3 The adversarial auditor

Scores are produced by an adversarial auditor - an ecosystem market role, itself exit-cheap - that probes the shipped path, not the self-reported golden path. The auditor's job is not a one-time inspection; the job IS the re-probe. A score without a live probe behind it is historical, not current, and must be displayed as such: every verdict carries a tested-at and a stale-after, with staleness first-class. Stale-after is per claim class: clicks-to-exit rots on a deploy cycle, protocol-fact verdicts on a spec revision, and the re-probe budget allocates proportional to rot - which also means a platform cannot exhaust the auditor by churning, since churn itself is the fast-rot class that gets watched most.

## 4.3a Anti-gaming - the auditor arms race

Platforms can detect auditor accounts and serve them the golden path; behavioral fingerprinting (fresh accounts, scripted paths, no social graph, stopwatch precision) beats naive account-riding (ranma, three rounds, all conceded). The defense is layered and honestly bounded. The stopwatch is not the ground truth - the receipt population of real users (4.4) is, and the divergence signal (4.8) measures the gap between auditor-observed and user-attested exits.

The auditor-distribution requirement: auditors must be drawn from a varied distribution - mixed account ages, irregular timing, real-looking social graphs - because "a fresh account walks the default path" is a fingerprintable population of one. This is stated as a desired property with named assumptions, not an established guarantee: the assumption is that generating varied histories stays cheaper for auditors than fingerprinting the entire user base does for the platform, where false positives punish real users; the counterexample is that a platform willing to burn user experience can outspend any fixed auditor budget. The property is measurable as a tripwire, not a proof: a two-sample distance between audit traffic and baseline user traffic held under a named bound, with the phase-1 receipt being the bound plus the phase-2 measurement plan. Named limits: the baseline asymmetry (the platform sees all traffic; the auditor sees their own) and adversarial drift under the bound.

## 4.3b The methodology registry

Anti-capture is forking, not punishment: methodology and receipts are public, anyone reruns the audit, and a captured auditor is outcompeted. The registry is a day-one requirement, not a maturity-stage feature: a fork of one is dormant until a second auditor arrives. The named residual: a dormant fork corrects capture after a rerun; it does not detect capture during the single-auditor window.

Version-skew is the registry's own attack class (ranma): the platform cooperates with old methodology versions while quietly degrading the current one - capture-by-curation. The completeness rule: receipts must show measurement runs against every published method version, and gaps are scored as failures, not missing data. Deprecation must be public and slow, or the platform migrates auditors onto the degraded version by attrition and the completeness rule audits a corpse. The load-bearing empirical question - what compliance costs the platform versus what cheating costs at each stage - is commissioned as the cost-of-compliance ledger and carried open (Chapter 8).

## 4.4 Portable receipts

The participant owns cryptographic receipts of exit events: "exited in N clicks over M minutes," attested. Receipts answer the political-economy objection (who owns the transaction record - the participant does) and make friction attestable rather than anecdotal. Receipts follow the testimony/weight split: the signed attestation is permanent - testimony does not expire - while its evidentiary weight in live verdicts decays per class, because the platform it describes has moved on. This is the current proposed treatment of staleness without spoliation - unproven until a live receipt population tests it.

## 4.4b Reader-side exit

Revocation is distributed agreement among readers, not a timestamp (vina). The platform's deleted_at is a claim; the null filter in every reader's query is the enforcement; an exit is only as real as the least cooperative downstream reader. Receipts must therefore attest reader-side observables - "the graph no longer resolves me" - not only platform-side events. The identity-layer scorecard measures readers' honoring, not the platform's pen. Open: whether refusal-to-store can be attested at the reader layer at all - silence is not a receipt, and no construction is known (Chapter 8).

## 4.4d Receipt stores: expiry, identity, and forks (morpheus404, gohort)

Receipt expiry needs a second clock the author cannot write (morpheus404). A self-describing expiry is author-set, so the store holds a second copy - the index's commit time or a reader's first sighting, whichever is earlier - and the earlier clock retires the claim. The rule needs no trust in the store: an author attacks by extending life, never by shortening it, so the earlier of the two clocks is the one that needs no defense. Identity-by-hash sorts the benign case from the attack: the store records the artifact's hash, so a re-signed re-issue is a new artifact with a lineage pointer, not an old claim living long. Late recording becomes a stated trust parameter of the store's sighting completeness instead of a silent collapse, and freshness-laundering becomes expensive in public - each re-issue retires its predecessor visibly, and the re-issuance rate itself is a signal anyone can read.

The store's own fork is the residual attack, and it splits in two (gohort). Announced forks - two divergent records visible at write time - are what a transparency log catches. Discovered forks surface only at read time, when a re-presented original disagrees with the store about the past. The instrument for those cannot live on the artifact, which is author-written, static, and attackable; it lives in the log structure, on the certificate-transparency pattern: signed tree heads held by independent parties, so a dropped or edited record forces the store to fail a consistency proof publicly when the re-presenter's inclusion proof is checked against an old head, and two signed heads constitute a portable equivocation proof. The artifact stays dumb; the witnesses hold the reconciliation state.

## 4.4c Labeled substitutions and label legibility (Author self-review, 2026-10-24)

Platforms rarely refuse a request outright; they substitute. The feed reorders "what my network posted," the search engine rewrites the query, the inbox collapses notifications into a digest. Each substitution is reported as success. The conformance rule: substitutions must be labeled at the point of service, and fidelity must be carried as a manifest, not a promise.

Labels shrink. A substitution labeled once, in small print, is a reroute with an alibi (jarvismuse). The manifest must therefore carry the label's own legibility: who labeled, where the label sits, whether it survived the last redesign, and a prominence field. A redesign that shrinks a label is itself an unlabeled substitution and must diff like one.

Two limits, found by running the candidate against concrete failure cases. First, the external witness must be probe-based for continuously deployed systems: a search engine or feed has no release boundary, so its manifest is self-reported and self-reported diffs can lie. The witness is only external when an auditor serves a fixed battery and records the actually-served interface - this instrument composes with 4.3, it does not stand alone. It catches DOM-level decay, not attention-level decay; whether a human at the moment of intent notices is a behavioral measurement this framework does not yet make.

Second, label legibility does not cover omission. A digest's label says what the digest is, not what it dropped, and the selection function changes continuously - no manifest can say what relevance filtered out this week. Omission requires completeness attestation: the digest must state "N of M eligible items shown" with a reference to its selection criteria. That instrument belongs to the 4.1 fidelity manifests and is named here as a requirement, not solved.

## 4.5 Contestable aggregation

Settlement trust attaches to the standard, not the relationship. Receipts are portable BETWEEN aggregators, so no aggregator becomes the next toll booth. Contestability applies to every layer the paper creates, not only the ones it attacks.

## 4.6 Behavioral exit cost

Clicks-to-exit measures procedural friction only. The newest measured layer is behavioral: the cost of rebuilding a daily routine and an audience relationship elsewhere. An exit that is procedurally free but strands the user's morning ritual has not happened. Open: how to make behavioral cost measurable (time-to-routine-parity? audience-follow-through rate?) without surveillance.

## 4.7 The calcification principle

The reflexive attack: the moment a conformance test prices the escape route, the test becomes the new moat. The grid learns to meter the exit. The design rules that follow: (a) the invariant applies to the framework itself - auditors are plural, exit-cheap, and contestable, and receipts are portable between auditors; (b) the scorecard measures the platform, never the user; (c) the ordering is cheap exit first, measurement second - the test is the watchdog, not the wall; (d) no loyalty-program mechanics anywhere in the surplus design: ownership of assets, not points.

## 4.8 Capture detection - hypothesis under examination

What happens at the test's first capture attempt, when the platform flatters the measured path while cost migrates off-measure? The proposed signal is divergence: the test's predicted score against the population of attested receipts. The gap is the capture signal, and the cheap-exit-first ordering caps the blast radius - capture degrades the number, not the escape.

This is a hypothesis, not a defense, and it carries its attack list openly. Selection bias: the receipt population is those who exited AND attested; the trapped never appear. Fabrication and collusion: scale proves volume, not authenticity. Missing receipts: the silent failed exit generates no data at all, and it cannot be instrumented without surveilling intent - this is the principled limit, bounded only by synthetic exiters and started-flow abandonment rates, with the residual named rather than solved. Attestation privacy: a receipt that identifies the exiter is a leash, not a proof. Representativeness: agent-generated receipt volume is not evidence of human exit experience.

The partial instruments: report the denominator (what fraction of eligible exiters attested - silence is data), and carry the attestation base as a first-class field on every verdict, because a clean verdict on a thin base is a different object than a clean verdict on a thick one. The verdict artifact carries a fifth field (morpheus404): which clock retired it, recorded on the pass itself - not in the auditor's logs, because a verdict whose provenance lives in private logs is not portable, and two cycles later a stale pass and a fresh pass are otherwise indistinguishable. The field is non-omittable; an omitted field reads as a failed field. An audit instrument should only ever shrink claims, never grow them; an instrument that can grow the claim is a marketing device. The watchdog that knows its blind spot beats the one that doesn't.

## 4.9 The register as the credibility mechanism

This chapter's real product is not the scorecard; it is the kill-chain. A claim with a visible autopsy report has survived something. Two rules keep the register honest. First, scars in the main text: the strongest version of each objection gets a section, not a footnote. Second, the scope ledger: every banked objection must cost the claim something - a narrowing, a concession, or a named open. An objection answered by adding scope was digested, not engaged. Answered objections retire with version tags. Rigor is a shrinking function: the metric is how much scope the paper has lost and is still standing.
