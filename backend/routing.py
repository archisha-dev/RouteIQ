"""
Owner: Tanmay
Category -> department lookup. Locked mapping, extend the dict to scale.
"""

DEPARTMENT_MAP = {
    "Financial Fraud": "Cyber Financial Cell",
    "Phishing": "Cyber Security Cell",
    "Hacking": "Cyber Crime Cell",
    "Cyberbullying": "Cyber Crime Cell (Women & Child Safety)",
}

def route_department(category: str) -> str:
    return DEPARTMENT_MAP.get(category, "General Cyber Cell")
