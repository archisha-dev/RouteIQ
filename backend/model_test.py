import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer

from sklearn.naive_bayes import MultinomialNB

from sklearn.metrics import accuracy_score, classification_report


# =========================================================
# 1. LOAD ROUTEIQ DATASET
# =========================================================

data = pd.read_csv("routeiq_test_dataset.csv")
print("Dataset loaded successfully!")
print("Column names:", data.columns.tolist())
print(data.head())

print("Dataset loaded successfully!")
print("Total complaints:", len(data))

print("\nCategories:")
print(data["Category"].value_counts())


# =========================================================
# 2. SEPARATE COMPLAINTS AND CATEGORIES
# =========================================================

X = data["Incident_Description"]
y = data["Category"]


# =========================================================
# 3. SPLIT DATASET
# =========================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.25,
    random_state=42,
    stratify=y
)


# =========================================================
# 4. TF-IDF FEATURE EXTRACTION
# =========================================================

vectorizer = TfidfVectorizer()

X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

print("\nTF-IDF created successfully!")
print("Training samples:", X_train_tfidf.shape[0])
print("Testing samples:", X_test_tfidf.shape[0])


# =========================================================
# 5. NAIVE BAYES MODEL
# =========================================================

nb_model = MultinomialNB()

nb_model.fit(X_train_tfidf, y_train)


# =========================================================
# 6. PREDICTION
# =========================================================

nb_predictions = nb_model.predict(X_test_tfidf)


# =========================================================
# 7. ACCURACY
# =========================================================

nb_accuracy = accuracy_score(y_test, nb_predictions)

print("\n==============================")
print("NAIVE BAYES RESULTS")
print("==============================")

print("Accuracy:", round(nb_accuracy * 100, 2), "%")


# =========================================================
# 8. CLASSIFICATION REPORT
# =========================================================

print("\nClassification Report:")

print(
    classification_report(
        y_test,
        nb_predictions
    )
)


# =========================================================
# 9. TEST A NEW COMPLAINT
# =========================================================

print("\n==============================")
print("NEW COMPLAINT TEST")
print("==============================")

complaint = input("Enter a complaint: ")

complaint_tfidf = vectorizer.transform([complaint])

prediction = nb_model.predict(complaint_tfidf)

probabilities = nb_model.predict_proba(complaint_tfidf)

confidence = max(probabilities[0]) * 100

print("\nPredicted Category:", prediction[0])
print("Confidence:", round(confidence, 2), "%")
