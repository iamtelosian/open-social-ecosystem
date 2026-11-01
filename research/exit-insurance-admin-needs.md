# What exiting community admins say they need: evidence from three wiki forks (2019-2023)

Status: evidence note, beneficiary-discovery workstream. Sources are self-published admin announcements plus the incumbent platform's forking policy. Stated needs from three content-centric wiki communities, not a survey and not validated demand. Wikis are not social networks: their content is CC-licensed and their social graph is thin, so transfer of these needs to a consent-based social network is argued per need, not assumed.

## The exits

- **JoJo Wiki** (jojo.fandom.com -> jojowiki.com, announced January 2020): admin-authored FAQ.
- **Hollow Knight Wiki** (hollowknight.fandom.com -> hollowknight.wiki, moved October 31, 2023): team-authored announcement.
- **Tardis Wiki** (Doctor Who, tardis.fandom.com -> tardis.wiki, 2023): announcement plus public benefactor list.
- **Fandom Forking Policy** (community.fandom.com): the incumbent's stated rules for departing communities.

## Why they left (triggers, stated)

All three cite the same family: forced features with no opt-out (AI "Quick Answers," replacement of forums by "Discussions"), staff editing of community pages, JavaScript review, no extension or skin control, intrusive advertising, and platform drift from reference tool to social media. Tardis: "increasingly authoritarian tendencies when it comes to forcing undesired features and design changes on communities."

## Five stated exit needs

1. **License-grounded content portability.** All three migrated full content. This was possible because contributions are CC-BY-SA; Fandom's own Forking Policy grounds the right to fork in the license. The load-bearing portability layer was legal, not technical.
2. **Contribution-identity continuity.** JoJo reassigned editors' edit histories to new accounts by hand ("message Vish"). Hollow Knight published an account-migration guide copying edit history and watchlist. No portable mechanism existed; admins rebuilt identity manually.
3. **A member-notification channel the incumbent does not control.** Fandom's policy forbids advertising the fork on the old wiki beyond one templated discussion link; sitenotices and wall posts directing users to the fork are prohibited, and departing admins lose their rights. JoJo kept the migration secret during setup ("Fandom knowing too early could have been problematic"). The channel by which members learn where everyone went is exactly what the incumbent restricts at exit time.
4. **Discoverability against the abandoned original.** The old wiki persists under platform control ("Fandom will not remove the old wiki") with its SEO dominance. Every announcement spends its largest section on search ranking: update bookmarks, stop clicking old links, install the Indie Wiki Buddy redirect extension. Hollow Knight: "We aim to overtake the Fandom wiki in search results, but we can only do it with your help." This is the hardest stated post-exit problem, and it is an ecosystem property, not a data property.
5. **Funding for the destination.** Tardis runs donation-funded and ad-free, cross-funded by an admin from another independent wiki ("Kate from the Independent Fallout Wiki"). Exit requires someone to pay for the new host before any community benefit is visible.

## Mapping to the design (proposed architecture, not evidence of enforceability)

- Need 1 corroborates exit portability but relocates its weight: the protocol's portable export must be matched by usage terms that permit reuse, and neither layer can promise erasure of content already obtained by others - CC-licensed wiki content is irrevocable by design, and social data once read is similarly unclawable. This is the per-edge honesty structure of issue #3 applied to exit.
- Need 2 corroborates the portable-reputation requirement directly: real admins rebuilt contribution identity by hand because nothing carried it.
- Need 3 corroborates the shared-private contact-edge rationale: an exit-viable member graph is one whose reachability does not depend on the incumbent's permission.
- Need 4 is outside the current design's scope and is flagged as an open beneficiary need with no protocol answer: search ranking and audience redirection after exit.
- Need 5 maps to the open funding-gap work: the destination's costs arrive before its benefits.

## Limits

Three communities, self-selected for detailed public announcements, stated needs rather than measured ones. Wiki exits port content; social-network exits must port relationships and attention, which are harder. Needs 2 and 3 (identity, notification) likely transfer more directly than need 1.

## Sources

- https://jojowiki.com/JoJo_Wiki:Leaving_Fandom
- https://hollowknight.wiki/w/Hollow_Knight_Wiki:Moving_from_Fandom
- https://tardis.wiki/wiki/Tardis:Forking_announcement
- https://community.fandom.com/wiki/Forking_Policy
