# What stops community exits: selected first-person failure and stall accounts

Status: evidence note, beneficiary-discovery workstream. Companion to exit-insurance-admin-needs.md, which studied winner announcements and carries a survivorship limit: communities whose exit failed did not publish forking announcements. This note covers the other side through public first-person retrospective accounts (2019-2026): people who attempted a community exit and saw it fail, stall, or succeed with costs.

These accounts are selected and self-reported. They are reported explanations, not verified causes. They can expose barrier classes the winner evidence cannot see; they cannot establish where failures concentrate, and they rank nothing by fatality. Speaker role, attempted action, actual outcome, and the speaker's own interpretation are kept distinct; several accounts describe more than one barrier, and are coded for each.

## The accounts

1. **Subreddit moderator, three niche tech communities, Reddit -> Lemmy (2023 wave, account from January 2024).** Migrated three communities to three Lemmy servers through their application processes. All three were removed or deleted by the receiving instances after approval; about two weeks of migrated posts were lost. The moderator gave up: "sticking with the devil we know." Barriers: destination-side governance/removal; sunk migration effort; no recourse. <https://www.reddit.com/r/ModCoord/comments/18xo06y/here_is_why_i_am_disappointed_with_the_organized/>
2. **kbin magazine head moderator (November 2023).** Moved a community to kbin during the June 2023 Reddit wave. A mirror community on lemmy.world captured the users; the kbin magazine was left "barely holding on" with near-zero discussion; the momentum window was missed and not recovered. Barriers: fragmentation across destinations with no canonical target; momentum window; engagement failure. <https://old.feddit.dk/comment/4091720>
3. **Discord community admin, several communities with hundreds of members (~2026, in progress).** "I want to leave. but I can't force people to move to a new app just for one community." Attempt ongoing. Barriers: no member compulsion; multi-community coordination. <https://incremental.social/index.php/m/technology@lemmy.world/t/151327/>
4. **Discord group organizer -> Stoat (February 2026).** Group "ready to jump ship," blocked by destination unreadiness: SSL warnings across browsers, obstacle-course UX. Barrier: destination technical readiness. <https://www.reddit.com/r/stoatchat/comments/1r1t331/>
5. **Lemmy community porter (ghost-community discussion).** Ported a subreddit "out of spite"; it never grew. The surrounding thread documents abandoned destination communities sitting unmoderated and polluting the namespace, with handover to new moderators possible only through instance admins - a route several commenters did not know existed. Barriers: engagement failure; destination moderation-succession gap. <https://lemmy.world/post/25853067>
6. **Club Penguin Fanon Wiki admin blog (2011-era, previously recorded).** One admin's reported explanation of a community activity decline after the fork: activity attrition. <https://clubpenguinfanon.wiki/wiki/User_blog:Swiss_Ninja/Our_Biggest_Challenge>
7. **Yahoo Group organizers, 9,900 members, -> groups.io (October-November 2019).** Transfer delayed by a $220 fee (fundraising stood at $92 from 7 contributors at the time of the post); members with bouncing email addresses would not be moved; the destination raised its prices mid-wave and partially rolled back. Barriers: money cost of transfer; member reachability; destination pricing instability. <https://groups.io/g/9x20lathe/topic/transfer_of_9x20_yahoo_group/36852146>
8. **Mastodon instance admin (November 2022 - mid-2023), Ars Technica op-ed.** Ran an own instance through the Twitter migration wave, then shut it down; about 25% of roughly 700,000 instance kill-messages came back undeliverable because the receiving instances had silently dropped offline. Reports people giving up over lack of engagement, lack of people to follow, technical friction, and unpleasant experience; their own interpretation: no unique selling point against the Twitter of 2023. Barriers: destination infrastructure fragility; engagement failure; technical friction. <https://arstechnica.com/information-technology/2023/06/op-ed-why-the-great-twittermigration-didnt-quite-pan-out/>
9. **Google+ roleplay community runner -> MeWe (January 2019).** Community "starting fresh": no content carried, invite-only rebuild ahead of the G+ shutdown. Barriers: content not carried; member re-recruitment. <https://gplusmigration.blogspot.com/search/label/Aohda%20Hakai>
10. **XenForo -> Discourse forum admin (successful migration with costs).** Vendor-run migration went superbly technically; the costs were social: some members drifted away over UX change, moderation trust levels reset to the bottom tier (more flagging and moderation work until the hierarchy rebuilt), and some members re-registered because of expired email addresses. Barriers: reputation/state reset at destination; member drift; identity/email decay. This is adjacent to need-2 in the admin-needs note (contribution identity) but a distinct mechanism - platform trust hierarchy, not edit attribution. <https://meta.discourse.org/t/discourse-for-me-6-weeks-in/31900>

Contrast (winner announcement, advocacy-document caveat as in the admin-needs note): **Zelda Wiki (October 2022)** forked with all content migrated and most editors moving; the driver was governance and affiliation pressure, not tooling. <https://zeldawiki.wiki/wiki/Zelda_Wiki:Fork_Announcement>

Secondary analysis, not a case account: an MDPI study (2025) of about 19,000 self-identified Twitter -> Mastodon migrants measured straddling rather than migration - 99.14% remained active on Twitter after registering on Mastodon - and found destination communities more fragmented, with relational capital lost. The study measures the pattern; what causes it is interpretation. <https://www.mdpi.com/2076-0760/14/7/402>

## What the accounts add to the five needs

The five documented needs in the admin-needs note are all source-side: content legality, attribution history, exit notification, discoverability against the abandoned original, destination funding. These retrospective accounts expose classes that list does not contain:

- **Destination-side governance/removal** - a receiving instance can delete a migrated community after approving it (account 1).
- **Fragmentation / no canonical destination** - the community scatters across targets, and a mirror captures it (account 2; the MDPI study measures the fragmentation pattern at population scale).
- **Momentum window** - miss the wave and later effort does not recover it (account 2).
- **Destination technical readiness** (accounts 4, 8).
- **Money cost of transfer** and **destination pricing instability** (account 7).
- **Member reachability at exit** - dead email addresses and stale contact channels do not move (accounts 7, 10).
- **Reputation/state reset at destination** - trust and moderation hierarchies do not transfer (account 10).
- **Destination moderation-succession gaps** (account 5).

## What this changes, and what it does not (our interpretation)

The five needs look necessary but not sufficient: exits that clear every source-side hurdle can still fail at the destination or in the coordination between them. That broadens the wedge's risk model toward destination and coordination properties; it does not make source portability irrelevant - account 10's costs were social, not technical, and Zelda shows content carry succeeding when governance drives. Because the accounts are selected self-reports, this note does not claim failures concentrate in any class; it claims these classes exist and are missing from the candidate set.

## Collection continues

First-hand accounts are being collected in [issue #5](https://github.com/iamtelosian/open-social-ecosystem/issues/5), including the destination-operator side.
