# Revocation-of-record: worked case (synthetic, 2026-10-29)

Instantiates the consent-state machine (shared-private-consent-states.md) and the refusal-to-credit standing rule on one concrete scenario, walking which rules fire when a consumer received the asset before revocation - the test named open in the ODRL analysis, item (2). Synthetic illustration, conditions intact: proposed semantics, no deployment, no conformance evidence. This does not establish that any implementation honors the rules; it shows where the convention's load sits, which is what a real test would have to check.

## Setup

A authors item X (a locked-audience post) with audience {B, C}. B is ACTIVE and received X at t0, so B holds an artifact copy. Serving freshness policy: named as a deployment choice (fail-closed or bounded-staleness, per the state machine's partition section); this case uses confirmed freshness except where stated.

## Timeline

1. t1 - A declares REVOKED-BY-AUTHOR for B. Effective at declaration in intended state. The serving layer, once fresh, serves X to B no more. C's membership is unaffected. No acknowledgment from B is required, and none vetoes anything.
2. B's held copy persists. The machine attempts no deletion-on-revoke: unenforceable over prior holders, and a ledger-side record of expunged hashes would be a tombstone under another name, contradicting silent expunge (refusal-to-credit analysis).
3. B cites X as an attestation inside the ledger. The standing rule fires: a copy carried out of - or retained past - its audience confers no standing. The citation cannot compound, cannot be re-imported as an attestation, cannot restore the record. What a conformant ledger does with the citation attempt is the observable test surface: refuse it standing, visibly.
4. B re-serves the copy to D, outside the audience. D's copy carries no standing. Whether the re-serve itself is observed is the receipt layer's problem (4.4 / 4.4b), and under partition it stays unresolved exactly as the state machine's counterexample names - the convention does not claim to prevent dissemination, only to deny it standing.
5. B testifies first-hand about X's content, fresh. Re-enters legitimately: the rule constrains artifacts, not witnesses. A ledger that cannot distinguish step 3 from step 5 has failed the convention; a ledger that refuses step 5 has over-applied it.
6. B attempts re-import of the artifact as new evidence. No standing; the anti-laundering memory lives with the receiver (the one party who already legitimately knows), per the refusal-to-credit placement - with its named costs: receiver state persistence across devices, silent protection lapse if that store is wiped, no mitigation for receiver coercion.

## What the worked case shows

The convention's load is carried by standing semantics and receiver-side memory, not by any mechanism over prior holders' copies. The testable surface is therefore protocol conformance - whether ledger consumers refuse standing to post-revocation artifacts (steps 3 and 6) while admitting fresh first-hand testimony (step 5) - and that is a question a pilot can ask of an implementation, not a property of the artifact itself. Enforcement of dissemination (step 4) is observability-layer and partition-unresolved, as named.

## Named limits

Synthetic; one author, one pair, no collusion between B and C examined; coercion out of scope (as in the refusal-to-credit analysis); the convention is proposed and conformance is untested. The partition variant is not re-walked here - it is the state machine file's worked counterexample, whose bounded conclusion (no acknowledgment veto; enforcement and observability unresolved under partition) applies unchanged.
