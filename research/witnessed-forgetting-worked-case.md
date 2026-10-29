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
- **Gap detection on sequential ids.** Passes on all four. Ids are consumed by issuance, not by retirement; no retirement event moves the sequence. Gap detection protects the issuance surface, not the retirement surface.
- **Commit-reveal sampled audit.** F1: consistent wherever the sample lands. F2: FIRES if the sample selects stub #42 - detection is probabilistic in the sample size, which is what "funding buys sample size" means concretely. F3 and F4: the suppressed event is in neither sampleable population - there is no stub to select and no record to select - so no draw can land on it. The salt ceremony protects selection integrity inside a population; the population here is keeper-authored, and manipulating it predates any sampling. Commitment timing does not help: binding the revealer before the retirements exist does not put a suppressed retirement into the record.
- **Hash binding (stub binds id to content hash).** Authenticates the bytes of stubs that exist. F1 and F2: fine. F3 and F4: there is nothing to bind. The binding protects stub integrity, not stub existence.
- **Reader-side slices.** F1: RD sees stub #41 in slices. F2: sees stub #42 (and cannot see the missing record - the record is not reader-visible). F3: RD sees nothing; absence is not announced, and only a reader who previously tracked #43 could even ask. F4: FIRES deterministically for any reader who retrieves #44 - the entry carries its own rule and the store-attested clock, so service past expiry is visible on the face of the entry. The zombie attack is self-announcing per retrieval; no sampling is needed.
- **Independent denominator (W).** F3 fires ONLY here. W directly knows that #43's rule fired - W is the author, or a prior retriever who kept a copy, and for a time-based rule anyone who held the entry knows its due date. That supplies the bounded-input condition: independent evidence that an eligible retirement occurred, plus an observable mapping (the rule and clock entail an expected stub and an expected record). The missing pair is then witnessed, and the stub-count cross-check fires against an external denominator instead of the keeper's own surfaces.

## Where the case breaks

Under one keeper, every internal check passes F3. Each mechanism protects a boundary the attack does not cross: commit-reveal protects selection integrity, not population integrity; sequential ids protect issuance integrity, not retirement integrity; hash binding protects stub bytes, not stub existence; the cross-reference protects consistency, not coverage. F4, the zombie, is the weak attack - it announces itself on the face of the entry at every retrieval - so a rational keeper is pushed toward F3, the erasure, and F3 is caught by nothing inside the keeper's surfaces. What fires is only the independent denominator: a witness outside the keeper who knows the retirement was due. Retirement silence is not verified forgetting - the same shape as the refusal log's "silence is not verified quiet," one level down.

## What the case is for

- It names the load-bearing assumption precisely: the construction detects adversarial suppression only when an eligible retirement is independently evidenced and observably mapped to expected records. Every other mechanism is a consistency check over keeper-authored surfaces - useful, and graded as such in the construction file, but not coverage.
- It separates the two adversarial directions: the zombie (F4) is self-announcing through the entry's own rule and clock; the erasure (F3) is the silent one and sets the witness requirement.
- It gives the separated-keepers variant its exact target: with the stub index and the decay record under different keepers, F3 requires collusion rather than unilateral action - the bilateral-suppression shape, with the same witness requirement, and separate keepers strengthen the check without establishing independence.
- Scope: synthetic illustration; access model - K controls all three surfaces, AU has sample access to the two lists, W has direct knowledge of one triggering event; F3 and F4 need no collusion (single party); no prevalence claim; the construction remains conceptual and untested.
