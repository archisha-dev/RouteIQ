"""
Owner: Suyash
Reads a complaint description and predicts its category.
Replace predict_category() with a real trained model (model.pkl) once ready.
"""

import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB


# Load dataset
data = pd.read_csv("routeiq_test_dataset.csv")

# Complaint text and category
X = data["Incident_Description"]
y = data["Category"]


# Convert complaint text into TF-IDF features
vectorizer = TfidfVectorizer()

X_tfidf = vectorizer.fit_transform(X)


# Train Naive Bayes model
model = MultinomialNB()

model.fit(X_tfidf, y)


def predict_category(complaint):
    """
    Predict category for a new complaint.
    """

    # Convert new complaint into TF-IDF
    complaint_tfidf = vectorizer.transform([complaint])

    # Predict category
    prediction = model.predict(complaint_tfidf)[0]

    # Get confidence
    probabilities = model.predict_proba(complaint_tfidf)[0]
    confidence = max(probabilities) * 100

    return prediction, confidence

