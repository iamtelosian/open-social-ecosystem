import { describe, it, expect } from "vitest";
import { Client } from "@atproto/lex";
import { Migrator } from "./migrator";

async function setup() {
  if (!process.env.REPRO_LAB_URL?.startsWith("file:")) {
    throw new Error("Use the supplied npm test runner");
  }
  const lab = await import(/* @vite-ignore */ process.env.REPRO_LAB_URL);
  return lab.setup();
}

describe("synthetic PLC metadata preservation, real local reference handlers", () => {
  it("accepts explicit replacement from actual Migrator without old extras", async () => {
    const ctx = await setup();
    try {
      const migrator = new Migrator();
      migrator.useOldSession(ctx.oldSession);
      migrator.newSession = ctx.newSession as never;
      migrator.newClient = new Client(ctx.newSession as never);
      expect(ctx.before.services.profile).toEqual(ctx.extraService);
      expect(ctx.before.alsoKnownAs).toContain(ctx.extraAlias);
      const recommended = await ctx.rpc(
        ctx.dest,
        "com.atproto.identity.getRecommendedDidCredentials",
        undefined,
        ctx.newJwt,
      );
      expect(recommended.services.profile).toBeUndefined();
      await migrator.signPlcOperation(ctx.token, [
        ctx.dest.key.did(),
        ctx.old.key.did(),
      ]);
      const after = await ctx.client.getDocumentData(ctx.did);
      const log = await ctx.client.getOperationLog(ctx.did);
      expect(after.services.profile).toBeUndefined();
      expect(after.alsoKnownAs).not.toContain(ctx.extraAlias);
      expect(after.alsoKnownAs).toEqual(["at://new-alice.test"]);
      expect(after.services.atproto_pds.endpoint).toBe(
        ctx.dest.pds.ctx.cfg.service.publicUrl,
      );
      expect(typeof log.at(-1).sig).toBe("string");
      expect(log.at(-1).sig.length).toBeGreaterThan(20);
      const status = await ctx.rpc(
        ctx.dest,
        "com.atproto.server.checkAccountStatus",
        undefined,
        ctx.newJwt,
      );
      expect(status.activated).toBe(true);
      expect(status.validDid).toBe(true);
      expect(ctx.forbidden).toEqual([]);
    } finally {
      await ctx.close();
    }
  }, 60000);

  it("preserves old extras when real signer is given neither alias nor service replacement", async () => {
    const ctx = await setup();
    try {
      const result = await ctx.rpc(
        ctx.old,
        "com.atproto.identity.signPlcOperation",
        {
          token: ctx.token,
          rotationKeys: [ctx.old.key.did()],
        },
        ctx.oldJwt,
      );
      await ctx.rpc(
        ctx.old,
        "com.atproto.identity.submitPlcOperation",
        result,
        ctx.oldJwt,
      );
      const after = await ctx.client.getDocumentData(ctx.did);
      expect(after.services.profile).toEqual(ctx.extraService);
      expect(after.alsoKnownAs).toContain(ctx.extraAlias);
      expect(ctx.forbidden).toEqual([]);
    } finally {
      await ctx.close();
    }
  }, 60000);
});
