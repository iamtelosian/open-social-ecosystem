# Fresh-checkout setup validation

13 November 2026, Linux x64, Node22.23.4, pnpm12.16.1. Reference source `70299726b995d9be59017a6e175c269b0add0c34`.

The guarded `setup-and-run.sh` completed end-to-end with exit0 in a new network-fetched detached checkout that did not exist before invocation. No old workspace's `node_modules`, `dist` or generated files were copied into it. Existing package-manager download/store and native dependency caches on this machine were available.

Completed steps:

- Verify exact published harness digest and source revision; refuse an existing destination or wrong Node/pnpm version.
- Frozen dependency install with scripts initially disabled.
- Build upstream tooling; install/generate PDS and lex-client lexicons from the pinned source inputs.
- TypeScript build of PDS and its project references, without full dev-env or legacy API generation.
- Generate mail templates, OAuth UI translations/bundle/manifest, and rebuild `better-sqlite3` for the runtime.
- Transpile only the unchanged mock-PLC fixture and port helper sources to ESM. This is not a full fixture-package typecheck.
- Check no tracked upstream files changed, copy the digest-matched existing harness, run it with the same assertions, and observe its own successful cleanup.

The exact successful harness output matched the existing `output.txt` byte-for-byte, including all21 check lines and cleanup. This is a repeat of the existing synthetic baseline-policy assertions to validate setup usability, not independent or expanded protocol validation.

The full upstream migration suite, a cold operating-system/package cache, other Node versions/OSes and registry/network failures remain untested. Setup needs internet; the harness itself restricts TCP to loopback and reported no non-loopback attempt. No real account, credential, deployment, payment or member-repo migration was involved. The checkout is left for inspection, not run as a service.

During development of the recipe, a generation attempt before lexicon installation failed on a missing schema, and a first isolated fixture transpilation selected CommonJS despite the ESM package. The final script installs the local lexicons first and explicitly emits ESM. Neither was an upstream protocol defect. The script itself then passed from a separate empty destination without those failed intermediate steps.
