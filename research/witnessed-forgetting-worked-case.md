# Worked case: a forgetting policy under a single keeper

Status: synthetic illustration, 2026-10-29. Every actor, entry, and event below is invented. The case instantiates the witnessed-forgetting construction from research/witnessed-forgetting-construction.md under its narrowest deployment - one keeper authors both the stub index and the decay record, so the independence condition is deliberately unmet - in order to expose a specific failure: which checks fire when a retirement is suppressed, and which cannot. It is not evidence that any real deployment behaves this way, and nothing in it relaxes the conditions the construction file states.

## Cast

- **K**: the keeper. Operates the retrieval pool (live entries and stubs), the cold-store decay record, and the sequential id issuance. One party, three surfaces.
- **E**: an entry author.
- **AU**: an external auditor running the commit-reveal sampled check each period.
- **RD**: a reader who sees retrieval slices.
- **W**: an independent witness who directly knows one retirement-triggering event (the author of the entry, or a prior retriever who kept a copy).

## Setup

K deploys the construction with all three surfaces under its own control. Ids are issued sequentially from 1. Each entry carries a written expiry rule and a store-attested clock. Policy: when an entry's rule fires, K must expire the entry from retrieval, leave a stub (title, date, rule id, entry id, content hash), and append a decay-record entry. At period open K publishes the hash of a salt; at close K reveals the salt; AU samples the decay record and the stub index by hashing entry ids against the salt and checks each sampled item against the other surface.

## The period's events

- **F1 (honest retirement).** Entry #41's rule fires. K expires it, leaves stub #41, appends record #41. All surfaces agree.
- **F2 (bug: stub without record).** Entry #42's rule fires. K expires it and leaves the stub, but a fault drops the decay-record entry. Stub present, record missing.
- **F3 (adversarial erasure).** Entry #43's rule fires. K expires the entry and writes nothing: no stub, no record. The entry is gone without residue.
- **F4 (adversarial zombie).** Entry #44's rule fires. K keeps serving the entry as fresh and writes nothing. No stub, no record, and the entry persists past its own rule.

## What each check catches

