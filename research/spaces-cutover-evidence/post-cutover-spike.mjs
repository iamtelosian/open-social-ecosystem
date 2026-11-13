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
const { PDS } = await import('@atproto/pds');
const { Secp256k1Keypair, P256Keypair } = await import('@atproto/crypto');
const { TestPlc } = await import('../dev-env/dist/plc.js');
const { readSpaceMetaStar, writeSpaceMetaStar, createSpaceSigHeaders } = await import('@atproto/space');
async function freePort() { const s=net.createServer(); await new Promise(r=>s.listen(0,r)); const p=s.address().port; await new Promise(r=>s.close(r)); return p; }
const dirs=[], servers=[];
let directory;
const results=[];
function pass(label){results.push(label);console.log('PASS: '+label);}
async function rpc(side, method, data, token, options={}) {
 const query=options.query ? '?'+new URLSearchParams(data) : '';
 const body=options.query ? undefined : data;
 const res=await fetch(side.url+'/xrpc/'+method+query,{method:options.method??(body===undefined?'GET':'POST'),headers:{...(token?{authorization:'Bearer '+token}:{}),...(options.headers??{}),...(body===undefined?{}:{'content-type':options.encoding??(options.binary?'application/vnd.dasl.star':'application/json')})},...(body===undefined?{}:{body:options.binary?body:JSON.stringify(body)})});
 if(!res.ok){const value=await res.json();throw Object.assign(new Error(method+': '+value.error),value);}
 return options.raw?new Uint8Array(await res.arrayBuffer()):res.headers.get('content-type')?.includes('json')?res.json():undefined;
}
async function makePds(domain) {
 const dir=await fs.mkdtemp(path.join(os.tmpdir(),'baseline-space-'));dirs.push(dir);
 const key=await Secp256k1Keypair.create({exportable:true});
 const pds=await PDS.fromEnv({devMode:true,port:await freePort(),dataDirectory:dir,blobstoreDiskLocation:path.join(dir,'blobs'),plcRotationKeyK256PrivateKeyHex:Buffer.from(await key.export()).toString('hex'),jwtSecret:randomBytes(32).toString('hex'),adminPassword:randomBytes(24).toString('hex'),didPlcUrl:directory.url,serviceHandleDomains:[domain],inviteRequired:false,disableSsrfProtection:true,rateLimitsEnabled:false,crawlers:[],bskyAppViewUrl:'https://appview.invalid',bskyAppViewDid:'did:example:invalid',modServiceUrl:'https://moderator.invalid',modServiceDid:'did:example:invalid'});
 servers.push(pds);pds.ctx.mailer.transporter.sendMail=async()=>({});await pds.start();assert.equal(pds.server.address().address,'127.0.0.1');return {pds,url:'http://127.0.0.1:'+pds.ctx.cfg.service.port};
}
async function expectError(fn,expected){await assert.rejects(fn,e=>e.error===expected);pass('reject '+expected);}
try {
 directory=await TestPlc.create({});assert.equal(directory.port>0,true);
 const old=await makePds('.test'), dest=await makePds('.test2');
 const account=async(name)=>rpc(old,'com.atproto.server.createAccount',{handle:name+'.test',email:name+'@test.com',password:randomBytes(24).toString('hex')});
 const alice=await account('alice'), bob=await account('bob'), dan=await account('dan');
 const {token}=await rpc(old,'com.atproto.server.getServiceAuth',{aud:dest.pds.ctx.cfg.service.did,lxm:'com.atproto.server.createAccount'},alice.accessJwt,{query:true});
 const newAlice=await rpc(dest,'com.atproto.server.createAccount',{did:alice.did,handle:'alice.test2',email:'alice@test.com',password:randomBytes(24).toString('hex')},token);
 assert.equal(newAlice.did,alice.did);pass('same synthetic authority DID accepted at destination');
 const {space}=await rpc(old,'com.atproto.space.createSpace',{spaceType:'com.example.group',skey:'baseline',policy:{$type:'com.atproto.memberspace.policy',publishPolicy:true,publishMembers:true}},alice.accessJwt);
 await rpc(old,'com.atproto.memberspace.putMembers',{space,members:[{did:bob.did,read:true,write:true},{did:dan.did,read:true,write:false}]},alice.accessJwt);
 const blobBytes=new Uint8Array([1,2,3,4]);
 const uploaded=await rpc(old,'com.atproto.repo.uploadBlob',blobBytes,alice.accessJwt,{binary:true,encoding:'image/png'});
 await rpc(old,'com.atproto.space.createRecord',{space,repo:alice.did,collection:'com.example.spaceRecord',rkey:'before',record:{$type:'com.example.spaceRecord',text:'synthetic authority record',image:uploaded.blob}},alice.accessJwt);
 const meta=await rpc(old,'com.atproto.space.exportSpaceMeta',{space},alice.accessJwt,{query:true,raw:true});
 const repo=await rpc(old,'com.atproto.space.getRepo',{space,repo:alice.did},alice.accessJwt,{query:true,raw:true});
 await expectError(()=>rpc(dest,'com.atproto.space.importRepo',repo,newAlice.accessJwt,{binary:true}),'SpaceNotFound');
 await rpc(dest,'com.atproto.space.importSpaceMeta',meta,newAlice.accessJwt,{binary:true});
 await rpc(dest,'com.atproto.space.importRepo',repo,newAlice.accessJwt,{binary:true});
 await rpc(dest,'com.atproto.repo.uploadBlob',blobBytes,newAlice.accessJwt,{binary:true,encoding:'image/png'});
 const restoredBlob=await rpc(dest,'com.atproto.space.getBlob',{space,repo:alice.did,cid:uploaded.blob.ref.$link},newAlice.accessJwt,{query:true,raw:true});assert.deepEqual(restoredBlob,blobBytes);pass('referenced blob re-uploaded and served by destination');
 const exported=await rpc(dest,'com.atproto.space.exportSpaceMeta',{space},newAlice.accessJwt,{query:true,raw:true});
 assert.deepEqual(await readSpaceMetaStar([exported]),await readSpaceMetaStar([meta]));pass('authority metadata, policy state and writer set round-trip unchanged');
 const members=await rpc(dest,'com.atproto.memberspace.listMembers',{space},newAlice.accessJwt,{query:true});
 assert.deepEqual(members.members.sort((a,b)=>a.did.localeCompare(b.did)),[{did:bob.did,read:true,write:true},{did:dan.did,read:true,write:false}].sort((a,b)=>a.did.localeCompare(b.did)));pass('member read/write distinctions preserved');
 const records=async(s,t)=>rpc(s,'com.atproto.space.listRecords',{space,repo:alice.did},t,{query:true});
 assert.deepEqual(await records(dest,newAlice.accessJwt),await records(old,alice.accessJwt));pass('authority repo records preserved');
 const commit=async(s,t)=>rpc(s,'com.atproto.space.getLatestCommit',{space,repo:alice.did},t,{query:true});
 const a=await commit(old,alice.accessJwt),b=await commit(dest,newAlice.accessJwt);assert.deepEqual(b.commit.data,a.commit.data);assert.ok(b.commit.rev>a.commit.rev);pass('same repo data root under newer destination revision');
 const outsider=await rpc(dest,'com.atproto.server.createAccount',{handle:'outsider.test2',email:'outsider@test.com',password:randomBytes(24).toString('hex')});
 await expectError(()=>rpc(dest,'com.atproto.space.importSpaceMeta',meta,outsider.accessJwt,{binary:true}),'NotAuthorized');
 await expectError(()=>rpc(dest,'com.atproto.space.importRepo',repo,outsider.accessJwt,{binary:true}),'RepoMismatch');
 const collect=async(stream)=>{const chunks=[];for await(const c of stream)chunks.push(c);return Buffer.concat(chunks)};
 const unsupported=await collect(writeSpaceMetaStar({space:'at://'+alice.did+'/space/com.example.group/unsupported',policy:{$type:'com.example.unsupported'},policyState:[],writers:[]}));
 await expectError(()=>rpc(dest,'com.atproto.space.importSpaceMeta',unsupported,newAlice.accessJwt,{binary:true}),'UnsupportedPolicy');
 const state=await collect(writeSpaceMetaStar({space:'at://'+alice.did+'/space/com.example.group/unknown-state',policy:{$type:'com.atproto.memberspace.policy'},policyState:[{key:'com.example.allowList/'+bob.did,value:{$type:'com.example.allowList'}}],writers:[]}));
 await expectError(()=>rpc(dest,'com.atproto.space.importSpaceMeta',state,newAlice.accessJwt,{binary:true}),'InvalidSpaceMeta');
 // Follow the reference account-migration handshake against only the mock PLC.
 let operationToken;
 old.pds.ctx.mailer.sendPlcOperation=async({token})=>{operationToken=token};
 const recommended=await rpc(dest,'com.atproto.identity.getRecommendedDidCredentials',undefined,newAlice.accessJwt);
 await rpc(old,'com.atproto.identity.requestPlcOperationSignature',undefined,alice.accessJwt,{method:'POST'});
 assert.ok(operationToken);
 const signed=await rpc(old,'com.atproto.identity.signPlcOperation',{token:operationToken,...recommended},alice.accessJwt);
 await rpc(dest,'com.atproto.identity.submitPlcOperation',{operation:signed.operation},newAlice.accessJwt);
 await rpc(dest,'com.atproto.server.activateAccount',undefined,newAlice.accessJwt,{method:'POST'});
 await rpc(old,'com.atproto.server.deactivateAccount',{},alice.accessJwt);
 const newStatus=await rpc(dest,'com.atproto.server.checkAccountStatus',undefined,newAlice.accessJwt);
 const oldStatus=await rpc(old,'com.atproto.server.checkAccountStatus',undefined,alice.accessJwt);
 assert.equal(newStatus.activated,true);assert.equal(oldStatus.activated,false);assert.equal(newStatus.validDid,true);
 const didDoc=await directory.getClient().getDocumentData(alice.did);
 assert.equal(didDoc.services.atproto_pds.endpoint,dest.pds.ctx.cfg.service.publicUrl);
 pass('mock PLC endpoint cutover, destination active and old authority deactivated');
 // Explicit resolver refresh is a harness condition, not evidence of automatic convergence.
 for(const server of servers)await server.ctx.idResolver.did.resolve(alice.did,true);
 pass('authority DID refreshed explicitly on both local PDSes');
 async function credentialFor(actor){
   const key=await P256Keypair.create();
   const delegated=await rpc(old,'com.atproto.space.getDelegationToken',{space},actor.accessJwt,{query:true});
   const issued=await rpc(dest,'com.atproto.space.authorizeSpaceSync',{space,credentialKey:key.did(),delegationToken:delegated.token});
   return {credential:issued.credential,key};
 }
 async function credentialRead(cred,side,method,params){
   const {headers}=await createSpaceSigHeaders({authorization:'Atproto-Space-Credential '+cred.credential,audience:params.repo??alice.did,keypair:cred.key});
   return rpc(side,method,params,undefined,{query:true,headers});
 }
 const bobCred=await credentialFor(bob),danCred=await credentialFor(dan);
 for(const [name,cred] of [['writer',bobCred],['readonly',danCred]]){
   const read=await credentialRead(cred,dest,'com.atproto.space.listRecords',{space,repo:alice.did});
   assert.equal(read.records[0].value.text,'synthetic authority record');
   pass('stationary '+name+' gets fresh destination credential and reads migrated authority record');
 }
 const memberWrite=async(actor,rkey)=>rpc(old,'com.atproto.space.createRecord',{space,repo:actor.did,collection:'com.example.spaceRecord',rkey,record:{$type:'com.example.spaceRecord',text:rkey}},actor.accessJwt);
 await memberWrite(bob,'bob-after-cutover');
 // The write endpoint stores the member's own repo on the stationary PDS.
 // An explicit authenticated notification distinguishes policy acceptance from asynchronous transport.
 async function notify(actor){
   const latest=await rpc(old,'com.atproto.space.getLatestCommit',{space,repo:actor.did},actor.accessJwt,{query:true});
   const auth=await rpc(old,'com.atproto.server.getServiceAuth',{aud:alice.did,lxm:'com.atproto.space.notifyRepoUpdate'},actor.accessJwt,{query:true});
   return rpc(dest,'com.atproto.space.notifyRepoUpdate',{space,repo:actor.did,repoRev:latest.commit.rev,data:latest.commit.data},auth.token);
 }
 await notify(bob);
 const writers=await credentialRead(bobCred,dest,'com.atproto.space.listWriters',{space});
 assert.ok(writers.repos.some(x=>x.repo===bob.did));pass('stationary writer accepted into destination authority writer set');
 const memberRead=await credentialRead(danCred,old,'com.atproto.space.listRecords',{space,repo:bob.did});
 assert.equal(memberRead.records[0].value.text,'bob-after-cutover');pass('destination-issued readonly credential reads stationary writer repo on old PDS');
 await memberWrite(dan,'dan-local-write');pass('readonly member local repo write succeeds, as permitted by reference write semantics');
 await expectError(()=>notify(dan),'Forbidden');
 const afterDenied=await credentialRead(bobCred,dest,'com.atproto.space.listWriters',{space});
 assert.ok(!afterDenied.repos.some(x=>x.repo===dan.did));pass('readonly member excluded from destination writer set');
 assert.deepEqual(forbidden,[]);pass('no attempted non-loopback TCP connection');
 console.log('COMPLETE '+results.length+' checks; local synthetic authority-only migration. Mock PLC cutover and explicit-refresh member access only; no member repo move, automatic cache convergence, public federation or group continuity claim.');
} finally {
 const settled=await Promise.allSettled(servers.map(p=>p.destroy()));if(directory)await directory.close();for(const dir of dirs)await fs.rm(dir,{recursive:true,force:true});const failures=settled.filter(x=>x.status==='rejected');assert.equal(failures.length,0,'PDS cleanup failed');console.log('CLEANUP: services closed and synthetic data removed.');
}
