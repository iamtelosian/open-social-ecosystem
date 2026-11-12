import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

const PIN = "18d942d41a4ef0a1e039b4396760e9bb35324a3b";
const here = path.dirname(fileURLToPath(import.meta.url));
const work = await fs.mkdtemp(path.join(os.tmpdir(), "plc-metadata-repro-"));
const checkout = path.join(work, "moover");
const testName = "portable-metadata-repro.test.ts";
const pnpm = path.join(here, "node_modules", "pnpm", "bin", "pnpm.mjs");
function run(command, args, cwd = work, extraEnv = {}) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    env: { ...process.env, ...extraEnv },
    maxBuffer: 4 * 1024 * 1024,
  });
  if (result.status !== 0)
    throw new Error(
      `${command} failed (exit ${result.status}):\n${result.stdout ?? ""}\n${result.stderr ?? ""}`,
    );
  return result.stdout.trim();
}
try {
  assert.equal(
    process.versions.node,
    "24.22.1",
    "Use Node24.22.1 to match the verified native-addon runtime",
  );
  assert.equal(
    run(process.execPath, [pnpm, "--version"]),
    "12.9.1",
    "Pinned local pnpm version mismatch",
  );
  // Download public source without credentials. No signup, OAuth or directory writes.
  run("git", [
    "clone",
    "--quiet",
    "https://tangled.org/pds.dad/pds-moover.git",
    checkout,
  ]);
  run("git", ["checkout", "--quiet", PIN], checkout);
  assert.equal(run("git", ["rev-parse", "HEAD"], checkout), PIN);
  run(
    process.execPath,
    [
      pnpm,
      "install",
      "--filter",
      "@pds-moover/moover...",
      "--frozen-lockfile",
      "--ignore-scripts",
    ],
    checkout,
  );
  const packageDir = path.join(checkout, "packages", "moover");
  await fs.copyFile(
    path.join(here, "metadata-repro.test.ts"),
    path.join(packageDir, "lib", testName),
  );
  const result = run(
    process.execPath,
    ["node_modules/vitest/vitest.mjs", "run", "lib/" + testName],
    packageDir,
    {
      LOG_ENABLED: "false",
      REPRO_LAB_URL: pathToFileURL(path.join(here, "lab.mjs")).href,
    },
  );
  // Vitest's pass summary contains no session objects, passwords or email tokens.
  console.log(result);
  console.log(
    "PASS: accepted explicit replacement drops synthetic extras; omitted-field control preserves them.",
  );
  console.log(
    "Local test only. No full content migration or production-directory claim.",
  );
} finally {
  await fs.rm(work, { recursive: true, force: true });
}
