# Synthetic PLC metadata replacement reproducer

A small integration reproduction for [PDSMOOver issue2](https://tangled.org/pds.dad/pds-moover/issues/2), not a fix or a new bug report.

It runs the actual pinned `Migrator.signPlcOperation` against two local reference PDS servers and a local PLC server. One test observes accepted explicit replacement losing a prior synthetic profile service and HTTPS alias. A negative control omits those fields from a real signing request and observes them preserved through accepted submission.

## Run

Requires Git, npm, and **Node24.22.1** on a machine that can install `better-sqlite3` and the pinned pnpm native binary. Verified on Linux x64. Other platforms have not been tested. No account, Docker, PostgreSQL, Redis, API key or personal data is needed.

From this directory:

```sh
node --version  # must print v24.22.1
npm ci
npm test
```

The first install downloads dependencies and may run native-addon install scripts. The test runner downloads the public pinned PDSMOOver source and its locked client dependencies. Internet is needed for these preparation reads. It uses the locally installed pnpm12.9.1, not an ambient pnpm.

`npm test` checks the runtime version, clones into a fresh temporary directory, checks out the exact commit, installs that checkout's filtered frozen dependencies with lifecycle scripts disabled, copies in the authored test and runs it. It removes the checkout afterward. The lab creates temporary synthetic SQLite stores, destroys its servers and removes those stores after each case. An OS kill or crash can interrupt cleanup; never run this with personal data or production credentials.

Expected result: **2 tests passed**, followed by a summary stating the explicit-replacement and omitted-field-control outcomes. No fixed local directory, port, credential or fixture checkout is required. The run prints test status, not captured session objects, email tokens or private execution logs.

## What is real and what is substituted

- Real reference PDS HTTP handlers, synthetic account authentication and email-token validation.
- Real PLC signatures and next-operation validation in the local reference PLC server.
- Upstream PLC in-memory database instead of a production PostgreSQL directory. Its `validateAndAddOp` calls actual `assureValidNextOp`.
- Intercepted email delivery; the token stays in the test process.
- Synthetic prior metadata under reserved `.test` names.
- Runtime listener binding is forced to and asserted as127.0.0.1. A process-level TCP guard rejects non-loopback destinations during the lab. This guard is a test aid, not a hardened sandbox or production security guarantee.

The source account is created, given the extra metadata, and used to authorize a deactivated destination account for the same DID. The actual client method obtains real destination recommendations, requests signing, submits the operation and activates the destination. Readback checks accepted local directory state and destination status. The control signs/submits directly on the source with no alias/service fields in the request.

This does **not** transfer posts, blobs or preferences, test a whole migration, write to the public PLC directory, prove a production incident, prove audience continuity, or measure demand. No browser OAuth flow is tested. It is not a production-ready service, dependency-security approval or automated repair tool. Do not point it at live accounts.

## Pins and result

See [RESULT.md](RESULT.md) for exact versions, verified outcome and limits. Lab dependencies are fixed by `package-lock.json`; upstream client dependencies are fixed by the pinned checkout's `pnpm-lock.yaml`.

The lab dependency tree had38 npm audit findings on12November2026 (3low,5moderate,30high). Pins are retained to reproduce behavior, not recommended for deployment. Use a disposable local environment; do not expose its services or put valuable credentials in it.

## Files

- `run-repro.mjs`: preparation, pin checks, test execution and checkout cleanup.
- `lab.mjs`: synthetic accounts, reference servers, connection guard and cleanup.
- `metadata-repro.test.ts`: the two accepted-state assertions.
- `package.json`, `package-lock.json`: local dependency pinning.
- `LICENSE`, `THIRD_PARTY_NOTICES.md`: authored-code license and upstream notices.

No upstream source snapshot, private artifact, stored credential or execution transcript is distributed here. Source is fetched from the public upstream during preparation. This package is independent of the upstream projects and does not imply their endorsement.
