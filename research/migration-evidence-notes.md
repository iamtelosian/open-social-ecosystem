# Migration and adoption evidence notes

One row per count: denominator, definition, date, provenance. Author research passes of 2026-10-26 and 2026-10-27. This file exists so every figure quoted in chapters 1, 6 and 8.9 is checkable from the public citation, and so the provenance rules the chapters rely on (source-reported vs recomputed labeled; snapshot vs trend; one dataset never cited as independent confirmation of itself) are visible rather than asserted.

## 1. ATProto account-migration enumeration

- Source: the ATProto Health dashboard over the public plc.directory enumeration, https://atproto.barn.city/migrations (client-rendered; figures as displayed, pulled 2026-10-25/26). The underlying registry is plc.directory itself, which is public and self-described as approximate.
- 46,729,256 enumerated repositories through 2026-10-25. One repository per account; accounts are not necessarily distinct people.
- 26,103 unique account identities have ever migrated; 28,376 migration events by the dashboard's stated total. Scope: independent-PDS transfers only, excluding internal resharding such as moves between Bluesky-operated shards, through 2026-10-25.
- 26,103 of 46.7M = 0.056% of enumerated repositories ever migrated - author computation from the two displayed figures, same dataset and date (matched denominator; never mixed with self-reported registered-user counts from other sources or dates).
- 98% of enumerated repositories currently sit on Bluesky-operated infrastructure (same dashboard, same date). Concentration and the migration count derive from one dataset - two presentations, not independent confirmation.

## 2. Weekly migration series (author decomposition)

- Source: the weekly event series embedded in the same dashboard's page data - 78 weeks, 2025-04-28 through 2026-10-19, author pull 2026-10-26.
- The series sums to 27,880 events against the dashboard's stated 28,376 total. Partially reconciled 2026-10-27 via the dashboard's public source code (github.com/bartleyn/atproto-health @ 7df788c0040b, src/lib/db/plc-queries.ts; deployed behavior consistent - the observed series is 78 weeks, matching the code's 18-month window): the stated total sums the all-time monthly table, while the weekly series is restricted to a trailing 18-month window. The two totals are therefore not directly comparable, and the 496-event difference splits between pre-window events and endpoint-filter differences in proportions not separately reconciled - a matched-filter calculation has not been run.
- Median 263.5 events per week; never zero; maximum 4,069 in the week of 2026-03-02.
- Campaign shape: 8 of the 12 highest-volume weeks temporally overlap dated destination-side recruitment activity (tool launches, invite drops, milestone drives). Observed overlap only: the incumbent-side incident calendar is incomplete, a calendar-negative week means no event was identified under the stated search scope (never proof of no shock), and overlap is not cause attribution.
- Destinations: community PDSes dominate - eurosky 15,652, blacksky 4,189, northsky 1,617, roughly 77% of series events. Destination names are not motives. Infra and spam anomalies (a development PDS with 585 events in one week; a spam-like 286) pollute naive counts.
- The largest destination's onboarding is episodic (median 0.5 events/week, zero in 39 of 78 weeks; 3,957 in a single March 2026 week). Excluding its three wave weeks, the remaining baseline median is 230 events/week and continuous: a small continuous baseline exists outside identifiable waves, and its composition - steady community-driven moves versus background noise - is unidentified.

## 3. Strong-identity-control census (rotation keys)

- Source: Rob Ricci, "Rotation Key Census, July 2026", https://rob.leaflet.pub/3mr7vhdonuk2i (data as of 2026-07-21; an earlier December 2025 wave exists in the same series, and a January 2027 wave is expected).
- 15,029 of 5,062,000 recently-active accounts hold strong identity control (their own rotation keys, their own PDS, or did:web): 0.299% as the census reports it; 0.297% recomputed from its own rounded 15,029-of-5.062-million figures. The source-reported and recomputed values are labeled, not silently corrected.
- Denominator definition: accounts behaviorally active in the trailing 30 days - not the same quantity as a repo-flag "active" share; the two definitions are never combined.
- The census author attributes the roughly 10x growth in strong-control accounts to migration tooling that creates rotation keys during migration (96.4% of multi-user-PDS key holders have at least one migration): tool-and-migration-coupled growth, not isolated identity-control demand.

## 4. Survey cohort analysis (Warwick Mastodon migration survey)

- Dataset: Camara-Menoyo and Tkacz's Mastodon migration survey, public anonymized CSV under CC BY-SA 4.0 at https://github.com/WarwickCIM/rdf_mastodon_data (N=820; 819 consent-filtered; fielded 2023-01-13 to 2023-04-13; instrument: "How decisive were these factors when you decided to join Mastodon?", 4-point Likert plus I-do-not-know). Author analysis 2026-10-26/27.
- Cohorts by reported join date relative to the 2022-10-27 Twitter acquisition: pre-shock n=186 (exact date or tenure bucket), post-shock n=78, straddle n=253 (excluded), unknown n=302.
- The timing contradiction quoted in 8.9: within the pre-shock cohort, 77.6% of valid answers to the later-event (Musk) item rate it at least somewhat decisive and 59.0% rate it very decisive (item denominator n=156) - retrospective ratings that contradict the respondents' own reported join dates. An inconsistency demonstrated; its cause not identified (recall noise, rationalization, and cohort misclassification all remain live). Every cohort reading from this instrument is correspondingly softened.
- Structural motives top the pre-shock ranking at the very-decisive threshold: not owned by a big company 74.6% (n=181), lack of ads 59.1% (n=181), federated 56.5% (n=177, against 41.7% post-shock). Stated preference only; the instrument cannot isolate non-shock motivation, and 8.9's gate (revealed non-shock exit choice) stays open on that basis.

## 5. Fediverse scale snapshot

- Source: FediDB, https://fedidb.com/software/mastodon (third-party aggregator of self-reported server data; snapshot pulled 2026-10-26): 8,650 servers, 8.77M accounts, 671K monthly active (~7.6% of accounts). A snapshot, not a trend; an aggregator, not an official figure; Mastodon is not the whole fediverse.
- Contrast discipline: registered or enumerated counts exceed behaviorally-active counts by roughly an order of magnitude in every system measured here, but the per-system ratios (definitions and dates differ) are not a shared multiplier and are never averaged.
