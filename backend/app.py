"""
RouteIQ - Flask Backend
------------------------
Run with:  python app.py
Test with: curl -X POST http://127.0.0.1:5000/submit -H "Content-Type: application/json" -d "{\"description\":\"test\",\"amount\":5000,\"category\":\"Financial Fraud\",\"txn_id\":\"UPI123\"}"

Owner: Archisha (integration). Each teammate owns one imported module below -
see classifier.py, scoring.py, routing.py.
"""

from flask import Flask, request, jsonify
import sqlite3
from datetime import datetime

from classifier import predict_category      # Suyash
from scoring import confidence_score, recoverability_score  # Aryan
from routing import route_department          # Tanmay

app = Flask(__name__)
DB_NAME = "routeiq.db"


def init_db():
    conn = sqlite3.connect(DB_NAME)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS complaints (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT,
            description TEXT,
            amount REAL,
            txn_id TEXT,
            confidence_score REAL,
            recoverability_score TEXT,
            department TEXT,
            timestamp TEXT
        )
    """)
    conn.commit()
    conn.close()


@app.route("/submit", methods=["POST"])
def submit_complaint():
    data = request.get_json()

    category = predict_category(data.get("description", ""))
    confidence = confidence_score(data.get("description", ""), data.get("amount", 0), category)
    recoverability = recoverability_score(category, datetime.now().isoformat())
    department = route_department(category)
    timestamp = datetime.now().isoformat()

    conn = sqlite3.connect(DB_NAME)
    conn.execute(
        "INSERT INTO complaints (category, description, amount, txn_id, confidence_score, recoverability_score, department, timestamp) VALUES (?,?,?,?,?,?,?,?)",
        (category, data.get("description"), data.get("amount"), data.get("txn_id"),
         confidence, recoverability, department, timestamp)
    )
    conn.commit()
    conn.close()

    return jsonify({
        "category": category,
        "confidence_score": confidence,
        "recoverability_score": recoverability,
        "department": department,
        "timestamp": timestamp
    })


@app.route("/history", methods=["GET"])
def get_history():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    rows = conn.execute("SELECT * FROM complaints ORDER BY id DESC").fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])


@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "RouteIQ backend running"})


if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=5000)
