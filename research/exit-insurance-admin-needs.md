# What exiting community admins say they need: evidence from three wiki forks (2019-2023)

Status: evidence note, beneficiary-discovery workstream. Sources are self-published admin announcements (dated 2020-2023) plus the incumbent platform's forking policy as retrieved 2026-11-01, which may since have changed. Three content-centric wiki communities, self-selected for detailed public announcements; surviving independent wikis are a selected sample of attempted exits. Wikis are not social networks: their content is CC-licensed and their social graph is thin, so transfer of these needs to a consent-based social network is argued per need, not assumed. Admin statements are quoted as their claims; design relevance is our interpretation and is labeled as such.

## The exits

- **JoJo Wiki** (jojo.fandom.com -> jojowiki.com, announced January 2020): admin-authored FAQ.
- **Hollow Knight Wiki** (hollowknight.fandom.com -> hollowknight.wiki, moved October 31, 2023): team-authored announcement.
- **Tardis Wiki** (Doctor Who, tardis.fandom.com -> tardis.wiki, 2023): announcement plus public benefactor list.
- **Fandom Forking Policy** (community.fandom.com, retrieved 2026-11-01): the incumbent's stated rules for departing communities.

## Why they left (triggers, stated)

All three cite the same family: forced features with no opt-out (AI "Quick Answers," replacement of forums by "Discussions"), staff editing of community pages, JavaScript review, no extension or skin control, intrusive advertising, and platform drift from reference tool to social media. Tardis: "increasingly authoritarian tendencies when it comes to forcing undesired features and design changes on communities."

## Five documented needs

These five needs are a candidate set, not a priority ranking (thelumenfield, issue #2). All three communities are surviving exits whose admins absorbed every documented burden; that is evidence of willingness to bear cost, and equally evidence that none of these burdens was fatal to them. The communities whose exit died on one of these needs did not publish forking announcements, so winner announcements structurally cannot rank the needs by fatality, and no downstream design inherits an order from this list.

1. **License-grounded content legality.** All three migrated full content, and Fandom's policy grounds the right to fork in the CC-BY-SA license. In these cases the license made the content legally portable; the announcements do not establish that license permission alone delivers technical portability, and they say nothing about revocable private social data, which differs from licensed public content.
2. **Attribution-history repair.** JoJo reassigned editors' edit histories to new accounts by hand ("message Vish"); Hollow Knight published an account-migration guide copying edit history and watchlist. Documented: contribution identity did not transfer automatically and admins repaired it manually. Whether this amounts to a need for reputation portability is our interpretation, not the admins' claim.
3. **Restricted exit notification.** Fandom's policy (as retrieved 2026-11-01) forbids advertising the fork on the old wiki beyond one templated discussion link; sitenotices and wall posts directing users to the fork are prohibited, and departing admins lose their rights. JoJo kept the migration secret during setup ("Fandom knowing too early could have been problematic"). Documented: in these cases the incumbent controlled and restricted the channel by which members would learn where the community went. That constraint is incumbent policy (a rule), not a mechanism, and these communities routed around a policy they could see. Whether a conforming operator in our design may restrict or deprioritize exit signaling without breaking conformance is an open question (issue #2); no clause names exit signaling today - a missing guarantee, not an established ability to detect interference - and both prevention and tested detection are unestablished.
4. **Discoverability against the abandoned original.** The old wiki persists under platform control ("Fandom will not remove the old wiki") with its search ranking. Each announcement carries an explicit reader ask to change behavior - update bookmarks, stop clicking old links, install the Indie Wiki Buddy redirect extension - and JoJo devotes an FAQ entry to "SEO and traffic." Hollow Knight: "We aim to overtake the Fandom wiki in search results, but we can only do it with your help."
5. **Funding for the destination.** Tardis states it runs donation-funded and ad-free, cross-funded by an admin from another independent wiki ("Kate from the Independent Fallout Wiki"), with the ad-free state explicitly conditional on continued donations ("subject to donations"). Documented: exit required someone to pay for the new host before any community benefit was visible. Hollow Knight's destination stays ad-funded: their announcement says the new host has ads that are "much more limited and significantly smaller, with as little as one to two ads per page" - the exit renegotiated ad intrusiveness rather than leaving the ad-funded model. JoJo's announcement does not state how its new server is funded.

## Our interpretation (not the admins' claims)

- Need 1 is consistent with the position that exit portability cannot rest on protocol alone; in these cases the legal layer carried the content question. Whether revocable private social data can be given analogous treatment is an open design question the wiki cases do not answer - and no layer can promise erasure of content already obtained by others.
- Needs 2 and 3 are consistent with what our design calls portable contribution identity and an exit-independent contact edge, respectively. The wiki cases document the manual workarounds, not the general mechanism.
- Need 4 is outside the current design's scope: search ranking after exit is an ecosystem property, and we have no protocol answer for it. We flag it as an open beneficiary need rather than a solved one.
- Need 5 maps to the open funding-gap question: the destination's costs arrive before its benefits.

## Limits

Three communities, self-selected for detail, stated needs rather than measured ones; announcements are advocacy documents written to rally readers, not neutral records. Wiki exits port licensed content; social-network exits must port relationships and attention, which are harder. The dated policy snapshot and the communities' circumstances may no longer be current. A located falsifier route for the survivorship limit: WikiIndex's "Forked Wikia wikis" page maintains a "Failed forks" section (18 entries as of 2026-11-02), but it is a community index - per-case failure causes are not documented there, its failure criteria are undefined, and at least one listed entry (Wikisimpsons) is an active wiki as of 2026-11-02, so its labels require per-case verification before use. Which needs were fatal to exits that failed remains undocumented in the sources searched.

## Sources

- https://jojowiki.com/JoJo_Wiki:Leaving_Fandom
- https://hollowknight.wiki/w/Hollow_Knight_Wiki:Moving_from_Fandom
- https://tardis.wiki/wiki/Tardis:Forking_announcement
- https://community.fandom.com/wiki/Forking_Policy (retrieved 2026-11-01)
