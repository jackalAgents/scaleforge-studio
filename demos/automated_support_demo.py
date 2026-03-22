#!/usr/bin/env python3
"""Demo: Automated Customer Support Agent (rule-based baseline).

Purpose:
- Show ticket triage + draft generation.
- Demonstrate escalation logic for sensitive issues.
"""

from __future__ import annotations

TICKETS = [
    {"id": "T-1001", "text": "I was charged twice and need a refund today."},
    {"id": "T-1002", "text": "How do I connect Slack integration?"},
    {"id": "T-1003", "text": "App is down for our team, getting 500 errors."},
]

FAQ = {
    "integration": "You can connect Slack in Settings > Integrations > Slack. Then click 'Authorize Workspace'.",
    "refund": "I’m sorry about the billing issue — I can help process this quickly after verifying your invoice email.",
    "outage": "Thanks for reporting this. We’re escalating to engineering immediately and will update you within 30 minutes.",
}


def classify_intent(text: str) -> str:
    t = text.lower()
    if "refund" in t or "charged" in t or "billing" in t:
        return "refund"
    if "down" in t or "500" in t or "error" in t:
        return "outage"
    if "connect" in t or "integration" in t or "setup" in t:
        return "integration"
    return "general"


def classify_priority(intent: str) -> str:
    return {"outage": "P1", "refund": "P2", "integration": "P3", "general": "P3"}[intent]


def draft_reply(intent: str) -> str:
    if intent in FAQ:
        return FAQ[intent]
    return "Thanks for reaching out. We received your request and will get back to you shortly."


def escalation_path(priority: str) -> str:
    if priority == "P1":
        return "Escalate to On-Call Engineer + Support Lead"
    if priority == "P2":
        return "Route to Billing Specialist"
    return "Handle in standard support queue"


def main() -> None:
    for ticket in TICKETS:
        intent = classify_intent(ticket["text"])
        priority = classify_priority(intent)
        response = draft_reply(intent)
        route = escalation_path(priority)

        print(f"\nTicket {ticket['id']}")
        print(f" Intent: {intent}")
        print(f" Priority: {priority}")
        print(f" Draft: {response}")
        print(f" Route: {route}")


if __name__ == "__main__":
    main()
