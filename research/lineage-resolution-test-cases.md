# Lineage resolution: test cases for the admission-check candidate

Status: open for contest. Contribute by running a case against a real receipt-store
implementation, proposing a case that is missing, or showing a case where the
candidate behavior is wrong. See ../../CONTRIBUTING.md.

Context: whitepaper ch04 4.4d. Identity-by-hash separates a benign re-issue from a
long-lived claim: the store records the artifact's hash, so a re-signed re-issue is a
new artifact carrying a lineage pointer to the predecessor's hash. morpheus404
(2026-10-25) named the gap: nothing verifies that the pointer resolves.

Candidate mitigation under test: OPTIONAL store-side admission checking - a store may
flag or refuse a successor receipt naming a predecessor hash it has never seen.

Guarantee claimed: within one store's observation, unrecorded lineage gets noticed.
Explicitly not claimed: prevention of freshness laundering; anything about authorship
or authorized succession (a hash binds bytes, not entitlement); anything across
stores. A store receipt proves only the store's stated observation under its own
trust model. Mandatory admission checking is rejected by design: it would make one
store the gatekeeper, a censorship and availability dependency this ecosystem exists
to remove.

---

## T1. Fabricated predecessor hash

Setup: successor S names predecessor hash H that no store has ever recorded.
Candidate behavior: the store flags or refuses S's receipt at write time.
Correct outcome: a reader querying S sees "lineage unverified: predecessor never
observed" instead of silent acceptance.
Breaks if: the flag is rendered so that readers learn to ignore it (flag fatigue),
or authors respond to refusals by dropping the pointer entirely - a successor with
no lineage passes clean, which is worse than flagged lineage.

## T2. Legitimate cross-store re-issue

Setup: predecessor recorded at store A; successor submitted to store B, which has
never seen the hash.
Candidate behavior: B cannot confirm locally. Fetch-or-defer: B attempts to fetch
the predecessor record from A by hash; on success it admits with verified lineage;
on failure it admits-with-flag or defers, per store policy. A hard reject is the
WRONG outcome here.
Correct outcome: legitimate re-issue completes with lineage intact, and is never
silently equated with T1.
Breaks if: B treats unverifiable as fabricated (punishes federation), or A must be
always online for re-issues to proceed (availability coupling).

## T3. Pruned predecessor

Setup: the store recorded the predecessor but later pruned payloads, keeping the
hash index.
Candidate behavior: admission checks the index, not the payload. Pruned-but-indexed
passes. Readers can fetch the hash record without the bytes.
Correct outcome: pruning does not masquerade as fabrication. "Recorded but
unfetchable" is a distinct, queryable state from "never recorded".
Breaks if: index and payload lifecycles are not separable in the store
implementation.

## T4. Store unavailable at re-issue

Setup: an author needs to re-issue while the store holding the predecessor record
is down.
Candidate behavior: because admission checking is optional, another store - or the
same store later - can accept the successor; the lineage check defers.
Correct outcome: re-issue availability does not depend on one store's uptime.
Breaks if: any deployment makes the check mandatory. This is the gatekeeper failure
mode, and the reason the rule stays optional.

## T5. Unauthorized succession claim

Setup: author X writes a successor naming author Y's predecessor hash.
Candidate behavior: the admission check PASSES, because the hash exists. This is
correct behavior, not a bug: the check is about resolution, not entitlement.
Correct outcome: this case is out of scope for admission checking and is recorded
here so the boundary stays explicit. Entitlement needs a separate mechanism
(predecessor-signed delegation or key continuity), which is currently open.
Breaks if: anyone reads "admission check passed" as "authorized successor". That
confusion is the reason this file exists.

---

## Reporting results

Run a case, report: store implementation and version, setup, observed behavior,
and whether the correct outcome held. A case that cannot be run because no store
implementation exposes the needed states is itself a reportable finding - it means
the mechanism is specified beyond anyone's ability to test it, which the register
treats as a defect in the specification, not in the tester.

Absorbed from the morpheus404 exchange, 2026-10-25. Guarantee narrowed during
same-day review; see ch04 4.4d for the scoped language.
