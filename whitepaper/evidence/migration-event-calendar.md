# Independent event calendar (evidence instrument for the C17 weekly migration series)

Public evidence instrument supporting whitepaper/evidence/adoption-ledger.json cell C17e. v1.3, 2026-10-26.

Purpose: classify recorded weekly PLC migration events (atproto.barn.city series, 78 weeks 2025-04-28 to 2026-10-19) against dated events identified INDEPENDENTLY of the series itself. Scope-limited instrument: calendar-negative = "no identified event under this scope", never evidence of no shock/cause.

## Scope (v1)
(a) incumbent (X/Twitter) outages/incidents; (b) Bluesky service incidents (official status page); (c) Bluesky policy/moderation controversies with dated coverage; (d) destination-side campaigns / tool launches (eurosky, blacksky).

## Dated entries (all verified from source during construction, 2026-10-26)
| date | event | class | source |
|---|---|---|---|
| 2025-09-22 | Bluesky announces more aggressive moderation/enforcement | c | techcrunch.com/2025/09/22/bluesky-says-its-getting-more-aggressive-about-moderation-and-enforcement/ |
| 2025-10-05..07 | Suspension/banning controversy (waffle/Link suspensions); flux.community: "Banning controversy reveals Bluesky's federation isn't there yet" | c | plus.flux.community/p/banning-controversy-reveals-blueskys (2025-10-07); deer.social TechCrunch quote post (2025-10-05) |
| 2025-10-20 | Blacksky PDS migration service account active (@move.blacksky.community) | d | bsky.app/profile/move.blacksky.community (first post date 2025-10-20) |
| 2025-11-13 | gregpak.net how-to: moved to Blacksky citing moderation decisions culminating in "Link" ban | c/d | gregpak.net/2025/11/13/... |
| 2026-02-04 | sherif.eurosky.social campaign post | d | bsky.app/profile/sherif.eurosky.social/post/3mdzsnowknd2f |
| 2026-02-16 | X outage US/UK (Reuters) | a | reuters.com/technology/x-down-thousands-users-us-downdetector-shows-2026-02-16/ |
| 2026-02-27 | eurosky.social official post: ~600 invite codes + NEW TOOL EU-HAUL move.eurosky.tech, 26 languages (verified via public.api.bsky.app, 2026-02-27T13:36Z) | d | bsky.app/profile/eurosky.social/post/3mfttdbem322n |
| 2026-03-08 | nicolashenin.net post (eurosky migration wave coverage) | d | bsky.app/profile/nicolashenin.net/post/3mgkootveq227 |
| 2026-03-15 | Neil Turner blog how-to "Migrating from Bluesky to Eurosky" | d | neilturner.me.uk/2026/03/15/migrating-from-bluesky-to-eurosky/ |
| 2026-03-18 | X worldwide outage, "users rush to BlueSky" (Mirror) | a | themirror.com/tech/tech-news/breaking-x-down-worldwide-millions-1746117 |
| 2026-03-31..04-01 | X outages US/India/UK | a | wxerfm.com/2026/03/31/...; indianexpress.com/article/india/x-goes-dark-...-10612682/ |
| 2026-10-22..23 | bsky.app MAJOR outage 21:34-00:10 (official status) | b | status.bsky.app/history/1 |
| 2026-10-15 | bsky.app degraded performance 12:55-16:42 (official status) | b | status.bsky.app/history/1 |

## Classification of top-12 series weeks (event-identified = dated event same week or up to 7 days prior; contamination rows kept separate)
| week | events | top destinations | classification |
|---|---|---|---|
| 2026-03-02 | 4,069 | eurosky 3,957 | IDENTIFIED (d): EU-HAUL tool launch + invite drop 2026-02-27 (3 days prior) |
| 2026-03-09 | 2,038 | eurosky 1,527, blacksky 404 | IDENTIFIED (d): campaign continuing (nicolashenin post 03-08) |
| 2026-02-23 | 1,306 | eurosky 1,114 | IDENTIFIED (d): sherif campaign post 02-04; X outage 02-16 in prior week (a, cross-week) |
| 2026-08-31 | 934 | fbinfra.net test PDS 585 | CONTAMINATION (single-operator test/infra flow) + none identified |
| 2026-08-17 | 907 | roomy.chat 286 | INFRA-CLASS: roomy.chat self-describes as an ATProto PDS (roomy.chat homepage, accessed 2026-10-26); new-PDS spin-up flow, driver unverified - not a demand reading |
| 2026-03-16 | 812 | eurosky 584 | IDENTIFIED (d+a): Turner how-to 03-15; X worldwide outage 03-18 inside week |
| 2026-05-18 | 765 | eurosky 466 | none identified under v1 scope |
| 2026-05-04 | 759 | eurosky 584 | none identified under v1 scope |
| 2026-04-13 | 719 | eurosky 585 | none identified under v1 scope (X outages 03-31..04-01 two weeks prior, cross-week) |
| 2026-10-19 | 646 | eurosky 267, wsocial.dev staging 220 | PARTIAL WEEK + CONTAMINATION (staging PDS); bsky major outage 10-22 inside week (b) |
| 2026-06-15 | 593 | eurosky 444 | none identified under v1 scope |
| 2025-09-08 | 582 | blacksky 495 | none identified under v1 scope (predates located Blacksky service/controversy dates) |

