# RouteIQ — routes complaints, intelligently

Automated triage and routing for cybercrime complaints.
**SIH 2026 (KGCE internal hackathon) — Round 1, Prototype Pitch**

## Problem statement

Complaints filed on portals like cybercrime.gov.in are manually reviewed before
being routed to the right department. For financial fraud, banks can only
freeze a stolen transaction within a short window — manual sorting delays
routing and reduces recovery chances. This gap was flagged as a real
operational pain point by an MH Cyber officer during a team member's
internship.

## What it does

Complaint submitted → NLP classifies category → confidence score (pattern
match %) → recoverability score (time-sensitivity) → routed to the correct
cyber cell → logged in SQLite → shown on a results screen.

Maps to **SDG 16 — Peace, Justice and Strong Institutions**.

## Tech stack

| Layer | Technology |
|---|---|
| Classifier | Python + scikit-learn |
| Backend | Flask |
| Frontend | HTML / CSS / JS |
| Database | SQLite |

## Repo structure

```
RouteIQ/
├── backend/
│   ├── app.py            Flask routes + integration (Archisha)
│   ├── classifier.py     NLP category prediction (Suyash)
│   ├── scoring.py        Confidence + recoverability scoring (Aryan)
│   ├── routing.py        Category -> department mapping (Tanmay)
│   └── requirements.txt
├── frontend/              Complaint form + results UI (Vedika)
├── LICENSE
└── README.md
```

## Setup

```bash
cd backend
pip install -r requirements.txt --break-system-packages
python app.py
```
Visit `http://127.0.0.1:5000/` → `{"status": "RouteIQ backend running"}`

Test the full pipeline:
```bash
curl -X POST http://127.0.0.1:5000/submit -H "Content-Type: application/json" \
  -d '{"description":"test","amount":5000,"category":"Financial Fraud","txn_id":"UPI123"}'
```

## Team & branches

| Person | Branch | Owns |
|---|---|---|
| Archisha | `main` (protected) | Coordination, integration, GitHub, API, testing |
| Suyash | `classifier` | Complaint → NLP → category + ML confidence |
| Tanmay | `routing-backend` | API → SQLite → routing → logging |
| Aryan | `scoring` | Pattern-match score + recoverability score |
| Vedika | `frontend` | Complaint UI + results UI |
| Yutika | `dataset` | Dataset → testing → metrics → evidence/impact |

Everyone branches off `main`, opens a pull request to merge back — no direct
pushes to `main`.

## Category → department mapping (locked)

| Category | Department |
|---|---|
| Financial Fraud | Cyber Financial Cell |
| Phishing | Cyber Security Cell |
| Hacking | Cyber Crime Cell |
| Cyberbullying | Cyber Crime Cell (Women & Child Safety) |

## Scalability

Same architecture extends to any state cyber cell or the national portal —
scaling means adding categories/departments to the lookup, not redesigning
the system.

## Future scope (not in MVP)

Threat-intel API cross-checks (Google Safe Browsing, VirusTotal), evidence
integrity hashing (SHA-256) for chain-of-custody, expansion into a broader
investigator's toolkit (OSINT case-management workspace).

