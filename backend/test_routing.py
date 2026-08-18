from routing import route_department


def test_financial_fraud():
    assert route_department("Financial Fraud") == "Cyber Financial Cell"


def test_phishing():
    assert route_department("Phishing") == "Cyber Security Cell"


def test_hacking():
    assert route_department("Hacking") == "Cyber Crime Cell"


def test_cyberbullying():
    assert route_department("Cyberbullying") == "Cyber Crime Cell (Women & Child Safety)"


def test_unknown_category():
    assert route_department("Unknown") == "General Cyber Cell"


print("All routing tests passed!")