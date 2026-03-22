# ScaleForge AI Ops Demos

These demos are lightweight, runnable examples used during prospect calls.

## 1) AI Lead Scraper / Enricher
- **File:** `ai_lead_scraper_demo.py`
- Reads sample company records
- Scores fit against a simple ICP
- Exports `lead_output.csv` for outreach

## 2) Automated Support Agent
- **File:** `automated_support_demo.py`
- Classifies support tickets by intent + urgency
- Generates first-response drafts
- Flags escalation paths for critical issues

## 3) Meeting-to-Action-Item Workflow
- **File:** `meeting_to_action_items_demo.py`
- Parses transcript lines
- Extracts actions, owners, due dates
- Exports action list JSON for task systems

## Quick Run
```bash
cd /home/jackal/.openclaw/scaleforge-project/demos
python3 ai_lead_scraper_demo.py
python3 automated_support_demo.py
python3 meeting_to_action_items_demo.py
```
