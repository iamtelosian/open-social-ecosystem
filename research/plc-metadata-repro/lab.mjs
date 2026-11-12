// Reference harness pattern adapted under MIT; see THIRD_PARTY_NOTICES.md.
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import net from "node:net";
import { randomBytes } from "node:crypto";

// No listener or outgoing TCP connection may leave this machine.
const originalListen = net.Server.prototype.listen;
net.Server.prototype.listen = function (...args) {
  if (typeof args[0] === "number") {
    if (typeof args[1] === "string") args[1] = "127.0.0.1";
    else args.splice(1, 0, "127.0.0.1");
  } else if (args[0] && typeof args[0] === "object")
    args[0] = { ...args[0], host: "127.0.0.1" };
  return originalListen.apply(this, args);
};
const originalConnect = net.Socket.prototype.connect;
const forbidden = [];
net.Socket.prototype.connect = function (...args) {
  const a = Array.isArray(args[0]) ? args[0] : args;
  const opts = a[0];
  const host =
    typeof opts === "object"
      ? opts.host
      : typeof a[1] === "string"
        ? a[1]
        : "localhost";
  if (host && !["localhost", "127.0.0.1", "::1"].includes(host)) {
    forbidden.push(host);
    throw new Error("Non-loopback socket forbidden: " + host);
  }
  return originalConnect.apply(this, args);
};
const { PDS } = await import("@atproto/pds");
const { Secp256k1Keypair } = await import("@atproto/crypto");
const plc = await import("@did-plc/lib");
const { PlcServer, Database } = await import("@did-plc/server");
async function freePort() {
  const s = net.createServer();
  await new Promise((r) => s.listen(0, r));
  const p = s.address().port;
  await new Promise((r) => s.close(r));
  return p;
}
export async function setup() {
  const dirs = [],
    pdses = [];
  const directory = PlcServer.create({
    db: Database.mock(),
    port: await freePort(),
  });
  await directory.start();
  assert.equal(directory.server.address().address, "127.0.0.1");
  const plcUrl = "http://localhost:" + directory.server.address().port;
  const client = new plc.Client(plcUrl);
  async function makePds(label) {
    const dir = await fs.mkdtemp(
      path.join(os.tmpdir(), "signing-" + label + "-"),
    );
    dirs.push(dir);
    const key = await Secp256k1Keypair.create({ exportable: true });
    const pds = await PDS.fromEnv({
      devMode: true,
      port: await freePort(),
      dataDirectory: dir,
      blobstoreDiskLocation: path.join(dir, "blobs"),
      plcRotationKeyK256PrivateKeyHex: Buffer.from(await key.export()).toString(
        "hex",
      ),
      jwtSecret: randomBytes(32).toString("hex"),
      adminPassword: randomBytes(24).toString("hex"),
      didPlcUrl: plcUrl,
      serviceHandleDomains: [".test"],
      inviteRequired: false,
      disableSsrfProtection: true,
      rateLimitsEnabled: false,
      crawlers: [],
      bskyAppViewUrl: "https://appview.invalid",
      bskyAppViewDid: "did:example:invalid",
      modServiceUrl: "https://moderator.invalid",
      modServiceDid: "did:example:invalid",
    });
    pdses.push(pds);
    pds.ctx.mailer.transporter.sendMail = async () => ({});
    await pds.start();
    assert.equal(pds.server.address().address, "127.0.0.1");
    const url = "http://127.0.0.1:" + pds.ctx.cfg.service.port;
    return { pds, url, key };
  }
  async function close() {
    const results = await Promise.allSettled([
      ...pdses.map((p) => p.destroy()),
      directory.destroy(),
    ]);
    const removed = await Promise.allSettled(
      dirs.map((d) => fs.rm(d, { recursive: true, force: true })),
    );
    const errors = [...results, ...removed]
      .filter((r) => r.status === "rejected")
      .map((r) => r.reason);
    if (errors.length) throw new AggregateError(errors, "Lab cleanup failed");
  }
  try {
    const old = await makePds("old"),
      dest = await makePds("new");
    async function rpc(side, method, body, jwt) {
      const res = await fetch(side.url + "/xrpc/" + method, {
        method: body === undefined ? "GET" : "POST",
        headers: {
          ...(body == null ? {} : { "content-type": "application/json" }),
          ...(jwt ? { authorization: "Bearer " + jwt } : {}),
        },
        ...(body == null ? {} : { body: JSON.stringify(body) }),
      });
      const text = await res.text();
      if (!res.ok) throw new Error(method + " " + res.status + " " + text);
      return text ? JSON.parse(text) : {};
    }
    const password = randomBytes(20).toString("hex");
    const account = await rpc(old, "com.atproto.server.createAccount", {
      handle: "alice.test",
      email: "alice@example.test",
      password,
    });
    const did = account.did;
    const extraAlias = "https://alice.example.test/about",
      extraService = {
        type: "ProfileService",
        endpoint: "https://profile.example.test",
      };
    await client.updateData(did, old.key, (op) => ({
      ...op,
      alsoKnownAs: [...op.alsoKnownAs, extraAlias],
      services: { ...op.services, profile: extraService },
    }));
    const before = await client.getDocumentData(did);
    const auth = await rpc(
      old,
      "com.atproto.server.getServiceAuth?aud=" +
        encodeURIComponent(dest.pds.ctx.cfg.service.did) +
        "&lxm=com.atproto.server.createAccount",
      undefined,
      account.accessJwt,
    );
    const migrated = await rpc(
      dest,
      "com.atproto.server.createAccount",
      { did, handle: "new-alice.test", email: "alice@example.test", password },
      auth.token,
    );
    let token;
    old.pds.ctx.mailer.sendPlcOperation = async (params) => {
      token = params.token;
    };
    await rpc(
      old,
      "com.atproto.identity.requestPlcOperationSignature",
      null,
      account.accessJwt,
    );
    assert.equal(typeof token, "string");
    function session(side, jwt) {
      return {
        did,
        async fetchHandler(pathname, init) {
          const url = new URL(pathname, side.url);
          assert.equal(url.origin, new URL(side.url).origin);
          return fetch(url, {
            ...init,
            headers: {
              ...Object.fromEntries(new Headers(init?.headers)),
              authorization: "Bearer " + jwt,
            },
          });
        },
      };
    }
    return {
      old,
      dest,
      did,
      before,
      extraAlias,
      extraService,
      token,
      client,
      rpc,
      oldJwt: account.accessJwt,
      newJwt: migrated.accessJwt,
      oldSession: session(old, account.accessJwt),
      newSession: session(dest, migrated.accessJwt),
      forbidden,
      close,
    };
  } catch (e) {
    try {
      await close();
    } catch (cleanupError) {
      throw new AggregateError([e, cleanupError], "Setup and cleanup failed");
    }
    throw e;
  }
}
