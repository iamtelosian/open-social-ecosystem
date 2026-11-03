# W1b instrument requirements: measuring willingness without conflating tool and destination

Status: design-requirements note, 2026-11-03. Source: issue #2 round 2 (thelumenfield) and the corrections recorded in research/wedge-card.md ("Destination exposure") and whitepaper/ch08-open-questions.md (8.5). These are requirements any willingness instrument for the W1 gate must meet, stated before any instrument exists. Nothing here is a measurement, a pilot, or a claim that willingness exists.

## Why requirements come first

The wedge card's W1b gate asks whether a community would rehearse or move under a stated offer. Round-2 critique established the conflation risk: a willingness response evaluates the tool AND the destination at once unless the instrument separates them, and the correction pass scoped the reading: a refusal is evidence about the stated offer in its stated context, where destination belief is one factor among several. An instrument that ignores this produces demand signals we cannot interpret - pessimistic misreads (refusal read as tool rejection when it was destination disbelief) and optimistic ones (interest read as destination-trust when it was tool novelty).

## Requirements

**R1 - Stated destination assumption.** Every instrument variant must state, in the offer text itself, what the respondent is asked to assume about the destination: (a) a named real destination with its documented properties, (b) a hypothetical destination with named commitments (continuity, pricing stability), or (c) the bounded-artifact framing - the offer carries artifacts and the destination is the respondent's own problem. The assumption is part of the treatment, not background.

**R2 - One-factor decomposition.** To attribute a response, variants must hold the tool description constant and vary the destination assumption alone (and vice versa). A single-variant instrument cannot attribute refusal or interest to either factor. Minimum design: two variants differing only in the destination assumption.

**R3 - No necessity inference from rejection.** Rejection under every offered variant does not demonstrate that any particular missing machinery (settlement, escrow, clawback) is necessary. Rejection can reflect an unlisted requirement, a badly framed offer, a wrong audience, or a real absence of demand. A necessity claim requires separating those causes, which is instrument-design work beyond a refusal count.

**R4 - Stated willingness is not behavior.** Any W1b instrument available before a working tool exists measures reported intention under hypothetical conditions. Hypothetical bias and self-report limits apply; the instrument's output is a prior, not a demand curve. The corpus (research/exit-failure-retrospectives.md) documents that attempted and completed moves diverge from stated intent in both directions.

**R5 - Social state is out of measurable scope.** The fixed-corpus coding (research/destination-credibility-mechanisms.md) found no mechanism - settlement or otherwise - documented as carrying social state (trust hierarchies, relationships, reachability, discovery). An instrument may ask respondents to weigh named social-state residue explicitly, but must not present the offer as covering it.

## What meeting these requirements settles

An instrument meeting R1-R5 yields an attributable stated-willingness signal: interest or refusal under named destination assumptions, interpretable as evidence about those assumptions. It does not settle payer willingness, behavioral follow-through, or the W1-versus-W2 choice - all of which the wedge card lists as unestablished. Settled by: an instrument design that names its assumption set and decomposition strategy, reviewed against R1-R5 before any fielding.
