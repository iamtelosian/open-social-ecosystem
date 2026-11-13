#!/usr/bin/env bash
# Linux fresh-checkout recipe for one pinned synthetic harness, not a service.
set -euo pipefail
PIN=70299726b995d9be59017a6e175c269b0add0c34
HARNESS_SHA=3cfa36da5ba3515ac77338d0c97b3415d9bc279b5fd4c5ef7603d51c3612c165
HERE=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
if [[ $# != 1 ]]; then echo 'Usage: bash setup-and-run.sh /absolute/path/to/new-checkout' >&2; exit 2; fi
DEST=$1
if [[ "$DEST" != /* || -e "$DEST" ]]; then echo 'Destination must be an absolute path that does not exist.' >&2; exit 2; fi
for command in git node pnpm timeout sha256sum; do command -v "$command"; done
[[ $(node --version) == v22.23.4 ]] || { echo 'This recipe was validated only with Node22.23.4; use that runtime.' >&2; exit 2; }
printf '%s  %s\n' "$HARNESS_SHA" "$HERE/post-cutover-spike.mjs" | sha256sum --check -
step() { printf '\nSETUP STEP: %s\n' "$*"; timeout 90 "$@"; }
step git clone --no-checkout --depth 1 https://github.com/bluesky-social/atproto.git "$DEST"
cd "$DEST"
step git fetch --depth 1 origin "$PIN"
step git checkout --detach FETCH_HEAD
[[ $(git rev-parse HEAD) == "$PIN" ]]
[[ ! -e node_modules && ! -e packages/pds/dist ]]
[[ $(pnpm --version) == 12.16.1 ]] || { echo 'pnpm12.16.1 required (the upstream packageManager pin); see README prerequisites.' >&2; exit 2; }
step pnpm install --frozen-lockfile --ignore-scripts
step pnpm run build:tooling
# Required local lexicons are installed from upstream's checked-in resolver inputs.
step pnpm --filter @atproto/pds run lex:install --ci
step pnpm --filter @atproto/lex-client run prebuild
step pnpm exec tsc --build packages/pds/tsconfig.build.json
step pnpm --filter @atproto/pds run codegen:templates
step pnpm --filter @atproto/oauth-provider-ui run prebuild
step pnpm --filter @atproto/oauth-provider-ui run build:ui
step pnpm rebuild better-sqlite3
# Emit only the two unchanged PLC-fixture sources the harness imports. No dev-env
# package barrel, generated legacy API, full dev-env build or typecheck is needed.
node --input-type=module <<'JS'
import ts from 'typescript';
import fs from 'node:fs';
for (const name of ['plc', 'get-port']) {
  const source = fs.readFileSync(`packages/dev-env/src/${name}.ts`, 'utf8');
  const result = ts.transpileModule(source, {
    fileName: `${name}.ts`,
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      verbatimModuleSyntax: true,
    },
    reportDiagnostics: true,
  });
  if (result.diagnostics?.some(d => d.category === ts.DiagnosticCategory.Error)) {
    throw new Error(`Fixture transpilation failed: ${name}`);
  }
  fs.mkdirSync('packages/dev-env/dist', { recursive: true });
  fs.writeFileSync(`packages/dev-env/dist/${name}.js`, result.outputText);
  console.log(`FIXTURE EMIT: ${name}.ts (syntax transpilation, not dev-env typecheck)`);
}
JS
cp -- "$HERE/post-cutover-spike.mjs" packages/pds/post-cutover-spike.mjs
printf '%s  %s\n' "$HARNESS_SHA" packages/pds/post-cutover-spike.mjs | sha256sum --check -
# Protect tracked source/lockfiles. The one untracked authored harness is expected.
git diff --exit-code
[[ -z $(git status --porcelain --untracked-files=no) ]]
printf '\nRUN: exact published harness, unchanged assertions\n'
timeout 45 env LOG_ENABLED=false node packages/pds/post-cutover-spike.mjs
printf '\nSETUP COMPLETE: fresh checkout at %s; unchanged tracked sources.\n' "$PIN"
printf 'Checkout retained at %s for inspection; remove it when finished.\n' "$DEST"
