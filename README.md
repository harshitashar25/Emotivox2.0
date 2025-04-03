🎙️EMOTIVOX2.0 - VOICE Cloning Web Application

This project is a web-based Voice Cloning App that allows users to upload their voice samples and generate cloned speech from text input. The app uses “YourTTS” under the hood and offers an easy-to-use interface via a modern frontend framework powered by “Vite”.

✅ Convert Text to Voice  
✅ Generate Cloned Voice from Text (using uploaded samples)  
✅ Perform Voice to Text Transcription (supports both English and Hindi)  

```
📁 Project Structure  
EMOTIVOX2.0/  
└── Backend/  
    ├── outputs/  
    │   ├── README.md  
    │   ├── app.py                      # Flask backend script  
    │   ├── requirements.ja.txt         # Additional/Language-specific dependencies  
    │   ├── requirements.txt            # Python dependencies  
└── src/  
    ├── .gitattributes  
    ├── .gitignore  
    ├── README.md                       # Backend README  
    ├── eslint.config.js                # Linting rules for code quality  
    ├── index.html                      # Main HTML entry point  
    ├── package.json                    # Frontend dependency manager config  
    └── vite.config.js                   # Vite build tool configuration  

```

🔄 Workflow

1.  Frontend
- Users upload voice samples and input text/audio.
- Buttons trigger backend APIs.
- Audio results are played , can be paused and downloadable.

2. Backend (Flask)
- Handles:
 - Voice cloning (Text → Cloned Voice)
 - Basic TTS (Text → Voice)
 - ASR (Voice → Text in Hindi/English)
- Outputs audio/text via Flask routes.



🛠️ Setup Instructions

✅ Prerequisites
- Python 3.8+
- Node.js 14+
- pip / npm / yarn





🔧 Backend Setup
```bash
cd frontend/Backend/TTS
```
```bash
pip install -r requirements.txt
```

# Run Flask backend
python app.py

 It will Run on http://127.0.0.1:5000

💻 Frontend Setup

## Frontend Setup

```bash
cd frontend
npm init -y
```
```bash
npm install
```
```bash
npm run dev
```