- **Internal cross-reference (stub index against decay record).** F1: consistent. F2: FIRES - a stub with no matching record is exactly the witnessed-skip shape. F3 and F4: both surfaces agree, because both are silent. This is the one-keeper limit stated in the construction: the check catches the keeper's accidents, not the keeper's choices.
- **Gap detection on sequential ids.** Passes on all four. Ids are consumed by issuance, not by retirement; no retirement event moves the sequence. Gap detection checks issuance holes only against independently evidenced issuance or range (the construction file's condition), and no retirement event moves the sequence: its surface is not the retirement surface, and its issuance protection is conditional, not inherent.
- **Commit-reveal sampled audit.** F1: consistent wherever the sample lands. F2: FIRES if the sample selects stub #42 - detection is probabilistic in the sample size, which is what "funding buys sample size" means concretely. F3 and F4: the suppressed event is in neither sampleable population - there is no stub to select and no record to select - so no draw can land on it. The salt ceremony protects selection integrity inside a population; the population here is keeper-authored, and manipulating it predates any sampling. Commitment timing does not help: binding the revealer before the retirements exist does not put a suppressed retirement into the record.
- **Hash binding (stub binds id to content hash).** Authenticates the bytes of stubs that exist. F1 and F2: fine. F3 and F4: there is nothing to bind. The binding protects stub integrity, not stub existence.
- **Reader-side slices.** F1: RD sees stub #41 in slices. F2: sees stub #42 (and cannot see the missing record - the record is not reader-visible). F3: RD sees nothing; absence is not announced, and only a reader who previously tracked #43 could even ask. F4: FIRES for any reader who retrieves #44 and holds both an authentic copy of the entry's rule and version, and a clock relevant to that rule that is independent of K. The case's store-attested clock does not supply this: K is the store, and an adversary-controlled attestation can present the entry as still within its rule. Under those two conditions the zombie announces itself on the face of the entry at every retrieval, no sampling needed; without them, F4 is as quiet as F3.
- **Independent denominator (W).** F3 fires ONLY here. W directly knows that #43's rule fired - W is the author, or a prior retriever who kept a copy. A retained copy establishes some inputs, not the firing itself: for a time-based rule, anyone who held an authentic copy knows the due date given a clock they trust independently of K; for retrieval-keyed or reliance-keyed rules, the due condition is a history of events (no retrieval for a window, or no reliance), and the retained copy does not supply it - W then needs independent evidence of the trigger history itself, which is much harder to hold. That supplies the bounded-input condition: independent evidence that an eligible retirement occurred, plus an observable mapping (the rule and clock entail an expected stub and an expected record). The missing pair is then witnessed, and the stub-count cross-check fires against an external denominator instead of the keeper's own surfaces.

## Where the case breaks

Under one keeper, every internal check passes F3. Each mechanism protects a boundary the attack does not cross: commit-reveal protects selection integrity, not population integrity; sequential ids protect issuance integrity, not retirement integrity; hash binding protects stub bytes, not stub existence; the cross-reference protects consistency, not coverage. F4, the zombie, leaves a reader-visible contradiction where F3 leaves none on the surfaces this case's roles can observe. That is an observability difference under this access model, not a demonstrated incentive ranking - which attack a rational keeper prefers would need an explicit payoff and cost model this case does not carry. F3 is caught by nothing on the surfaces these roles can observe; whether other evidence exists outside the case is not claimed. What fires is only the independent denominator: a witness outside the keeper who knows the retirement was due. Retirement silence is not verified forgetting - the same shape as the refusal log's "silence is not verified quiet," one level down.

## Extension: a keeper-declared clock (2026-10-29)

Status: same synthetic illustration, extended; every actor and event still invented. Motivation: the construction's open clock-keying item, read against the retention-lock analogy pass - which contributes deployed design shapes only, under that section's stated limits, and no evidence about logs. The earlier case's clock was store-attested time; here the expiry rule keys on a DECLARED EVENT instead, the deployed event-hold shape.

Setup change: entry #45's rule is event-keyed: expire 30 days after event X is declared (the vendor-documented use shape: a business event such as contract completion). The declaration is written by whoever holds the declaring permission - here K. A ratchet of the deployed kind guards parameter changes: shortening a declared duration never moves an already-computed date earlier.

- **F5 (clock starvation).** Event X occurs. K never declares it. The rule never fires, so no retirement is due on any surface: no stub expected, no record expected, nothing for a sample to land on. Unlike the zombie (F4), where a reader holding an authentic rule copy and an independent clock sees the contradiction on the face of the entry, here the entry presents no contradiction at all: the clock it points to has not started, and nothing on the entry says whether X happened.

What fires:

- Internal cross-reference, sampled audit, hash binding, gap detection: nothing. There is no retirement to suppress, because the triggering event was never admitted into the clock. Every mechanism that caught or failed F2-F4 sits downstream of declaration; F5 is upstream of all of them.
- The deployed guards: the ratchet guards shortening a declared duration, not withholding a declaration; the policy-layer bounds on retention periods bound durations, not declaration timing. Neither touches F5.
- Reader-side slices: a reader who suspects X occurred faces the reliance-keyed difficulty in event form - the due condition is an event history, and a retained copy of the entry does not supply it.
- Independent denominator (W): F5 fires only for a W who directly knows X occurred - not merely that the entry exists - and can map X to an expected declaration, and the declaration to an expected expiry. The event-keyed clock is exactly as witnessable as its keying event. Write-time rules key on an event the store itself performed (issuance, internally cheap to witness); declared-event rules key on an event whose occurrence lives wherever X lives - and if X lives with the keeper, the clock is keeper-influenced in the strongest sense: honest computation over a withheld input.

What the extension is for:

- It names the failure the deployed guards do not cover: declaration withholding, which no clock-parameter guard touches.
- It sharpens the construction's open item: the clock-keying question is not only honesty of measurement (write, retrieval, reliance) but witnessability of the keying event itself. Keying on a declared event relocates the honesty requirement from the clock to the declaration, and the witness requirement goes with it.
- Scope: synthetic; the retention-lock analogies are vendor-documented design shapes, not evidence about any log; observability statements are under this case's access model, not an incentive ranking; no prevalence claim.

## What the case is for

- It names the load-bearing assumption precisely: the construction detects adversarial suppression only when an eligible retirement is independently evidenced and observably mapped to expected records. Every other mechanism is a consistency check over keeper-authored surfaces - useful, and graded as such in the construction file, but not coverage.
- It separates the two adversarial directions: the zombie (F4) is self-announcing only to a reader holding an authentic rule copy and an independent clock; the erasure (F3) is the quiet one on this case's observable surfaces and sets the witness requirement.
- It gives the separated-keepers variant its exact target: with the stub index and the decay record under different keepers, F3 can no longer be executed by one party's unilateral writes to both surfaces; whether suppression then requires collusion, or merely one compromised keeper plus the other's permissive access, depends on the keepers' permissions, independent records, and failure modes - not an automatic reduction to the bilateral shape, and separate keepers strengthen the check without establishing independence.
- Scope: synthetic illustration; access model - K controls all three surfaces, AU has sample access to the two lists, W has direct knowledge of one triggering event; F3 and F4 need no collusion (single party); no prevalence claim; the construction remains conceptual and untested.
