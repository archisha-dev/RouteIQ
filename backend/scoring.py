from datetime import datetime


def confidence_score(description, amount, category):
    description = description.lower()
    category = category.lower()

    score = 0
    matched_indicators = []

    # -------------------------------------------------
    # FINANCIAL FRAUD
    # -------------------------------------------------
    if category == "financial fraud":

        patterns = {
            "UPI transaction": ["upi", "upi account"],
            "OTP request": ["otp", "one time password"],
            "Bank impersonation": [
                "bank employee",
                "bank official",
                "bank representative",
                "bank officer"
            ],
            "Recent transaction": [
                "recent transaction",
                "just transferred",
                "just now",
                "within 10 minutes"
            ],
            "Money transfer": [
                "transferred",
                "transfer",
                "money was sent",
                "money deducted"
            ],
            "Unauthorized transaction": [
                "unauthorized transaction",
                "unknown transaction",
                "transaction i did not make"
            ]
        }

    # -------------------------------------------------
    # PHISHING
    # -------------------------------------------------
    elif category == "phishing":

        patterns = {
            "Suspicious link": [
                "suspicious link",
                "malicious link",
                "unknown link",
                "fake link"
            ],
            "Clicked link": [
                "clicked the link",
                "click on the link",
                "opened the link"
            ],
            "Fake website": [
                "fake website",
                "fake login",
                "fake page",
                "phishing website"
            ],
            "Credential request": [
                "password",
                "username",
                "login credentials",
                "credentials"
            ],
            "Account verification scam": [
                "verify your account",
                "account verification",
                "verify account"
            ],
            "Suspicious email/message": [
                "phishing email",
                "suspicious email",
                "fake email",
                "suspicious message"
            ]
        }

    # -------------------------------------------------
    # HACKING
    # -------------------------------------------------
    elif category == "hacking":
        patterns = {
        "Unauthorized access": [
            "unauthorized access",
            "accessed without permission",
            "accessed my account",
            "accessed my email account",
            "without permission"
        ],

        "Computer hacked": [
            "computer hacked",
            "hacked my computer",
            "my computer was hacked",
            "computer was compromised"
        ],

        "Account hacked": [
            "account hacked",
            "hacked my account",
            "my account was hacked"
        ],

        "Password compromise": [
            "password changed",
            "password was changed",
            "password compromised",
            "password was compromised",
            "cannot log in",
            "cannot login"
        ],

        "Device compromise": [
            "device hacked",
            "device was hacked",
            "phone hacked",
            "phone was hacked"
        ],

        "Malware activity": [
            "malware",
            "virus",
            "trojan",
            "ransomware"
        ],

        "Unknown login": [
            "unknown login",
            "unauthorized login",
            "unknown device",
            "strange login"
        ]
    }

    # -------------------------------------------------
    # CYBERBULLYING
    # -------------------------------------------------
    elif category == "cyberbullying":

        patterns = {
            "Online harassment": [
                "online harassment",
                "harassing me",
                "harassment",
                "harassed"
            ],
            "Threats": [
                "threat",
                "threatened",
                "threatening",
                "death threat"
            ],
            "Abusive messages": [
                "abusive messages",
                "abusive language",
                "insulting messages",
                "offensive messages"
            ],
            "Repeated messages": [
                "repeated messages",
                "constant messages",
                "keeps messaging",
                "messages repeatedly"
            ],
            "Social media abuse": [
                "social media",
                "instagram",
                "facebook",
                "whatsapp"
            ],
            "Blackmail": [
                "blackmail",
                "blackmailing",
                "threatening to post"
            ]
        }

    else:
        patterns = {}

    # -------------------------------------------------
    # MATCH PATTERNS
    # -------------------------------------------------

    for indicator, keywords in patterns.items():

        if any(keyword in description for keyword in keywords):
            matched_indicators.append(indicator)

    # 15 points for each matched indicator
    score = min(len(matched_indicators) * 15, 100)

    # Additional evidence for financial complaints
    if category == "financial fraud" and amount and amount > 0:
        if "Transaction amount" not in matched_indicators:
            matched_indicators.append("Transaction amount")
            score = min(score + 10, 100)

    return float(score), matched_indicators


def recoverability_score(category, timestamp):
    incident_time = datetime.fromisoformat(timestamp)
    current_time = datetime.now()

    elapsed_time = current_time - incident_time
    elapsed_hours = elapsed_time.total_seconds() / 3600

    category = category.lower()

    # Financial Fraud uses time-decay recoverability
    if category == "financial fraud":

        if elapsed_hours < 1:
            return 95, "High"

        elif elapsed_hours <= 24:
            return 60, "Medium"

        else:
            return 30, "Low"

    # All other categories have flat Medium recoverability
    else:
        return 60, "Medium"


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