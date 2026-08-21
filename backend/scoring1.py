from datetime import datetime


def confidence_score(description, amount, category):
    description = description.lower()
    score = 0

    if "upi" in description:
        score += 20

    if "otp" in description:
        score += 20

    if "bank employee" in description or "bank official" in description:
        score += 20

    if "recent transaction" in description:
        score += 20

    if "transferred" in description or "transfer" in description:
        score += 20

    return float(score)


def recoverability_score(category, timestamp):
    incident_time = datetime.fromisoformat(timestamp)
    current_time = datetime.now()

    elapsed_time = current_time - incident_time
    elapsed_hours = elapsed_time.total_seconds() / 3600

     category = category.lower()

    if category != "financial fraud":
        return 60, "Medium"
        
    if elapsed_hours < 1:
        return 95,"High"

    elif elapsed_hours <= 24:
        return 60,"Medium"

    else:
        return 30,"Low"


if __name__ == "__main__":
    complaint = """
Someone called pretending to be a bank employee.
I shared my OTP and money was transferred through UPI.
This was a recent transaction.
"""

    pattern_score = confidence_score(
        complaint,
        45000,
        "Financial Fraud"
    )

    recoverability = recoverability_score(
        "Financial Fraud",
        "2026-08-20T12:30:00"
    )

    print("Pattern Match Score:", pattern_score)
    print("Recoverability:", recoverability)
