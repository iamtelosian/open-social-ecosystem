#!/usr/bin/env python3
"""Executable companion to coordination-closure-worked-case.md (2026-10-30).

Encodes the published scoring rule over the synthetic worked ledger and checks:
  1. honest scoring reproduces the published numbers (3/6 closed, 1 withdrawn,
     1 incomplete-spec, 1 reopened, 2 open misses);
  2. the drop-the-hard-case attack moves the score to 3/5 and is caught as
     input drift against the frozen evidence packet hash;
  3. the reopening grace boundary: a break inside the 7-day grace reopens,
     a break outside it does not;
  4. withdrawal after member work is logged does NOT qualify as WITHDRAWN.

All data is synthetic (proposal-level). This checks that the RULE behaves as
published; it says nothing about real groups. Exit code 0 = all checks pass.

Fixture mode: `--fixture FILE` scores a submitted case instead of the built-in
checks. A fixture is JSON: {"goals": [goal objects with the fields of Goal],
"expect": {"score": "x/y", ...}} (any subset of the score() keys). See
closure-fixtures/drop-hard-case.json for the shape. Fixtures let a red-team
counterexample be submitted as data: the fixture fails its own expectation when
the rule behaves differently than the submitter claimed.
"""

import hashlib
import json
import sys
from dataclasses import dataclass, field
from typing import Optional

GRACE_DAYS = 7  # stated grace in the published rule, measured against event timestamps


@dataclass
class Goal:
    gid: int
    name: str
    artifact_type: Optional[str]   # None => INCOMPLETE-SPEC
    window_days: int
    stated_day: int = 0
    withdrawn_day: Optional[int] = None
    work_logged_before_withdrawal: bool = False
    artifact_day: Optional[int] = None
    ack_day: Optional[int] = None
    broken_day: Optional[int] = None  # day artifact was shown not to satisfy the goal


# The published synthetic ledger, one invented month (day 0..30).
LEDGER = [
    Goal(1, "Decide meeting date", "poll", 7, artifact_day=4, ack_day=4),
    Goal(2, "Draft shared doc", "doc", 14, artifact_day=9, ack_day=9),
    Goal(3, "Plan trip itinerary", "doc", 30),
    Goal(4, "Pick gift", "poll", 5, withdrawn_day=1, work_logged_before_withdrawal=False),
    Goal(5, "Sort out the budget", None, 0),
    Goal(6, "Publish event page", "page link", 10, artifact_day=8, ack_day=8, broken_day=11),
    Goal(7, "Reconcile two subgroups", "signed agreement", 30),
    Goal(8, "Fix recurring scheduling conflict", "calendar artifact", 14, artifact_day=12, ack_day=12),
]


def freeze_packet(goals):
    """Hash the eligibility inputs before scoring (hivefound's packet freeze).

    Binds the case list and the eligibility rule inputs as bytes. The hash is an
    attestation under the limits stated in the worked case: it does not prove
    commit-before-outcomes ordering, eligibility completeness, or that all goals
    were stated in-channel.
    """
    payload = {
        "rule": "eligible = stated artifact_type AND stated window; "
                "excluded only by withdrawal before any logged member work; "
                "reopen grace_days = %d; scoring at end of declared window" % GRACE_DAYS,
        "cases": [
            {"gid": g.gid, "artifact_type": g.artifact_type, "window_days": g.window_days,
             "stated_day": g.stated_day}
            for g in goals
        ],
    }
    blob = json.dumps(payload, sort_keys=True).encode()
    return hashlib.sha256(blob).hexdigest()


