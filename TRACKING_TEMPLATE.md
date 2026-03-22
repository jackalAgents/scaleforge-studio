# Outreach Tracking Spreadsheet Template

Copy this into Google Sheets or Notion for real-time tracking.

---

## Sheet 1: Prospect Pipeline

| ID | Company | Contact Name | Title | Platform | Email/LinkedIn | Template Used | Sent Date | Sent Time | Status | Opened? | Replied? | Reply Date | Call Booked? | Call Date | Closed? | Amount | Notes |
|----|---------|--------------|-------|----------|----------------|---------------|-----------|-----------|--------|---------|----------|------------|--------------|-----------|---------|--------|-------|
| 1 | AcmeCloud | [Name] | Head of Growth | LinkedIn | [URL] | Template 1 | | | 🔴 Not Sent | | | | | | | | Research contact |
| 2 | FlowOps | [Name] | COO | LinkedIn | [URL] | Template 2 | | | 🔴 Not Sent | | | | | | | | Hot lead |
| 3 | VoltLedger | [Name] | Ops Manager | Email | [Email] | Template 4 | | | 🔴 Not Sent | | | | | | | | Find email |
| 4 | BrightDental | [Name] | Founder | Twitter | [@handle] | Template 3 | | | 🔴 Not Sent | | | | | | | | Find Twitter |

**Status Options**:
- 🔴 Not Sent
- 🟡 Sent - Awaiting
- 🟢 Replied - Engaged
- 🔵 Call Booked
- ✅ CLOSED ($199)
- ❌ Dead Lead
- ⏸️ Not Interested

---

## Sheet 2: Daily Metrics

| Date | Messages Sent | Platform (L/E/T) | Opens | Open Rate | Replies | Reply Rate | Calls Booked | Sales Closed | Revenue | Notes |
|------|---------------|------------------|-------|-----------|---------|------------|--------------|--------------|---------|-------|
| Mar 24 | 10 | 5/5/0 | 7 | 70% | 3 | 30% | 1 | 0 | $0 | Batch 1 - Testing |
| Mar 26 | 15 | 8/5/2 | | | | | | | | Batch 2 |
| Mar 28 | 15 | | | | | | | | | Batch 3 |

**Legend**: L = LinkedIn, E = Email, T = Twitter

---

## Sheet 3: Template Performance

| Template | Times Used | Reply Rate | Call Rate | Close Rate | Best Platform | Notes |
|----------|------------|------------|-----------|------------|---------------|-------|
| #1 - Lead Enrichment | 15 | 35% | 20% | 40% | LinkedIn | Strong for SaaS |
| #2 - Meeting Chaos | 12 | 28% | 15% | 33% | Email | Good for PMs |
| #3 - Free Value | 8 | 42% | 25% | 50% | Twitter | Highest conversion! |
| #4 - ROI Calculator | 10 | 20% | 10% | 30% | Email | Needs tweaking |
| #5 - Pattern Interrupt | 5 | 15% | 5% | 0% | Email | Low performer |

**Action**: Double down on #3 (Free Value) after Week 1 analysis

---

## Sheet 4: Response Templates (Quick Copy-Paste)

### When They Say "Interested"
```
Awesome! Two quick questions:
1. How much time does your team spend on [pain point] weekly?
2. What tools do you currently use?

I'll send a demo + setup timeline. When works for a 15-min call?
```

### When They Say "Too Busy"
```
Totally get it. Want me to ping you in 2 weeks? 

Or I can send the setup doc now and you revisit when ready.
```

### When They Say "What's the Catch?"
```
No catch. Beta pricing to validate demand before raising to $450.

You get the workflow + docs for $199. If it doesn't save 6+ hours/week, you've learned what NOT to build. If it does, you've saved $16k+/year.

Want to see a demo first?
```

### Day 3 Follow-Up (If No Reply)
```
Quick follow-up — did the demo make sense for your workflow?

If timing's bad, no worries. If interesting, I can send setup docs today.
```

### Day 7 Final Touch
```
Last ping — closing beta slots this week. $199 rate ends Friday.

If not a fit, no problem. Here's a free resource: [link to lead scraper script]
```

---

## Sheet 5: Weekly Goals & Actuals

| Week | Goal: Sent | Actual: Sent | Goal: Replies | Actual: Replies | Goal: Calls | Actual: Calls | Goal: Sales | Actual: Sales | Revenue |
|------|------------|--------------|---------------|-----------------|-------------|---------------|-------------|---------------|---------|
| Week 1 | 50 | | 15 (30%) | | 5 | | 2 | | $398 |
| Week 2 | 50 | | 20 (40%) | | 8 | | 3 | | $597 |
| Week 3 | 40 | | 18 (45%) | | 7 | | 3 | | $597 |

**Total Revenue Target (Month 1)**: $1,500 (7-8 beta sales)

---

## Quick Stats Formulas (Google Sheets)

**Reply Rate**: `=COUNTIF(J:J,"Yes")/COUNTA(H:H)*100`  
**Call Booking Rate**: `=COUNTIF(M:M,"Yes")/COUNTIF(J:J,"Yes")*100`  
**Close Rate**: `=COUNTIF(O:O,"Yes")/COUNTIF(M:M,"Yes")*100`  
**Total Revenue**: `=SUM(P:P)`

---

## Alternative: Notion Database

If using Notion instead of Sheets, create a database with these properties:

- **Company** (Title)
- **Contact Name** (Text)
- **Platform** (Select: LinkedIn, Email, Twitter)
- **Template** (Select: #1-#5)
- **Status** (Select: Not Sent, Sent, Replied, Call Booked, Closed, Dead)
- **Sent Date** (Date)
- **Reply Date** (Date)
- **Call Date** (Date)
- **Revenue** (Number)
- **Notes** (Text)

**Views**:
1. **All Prospects** (Table view)
2. **Active Outreach** (Filter: Status = Sent or Replied)
3. **Calls This Week** (Filter: Call Date = This Week)
4. **Closed Deals** (Filter: Status = Closed)
5. **Performance Dashboard** (Board view by Status)

---

**Setup Time**: 15-20 minutes  
**Update Frequency**: Daily (after sending batch + receiving replies)  
**Owner**: Trinity (Operations Lead)
