"""
Owner: Aryan
Rule-based (not ML) scoring:
- confidence_score: how closely the complaint matches known fraud-pattern profiles
- recoverability_score: how much of the time-sensitive action window remains
"""

def confidence_score(description: str, amount: float, category: str) -> float:
    # TODO: weighted-keyword rules, e.g. UPI + OTP + fake bank call = strong match
    return 87.0

def recoverability_score(category: str, timestamp: str) -> str:
    # TODO: category + time-elapsed rule table (e.g. <1hr High, 1-24hr Medium, >24hr Low)
    return "High"
