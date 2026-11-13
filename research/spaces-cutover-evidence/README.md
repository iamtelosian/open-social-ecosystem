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

## Reproduce the exact harness

**13 November 2026 setup update:** `setup-and-run.sh` was validated end-to-end in a second new checkout with no existing `node_modules` or compiled PDS output. The exact harness and its assertions are unchanged. This closes the earlier prepared-workspace-only setup gap for the recorded Linux runtime, not for every machine or platform.

Prerequisites: Linux x64, Bash, Git, GNU `timeout`, `sha256sum`, Node **22.23.4**, and a working `pnpm` command that honors the upstream `packageManager` pin to **12.16.1** (for example, Corepack configured before running). Network access to GitHub and package registries is needed during setup. Package-manager downloads/store and native dependency caches may be reused. A cold package cache, a different Node version, macOS/Windows and unavailable registries were not tested. No credentials, account, Docker, Redis, Postgres, payment or public listener is needed by the harness.

Download this evidence directory, inspect the script, and from that directory run:

```sh
bash setup-and-run.sh /absolute/path/to/a-new-checkout
```

The destination must not exist. The script checks the harness digest, fetches the exact reference source pin, checks runtime versions, performs a frozen install with lifecycle scripts initially disabled, builds only required tooling/PDS code, generates required lexicons/mail templates, builds the OAuth UI runtime manifest and rebuilds SQLite. Each setup command has a 90-second bound, and the local harness has a 45-second bound. It stops at the first failure; do not interpret setup failures as protocol failures. A timed-out/killed run may leave its checkout or temporary fixture state for inspection. Nothing in the script deploys a service.

To avoid the unrelated full dev-env/legacy API build, the script emits only upstream's unchanged `plc.ts` and `get-port.ts` test-fixture sources using the pinned workspace TypeScript compiler in ESM mode. This is syntax transpilation, **not** full dev-env typechecking. The PDS and its TypeScript project references are built with `tsc --build`. The full upstream dev-env migration suite was not run. Mail templates, the UI bundle and native dependency binaries are setup prerequisites, not additional capability validations.

The successful script run left tracked upstream source/lockfiles unchanged. It copied no generated output from the earlier prepared checkout. The only authored untracked upstream-checkout file was the exact published harness. Shared package/dependency caches on this machine were available, so "fresh checkout" must not be read as "fresh operating system with empty caches."

The 12 November `output.txt` remains the original successful output. The new setup run produced the same 21-check output and cleanup, byte-for-byte. `setup-validation.md` records the bounded setup result and its remaining limits. `manifest.json` holds SHA-256 digests; `THIRD_PARTY_NOTICES.md` retains attribution. No Group compatibility, automatic convergence, public federation or other protocol claim is added by making this existing harness easier to run.
