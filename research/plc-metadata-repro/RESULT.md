# Verified scope and result

12 November 2026

## Tested versions

| Component | Pin |
| --- | --- |
| PDSMOOver client | `18d942d41a4ef0a1e039b4396760e9bb35324a3b` |
| Reference PDS | `@atproto/pds@0.5.57` |
| Local PLC server | `@did-plc/server@0.0.1` |
| PLC signing/validation library | `@did-plc/lib@0.0.4` |
| Node | `24.22.1` |
| pnpm used for client checkout | `12.9.1` |
| Vitest resolved by upstream lock | `3.2.7` |

The published PDS source maps for signing, recommendation, submission and activation contain sources byte-identical to the corresponding files at reference-atproto commit `b4dac063aba56e4be8085d0da3888c7bc55e6102`. That comparison does not imply every dependency is identical to the reference monorepo lock. The lab's actual installed dependency resolution is its included npm lock.

## Assertions

1. Before the client call, accepted local metadata includes `services.profile` and `https://alice.example.test/about`.
2. Real destination recommendations omit those extras.
3. The actual client method signs/submits that explicit replacement. Accepted directory readback lacks both extras and has the destination PDS endpoint; destination reports activated and valid DID.
4. Separate real signer/submission control with neither `services` nor `alsoKnownAs` supplied preserves both extras.
5. No non-loopback TCP attempt occurs during either lab case. All server listeners are asserted as127.0.0.1.

Two tests pass from a clean directory using this package's installation and runner. The first packaging attempt caught ambient pnpm drift; the shipped runner avoids it by installing a local exact version. The runnable package does not depend on the earlier lab's absolute paths.

## Interpretation

This is explicit replacement without automatically merging prior extras, not unconditional stripping by the reference signer. A preservation change needs rules for conflicting service entries, obsolete aliases and additional `at://` aliases. This package chooses no merge policy and changes no upstream production code.

The current [existing issue](https://tangled.org/pds.dad/pds-moover/issues/2) already reports the broader concern. This result is a bounded reproduction, not a fresh report, fix, maintainer commitment or live-user-loss claim. No upstream issue/comment/account action was taken to publish this artifact.

## Public source references

- https://tangled.org/pds.dad/pds-moover/issues/2
- https://tangled.org/pds.dad/pds-moover.git
- https://github.com/bluesky-social/atproto.git
- https://github.com/did-method-plc/did-method-plc
