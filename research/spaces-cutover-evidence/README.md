# Spaces cutover evidence and a Group-policy compatibility question

12 November 2026. Local synthetic evidence at one reference revision, not a Group migration or a production claim.

## The question

Which pinned Group policy revision and host implementation should a contributor use to test `exportSpaceMeta` / `importSpaceMeta` / `importRepo` against the current Spaces reference APIs?

The [Group proposal](https://tangled.org/opensocial.group/proposal/blob/main/proposal.md), checked at [2b41a9bf9171c03a1aa5ee26c6e39823ba27c79d](https://tangled.org/opensocial.group/proposal/commit/2b41a9bf9171c03a1aa5ee26c6e39823ba27c79d), still describes itself as a peer of `simplespace`. The [Spaces proposal](https://github.com/bluesky-social/proposals/tree/main/0016-permissioned-data), checked at `2755e73a31511c54729921b50340944ba8b02c93`, instead specifies STAR metadata, baseline policies and separate metadata import before the authority repo. [Reference PR5187](https://github.com/bluesky-social/atproto/pull/5187), checked at `70299726b995d9be59017a6e175c269b0add0c34`, has those handlers. This is a revision/implementation seam to resolve, not proof that no compatible Group host exists.

A helpful answer would identify a host source revision, the Group policy type and policy-state keys it imports/exports, and any required ordering beyond metadata-before-authority-repo. A correction to the premise with a source pin is equally useful. No maintainer has validated this result or the question.

## What the retained run did

`post-cutover-spike.mjs` is the exact successful harness. `output.txt` is its successful terminal output: 21 checks, including setup and negative controls, not 21 separate migration scenarios. It uses two local reference PDSes and a mock PLC, with synthetic accounts and `com.atproto.memberspace.policy` at both ends. The `com.example.group` space-type label is only a fixture label, not Group implementation.

1. Export/import authority Space metadata before its own repo. Check policy state, writer set, member read/write grants, authority records and data root. Re-upload a referenced blob separately. Reject wrong ordering, unauthorized account, mismatched repo, unsupported policy and unknown policy-state key.
2. Perform the reference signature/submit handshake against the mock PLC, change the authority's published PDS endpoint, activate the destination and deactivate the old authority account. Explicitly refresh that DID on both PDSes.
3. Stationary writer and read-only members obtain fresh destination credentials and read the migrated authority record. An explicit authenticated writer notification admits the writer to the destination's writer set. A destination-issued read-only credential reads that writer's new record on the original PDS.
4. The read-only member's local repo write **succeeds**. Its authenticated writer notification is rejected with `Forbidden`, and its repo stays out of the authority writer set. The policy boundary tested is writer admission, not local record creation denial.

Listeners are forced to loopback. The harness blocks attempted non-loopback TCP, and the retained run recorded no attempts. Services closed and synthetic state was removed. It disables normal protections such as rate limits/SSRF protection for the local fixture. Do not run this as a deployed service.

## What this does not establish

Only the authority repo moved. Members' repos stayed on the old PDS. This is not a Group-policy test, cross-implementation test, public federation test, whole-community migration, production security review, demand test or adoption evidence. Explicit DID refresh is not automatic cache convergence. Explicit notifications are not background delivery. Fresh-credential reads do not establish old-token revocation timing or uninterrupted access. `listRecords` was used, not a MAC-verified record/commit endpoint.

The Group proposal expressly excludes private join requests, moderation queue/history and OAuth sessions from migration. Even a compatible Group-policy result would need to keep those exclusions visible; transferring group-authored repo records alone would not prove operational community continuity.

## Execution conditions and remaining reproduction gap

Recorded runtime: Node 22.23.4, pnpm 12.16.1, Linux x64. No tracked upstream files were changed.

This is retained passing code/output from a **prepared workspace**, not a verified clean reproduction package. A fresh checkout-to-pass sequence has not been validated. The frozen workspace install initially disabled lifecycle scripts; required lexicon/protobuf/template generation and a PDS-only TypeScript build completed; the OAuth-provider UI bundle was built to provide the runtime manifest; `better-sqlite3` was explicitly rebuilt for this Node runtime. The full dev-env build/migration suite was not completed after bounded legacy API-generation timeouts. Intermediate build failures were setup failures, not protocol failures. Do not infer that the upstream full suite passed.

The harness imports built workspace packages and `packages/dev-env/dist/plc.js` directly, not the dev-env package barrel or its generated legacy client. In an already prepared checkout at the pinned revision, place it at `packages/pds/post-cutover-spike.mjs`, then from that checkout's root run:

```sh
node packages/pds/post-cutover-spike.mjs
```

That is the harness invocation, not a complete clean setup recipe. The exact successful source and output are retained so another contributor can inspect assertions and challenge their scope even before the clean setup gap is closed. SHA-256 digests are in `manifest.json`. Attribution is in `THIRD_PARTY_NOTICES.md`.
