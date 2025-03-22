import spacy  # Tokenization and grammar identification
import torch
import pyttsx3  # Text-to-speech conversion
from transformers import pipeline  # For NER (Named Entity Recognition)
from flask import Flask, request, jsonify  # To import data from JavaScript file
from flask_cors import CORS  # To resolve CORS issues

app = Flask(__name__)
CORS(app, resources={r"/data": {"origins": "http://127.0.0.1:5500"}})

# Importing data from JavaScript file
@app.route('/data', methods=['POST'])
def receive_data():
    data = request.json  # Convert JSON data to a Python dictionary
    print(f"Received data: {data}")
    
    value = data.get('key')  # Extracting the input sentence
    print(f"Value of 'key': {value}")
    
    # Load SpaCy model
    nlp = spacy.load("en_core_web_sm")
    
    # Load pre-trained emotion detection model
    emotion_pipeline = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", return_all_scores=True)

    def get_emotions(text):
        doc = nlp(text)
        emotions = emotion_pipeline(text)
        return emotions

    # Processing the input sentence
    text = value
    emotions = get_emotions(text)
    print(emotions)
    
    for emotion in emotions[0]:
        print(f"{emotion['label']}: {emotion['score']:.4f}")
        
    # Initialize the TTS engine
    engine = pyttsx3.init()

    # Get available voices
    voices = engine.getProperty('voices')

    # Set a different voice (Change index to select a different accent, e.g., British or US)
    for voice in voices:
        if "english" in voice.name.lower() and "us" in voice.name.lower():  # Looking for British accent
            engine.setProperty('voice', voice.id)
            break  # Use the first matching voice

    # Reduce speed
    engine.setProperty('rate', 200)  # Default is around 200, lower means slower
    engine.setProperty('volume', 0.9)

    # Determine the dominant emotion
    dominant_emotion = max(emotions[0], key=lambda x: x["score"])

    # Adjust speech properties based on dominant emotion
    if dominant_emotion['label'] == 'joy':
        engine.setProperty('rate', 130)
    elif dominant_emotion['label'] == 'sadness':
        engine.setProperty('rate', 100)
    elif dominant_emotion['label'] == 'anger':
        engine.setProperty('rate', 140)
    elif dominant_emotion['label'] == 'fear':
        engine.setProperty('rate', 110)
    elif dominant_emotion['label'] == 'surprise':
        engine.setProperty('rate', 135)
    else:  # Neutral or other emotions
        engine.setProperty('rate', 120)

    # Convert text to speech
    engine.say(value)
    engine.runAndWait()
    
    return jsonify({"status": "success", "data": data})


if __name__ == '__main__':
    app.run(debug=True)
