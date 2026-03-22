#!/usr/bin/env python3
"""Demo: AI Lead Scraper / Enricher (mocked data).

Purpose:
- Show a clear lead-ops workflow without external APIs.
- Turn raw prospect rows into scored, outreach-ready leads.
"""

from __future__ import annotations

import csv
from pathlib import Path

RAW_LEADS = [
    {"company": "AcmeCloud", "industry": "SaaS", "size": 35, "title": "Head of Growth", "region": "US"},
    {"company": "BrightDental", "industry": "Healthcare", "size": 12, "title": "Founder", "region": "UK"},
    {"company": "FlowOps", "industry": "SaaS", "size": 80, "title": "COO", "region": "US"},
    {"company": "VoltLedger", "industry": "Fintech", "size": 22, "title": "Operations Manager", "region": "EU"},
]

ICP_INDUSTRIES = {"SaaS", "Fintech", "B2B Services"}
ICP_TITLES = {"Founder", "COO", "Head of Growth", "Operations Manager"}


def score_lead(lead: dict) -> int:
    score = 0
    if lead["industry"] in ICP_INDUSTRIES:
        score += 40
    if lead["title"] in ICP_TITLES:
        score += 30
    if 10 <= lead["size"] <= 120:
        score += 20
    if lead["region"] in {"US", "UK", "EU"}:
        score += 10
    return score


def enrich_lead(lead: dict) -> dict:
    score = score_lead(lead)
    tier = "Hot" if score >= 80 else "Warm" if score >= 60 else "Cold"
    lead = dict(lead)
    lead["score"] = score
    lead["tier"] = tier
    lead["next_step"] = {
        "Hot": "Send personalized Loom + case study",
        "Warm": "Send audit offer + 2 follow-ups",
        "Cold": "Nurture with monthly insight email",
    }[tier]
    return lead


def main() -> None:
    enriched = [enrich_lead(row) for row in RAW_LEADS]
    out_path = Path(__file__).with_name("lead_output.csv")

    with out_path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=enriched[0].keys())
        writer.writeheader()
        writer.writerows(enriched)

    print(f"Wrote {len(enriched)} enriched leads to: {out_path}")
    print("Top leads:")
    for row in sorted(enriched, key=lambda r: r["score"], reverse=True)[:2]:
        print(f" - {row['company']} ({row['score']}, {row['tier']})")


if __name__ == "__main__":
    main()