def score(goals, eval_day=30):
    """Score at the end of the declared observation window (no first-closure score)."""
    eligible, closed, withdrawn, incomplete, reopened, open_miss = [], [], [], [], [], []
    for g in goals:
        if g.artifact_type is None or not g.window_days:
            incomplete.append(g.gid)
            continue
        if g.withdrawn_day is not None and not g.work_logged_before_withdrawal:
            withdrawn.append(g.gid)
            continue
        eligible.append(g.gid)
        if g.artifact_day is not None and g.ack_day is not None and g.ack_day <= eval_day:
            if g.broken_day is not None and g.broken_day <= eval_day \
                    and g.broken_day <= g.ack_day + GRACE_DAYS:
                reopened.append(g.gid)  # decrement CLOSED, counted and shown
            else:
                closed.append(g.gid)
        else:
            open_miss.append(g.gid)
    return {
        "eligible": len(eligible), "closed": len(closed),
        "withdrawn": len(withdrawn), "incomplete_spec": len(incomplete),
        "reopened": len(reopened), "open_miss": len(open_miss),
        "score": "%d/%d" % (len(closed), len(eligible)),
    }


def run_fixture(path):
    """Score a submitted fixture and compare against its declared expectation."""
    fx = json.load(open(path))
    goals = [Goal(**g) for g in fx["goals"]]
    got = score(goals, eval_day=fx.get("eval_day", 30))
    want = fx.get("expect", {})
    failures = []
    for k, w in want.items():
        g = got.get(k)
        ok = g == w
        print("%s fixture %-24s got=%s want=%s" % ("PASS" if ok else "FAIL", k, g, w))
        if not ok:
            failures.append(k)
    print()
    if failures:
        print("FIXTURE FAILED: %s (rule behaved differently than the submission claimed)" % ", ".join(failures))
        return 1
    print("Fixture matches: the rule behaves as the submission declared.")
    return 0


def main():
    if len(sys.argv) > 2 and sys.argv[1] == "--fixture":
        return run_fixture(sys.argv[2])
    failures = []

    def check(label, got, want):
        ok = got == want
        print("%s %-58s got=%s want=%s" % ("PASS" if ok else "FAIL", label, got, want))
        if not ok:
            failures.append(label)

    # 1. Honest scoring reproduces the published worked case.
    packet = freeze_packet(LEDGER)
    r = score(LEDGER)
    check("base score", r["score"], "3/6")
    check("base eligible", r["eligible"], 6)
    check("base closed", r["closed"], 3)
    check("base withdrawn", r["withdrawn"], 1)
    check("base incomplete_spec", r["incomplete_spec"], 1)
    check("base reopened", r["reopened"], 1)
    check("base open_miss", r["open_miss"], 2)

    # 2. Drop-the-hard-case attack: remove row 7 post hoc. Arithmetic rises to
    #    3/5 and says nothing; the packet hash catches the input drift.
    shaved = [g for g in LEDGER if g.gid != 7]
    r2 = score(shaved)
    check("attack score rises", r2["score"], "3/5")
    check("attack caught as packet drift", freeze_packet(shaved) != packet, True)

    # 3. Reopening grace boundary. Row 6 closes day 8; grace ends day 15.
    inside = [Goal(**{**vars(g), "broken_day": 15}) if g.gid == 6 else g for g in LEDGER]
    outside = [Goal(**{**vars(g), "broken_day": 16}) if g.gid == 6 else g for g in LEDGER]
    check("break day 15 (within grace) reopens", score(inside)["score"], "3/6")
    check("break day 16 (past grace) stays closed", score(outside)["score"], "4/6")

    # 4. Withdrawal after logged member work does not qualify: row 4 stays in.
    g4 = Goal(**{**vars(LEDGER[3]), "work_logged_before_withdrawal": True})
    late = [g4 if g.gid == 4 else g for g in LEDGER]
    r4 = score(late)
    check("withdrawal-after-work keeps row 4 eligible", r4["eligible"], 7)
    check("withdrawal-after-work score", r4["score"], "3/7")

    print()
    if failures:
        print("FAILED: %d check(s): %s" % (len(failures), ", ".join(failures)))
        return 1
    print("All checks passed. Frozen packet hash: %s" % packet)
    return 0


if __name__ == "__main__":
    sys.exit(main())
