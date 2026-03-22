#!/usr/bin/env python3
"""Demo: Meeting-to-Action-Item Workflow.

Purpose:
- Convert transcript notes into structured action items.
- Output machine-friendly JSON for PM tools.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

TRANSCRIPT = [
    "Nora: We need a new outbound list by Friday.",
    "Sam: I will draft the lead scoring rubric by Tuesday.",
    "Nora: Great. Sam owns rubric. I own outreach copy by Wednesday.",
    "Liam: I will set up the CRM import automation by next Monday.",
]

OWNER_PATTERN = re.compile(r"^(?P<speaker>\w+):")
DUE_PATTERN = re.compile(r"by (?P<due>Friday|Monday|Tuesday|Wednesday|Thursday|next Monday)", re.IGNORECASE)
ACTION_PATTERN = re.compile(r"\b(I will|We need|owns?)\b", re.IGNORECASE)


def extract_action(line: str) -> dict | None:
    if not ACTION_PATTERN.search(line):
        return None

    owner_match = OWNER_PATTERN.search(line)
    due_match = DUE_PATTERN.search(line)

    owner = owner_match.group("speaker") if owner_match else "Unassigned"
    due = due_match.group("due") if due_match else "No deadline"

    cleaned = line.split(":", 1)[-1].strip()
    cleaned = re.sub(r"\bby\s+(Friday|Monday|Tuesday|Wednesday|Thursday|next Monday)\b", "", cleaned, flags=re.IGNORECASE).strip(" .")

    return {
        "owner": owner,
        "action": cleaned,
        "due": due,
        "status": "open",
    }


def main() -> None:
    actions = [a for line in TRANSCRIPT if (a := extract_action(line))]

    out_path = Path(__file__).with_name("meeting_actions.json")
    out_path.write_text(json.dumps(actions, indent=2), encoding="utf-8")

    print(f"Extracted {len(actions)} action items -> {out_path}")
    for item in actions:
        print(f" - {item['owner']}: {item['action']} (due: {item['due']})")


if __name__ == "__main__":
    main()
