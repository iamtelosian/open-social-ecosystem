# Consent-state machine for shared-private attributes (specification proposal, 2026-10-29)

research/odrl-edge-consent-analysis.md concluded that the genuine 3.3 gap narrows to shared-private attributes (DMs, locked-audience posts, shared private media) and named what the design still needs to specify: (1) the consent-state machine - states, transitions, and who may effect them; (2) revocation-of-record as an application convention, tested against a consumer that received the asset before revocation; (3) the division of labor between protocol-state consent and expression-layer usage terms. This file proposes (1), and takes positions on (2) and (3) where the state machine forces them. Untested candidate; the falsifiers at the end are the point.

## Entities

An item (a shared-private attribute) has one author A and an audience of parties B_i. Consent state is per (item, party) pair; the item has its own lifecycle. Joint interest is the load-bearing fact: more than one party has a legitimate interest in the item's existence and distribution, so no single party's unilateral action may depend on another's participation to take effect (the block falsifier from the ODRL analysis: a consent model that requires the blockee's participation is dead on arrival).

## Per-party states (membership in an item's audience)

- OFFERED - A has designated B as audience. Whether delivery may precede acceptance is a placement decision; the ActivityPub locked-account shape (re-approval per follower) treats acceptance as prior to continued delivery.
- ACTIVE - B may receive and read the item.
- REJECTED - B declined the designation.
- REVOKED-BY-AUTHOR - A removed B from the audience. Unilateral; effective at declaration, not at acknowledgment (the block precedent: negative actions are single-author).
- WITHDRAWN-BY-PARTY - B left the audience. Unilateral; effective at declaration.

## Item-level states

- LIVE - servable to ACTIVE audience members.
- RETRACTED - A withdrew the item entirely. Unilateral; effective at declaration in the serving layer.
- EXPIRED - clock-keyed retirement (keys into the witnessed-forgetting construction; the clock's keying event stays an open item there, and this machine does not resolve it).

## Transitions and who may effect them

| Transition | Effector | Effective at |
| --- | --- | --- |
| designate (create OFFERED) | A | declaration |
| accept (OFFERED -> ACTIVE) | B | declaration |
| reject (OFFERED -> REJECTED) | B | declaration |
| revoke (ACTIVE/OFFERED -> REVOKED-BY-AUTHOR) | A | declaration |
| withdraw (ACTIVE -> WITHDRAWN-BY-PARTY) | B | declaration |
| retract (LIVE -> RETRACTED) | A | declaration |
| expire (LIVE -> EXPIRED) | clock | clock event |
| audience change (any membership state -> OFFERED) | A | declaration; re-approval required before continued delivery (AP locked-account precedent) |

The load-bearing column is the third: every transition is effective at declaration. Acknowledgment changes only what is observable, never what is in effect. This is what keeps the machine dead-on-arrival-proof against the block falsifier, and it is also what makes the observability problem somebody else's layer (below).

## Position the machine forces on (2): revocation-of-record

Revocation means no new service: after REVOKED-BY-AUTHOR or RETRACTED, the serving layer stops serving to the revoked party or to anyone. A consumer that received the asset before revocation keeps what it received; the machine does not attempt deletion-on-revoke (unenforceable, and a retained deletion-detection record would be a tombstone under another name, contradicting silent expunge - the refusal-to-credit analysis already rejected that shape). What revocation changes for prior holders is standing, not possession: post-revocation, the artifact confers no standing inside the ledger - it cannot be cited as attestation, cannot be re-imported, cannot restore a retracted record (the refusal-to-credit rule in narrowed form). Fresh first-hand testimony about the item re-enters legitimately by design; the rule constrains artifacts, not witnesses.

## Position the machine forces on (3): division of labor

Membership state (this machine) lives at the protocol layer, where ATProto and ActivityPub already keep edge state. Expression-layer usage terms (ODRL or a convention over constraints/inheritFrom) attach to the edge fact after formation - who may read, re-serve, or settle against it - and never carry formation consent. Downstream honoring (did prior holders stop re-serving after revocation?) is not a state-machine question at all: it belongs to the receipt layer (4.4) and reader-side attestation (4.4b), as already placed.

## What this does not touch

- Legal enforceability of any of this stays an open collaborator gap (3.3); this machine is a design specification, not a legal claim, and policy-semantics expertise informs its expression without establishing enforceability.
- The decay clock's keying event (write/retrieval/reliance) stays open in the witnessed-forgetting construction; EXPIRED above is a placeholder for whatever that decision produces.
- Coercion of the author or of an audience party is out of scope here, as in the refusal-to-credit analysis (no mitigation for coercion of the receiver).

## Falsifiers

- A demonstrated shared-private edge class whose semantics require per-party consent state at the expression layer - not servable by protocol-state membership plus post-formation usage terms - would reopen the ODRL profile question (targeted where the ODRL analysis already expects it).
- A demonstrated case where effectiveness-at-declaration is wrong - where a revocation must not take effect until acknowledged - would break the third column, and with it the machine's answer to the block falsifier; the cost of that case is reintroducing counterparty veto, so the case must show the veto is affordable.
- A delivery-before-acceptance deployment where OFFERED-state delivery is shown necessary (not merely convenient) would force the placement decision the machine currently leaves open.