## Findings (descriptive level)
1. The single largest wave (2026-03-02, 4,069 events = 14.6% of the 78-week series) and the three-week Mar 2026 cluster (6,919 events = 24.8%) temporally overlap eurosky's own dated announcements (02-27 EU-HAUL launch + invite drop), which precede them. Observed overlap only - association, not established cause; calendar coverage is incomplete.
2. 5 of 12 top weeks have an identified dated event under v1 scope; 2 are contamination/partial; 5 have none identified - which states only that v1's scope found nothing, not that those weeks are "quiet" or non-shock.
3. Incumbent outages (class a) appear adjacent to high weeks but never cleanly lead them at weekly resolution; intra-week decomposition not possible with this series.
4. Calendar gaps: pre-2026-08 bsky status history not yet pulled (pagination); eurosky campaign cadence for Apr-Jun 2026 waves unlocated; 2025-09 blacksky wave unexplained.

## v1.1 additions (2026-10-26, from eurosky.social author feed via public.api.bsky.app)
| date | event | class |
|---|---|---|
| 2026-04-16 | eurosky Portal launch + INVITE REMOVAL ("anyone can create an account straight away") | d |
| 2026-04-16 | eurosky operator post: "Bluesky was down... Eurosky was up" (operator-claimed bsky outage, NOT verified against status history - pagination gap) | b? |
| 2026-05-09..10 | #Europeday campaign (Europe Day) across eurosky feeds | d |
| 2026-05-17 | "15,000 of us" milestone post | d |
| 2026-05-18 | eurosky server upgrade announcement + re:publica #rp26 talk with heute-journal coverage | d |
| 2026-06-17 | "How fast can we get to 20,000?" membership drive | d |

Reclassification of previously unidentified top-12 weeks:
- 2026-04-13 (719): Portal launch + invite removal 04-16 inside week -> event-identified (d)
- 2026-05-04 (759): #Europeday campaign 05-09/10 inside week -> event-identified (d)
- 2026-05-18 (765): 15k milestone 05-17 (1d prior), server upgrade + re:publica 05-18 -> event-identified (d)
- 2026-06-15 (593): 20k drive 06-17 inside week -> event-identified (d)
Top-12 tally v1.2: 8 event-identified (all destination-side d-class except 03-16 mixed d+a), 3 contamination/partial/infra (08-31, 10-19, 08-17 roomy.chat PDS spin-up), 1 none identified (2025-09-08 blacksky).
C17e corrected same day per steering: wording limited to dates/counts/observed overlap; "caused"/"not incident-timed"/"demand-activation mechanism" removed; incomplete coverage made explicit.

## Anecdotal color for the unexplained 2025-09-08 blacksky week (NOT an explanation)
evecodes.com "Starting Over on Blacksky" (2025-09-18): an N=1 stated account of migrating for moderation reasons (mass-blocklist sabotage/shadowbanning complaints) plus destination-community pull ("Blacksky is now its own community, so I don't have to use Bluesky"). Individual testimony near the wave window; cannot attribute the wave. Records that moderation-driven exit (a governance failure, not a technical one) and community pull both occur as stated motives in this population.

## Blacksky destination timeline within the series (v1.3, from the series itself - descriptive)
blacksky.app first appears as destination 2025-06-09 (2 events); ramp 2025-08-04 (156) and 08-11 (277); spikes: 09-08 (495 - UNEXPLAINED under v1.3 scope), 09-29 (408), 10-06 (376 - overlaps dated suspension/banning controversy 10-05..07, class c, event-identified; gregpak.net's verified PLC migration to blacksky.app 2025-10-08 sits in this week with stated moderation motive). The 09-08 spike is NOT a PDS-launch wave (the PDS was live ~3 months prior) and the Blacksky migration-service account's first post is 2025-10-20 (after all three spikes). The 10-06 week (544 events) sits just below the top-12 cutoff. The 09-08 spike remains the only unexplained top-12 week.
