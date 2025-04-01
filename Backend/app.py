from flask import Flask, request, jsonify, send_from_directory, url_for
from flask_cors import CORS
from TTS.api import TTS
from pydub import AudioSegment
import os
import uuid

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Initialize the TTS model
tts = TTS(model_name="tts_models/multilingual/multi-dataset/your_tts", progress_bar=True)
tts.to("cpu")

OUTPUT_FOLDER = "outputs"
app.config['OUTPUT_FOLDER'] = OUTPUT_FOLDER
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

@app.route('/clone', methods=['POST'])
def clone_voice():
    text = request.form.get('text')
    files = request.files.getlist('voiceFiles')

    if not text or not files:
        return "Missing text or voice files", 400

    # Clear the outputs folder before generating a new audio
    for file in os.listdir(OUTPUT_FOLDER):
        file_path = os.path.join(OUTPUT_FOLDER, file)
        try:
            if os.path.isfile(file_path):
                os.remove(file_path)
        except Exception as e:
            print(f"Error deleting {file_path}: {e}")

    # Save and merge voice samples
    voice_paths = []
    for f in files:
        path = f"{OUTPUT_FOLDER}/user_voice_{uuid.uuid4().hex}.wav"
        f.save(path)
        voice_paths.append(path)

    combined = AudioSegment.empty()
    for path in voice_paths:
        combined += AudioSegment.from_wav(path)

    merged_path = f"{OUTPUT_FOLDER}/merged_reference_{uuid.uuid4().hex}.wav"
    combined.export(merged_path, format="wav")

    # Generate cloned voice
    output_filename = f"output_{uuid.uuid4().hex}.wav"
    output_path = os.path.join(OUTPUT_FOLDER, output_filename)
    tts.tts_to_file(text=text, speaker_wav=merged_path, language="en", file_path=output_path)

    # Clean up individual voice samples
    for path in voice_paths:
        os.remove(path)
    os.remove(merged_path)

    # Return a URL to download the file
    download_url = url_for('serve_output_file', filename=output_filename, _external=True)
    return jsonify({"download_url": download_url}), 200

# Route to serve output audio
@app.route('/outputs/<filename>')
def serve_output_file(filename):
    return send_from_directory(app.config['OUTPUT_FOLDER'], filename, as_attachment=True)

# Route to list all generated audio files
@app.route('/list-outputs', methods=['GET'])
def list_outputs():
    files = os.listdir(OUTPUT_FOLDER)
    return jsonify(files)

if __name__ == '__main__':
    app.run(debug=True)
