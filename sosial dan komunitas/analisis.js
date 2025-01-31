from flask import Flask, request, jsonify
from textblob import TextBlob
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Mengizinkan akses dari frontend React

@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    data = request.get_json()
    message = data.get("message", "")
    
    if not message:
        return jsonify({"error": "Message is required"}), 400
    
    analysis = TextBlob(message)
    sentiment_score = analysis.sentiment.polarity
    sentiment = "Neutral"
    
    if sentiment_score > 0:
        sentiment = "Positive"
    elif sentiment_score < 0:
        sentiment = "Negative"
    
    return jsonify({"message": message, "sentiment": sentiment, "score": sentiment_score})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
