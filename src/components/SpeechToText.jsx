import { useState, useRef } from "react";
import Header from "./Header"; // Import the Header component

const SpeechToText = () => {
  const [text, setText] = useState("🎤 Your speech will appear here...");
  const [language, setLanguage] = useState("None");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const startRecognition = (lang) => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = lang;
    recognition.continuous = true;
    recognition.interimResults = true;

    setText("🎧 Listening...");
    setLanguage(lang === "hi-IN" ? "Hindi" : "English");
    recognitionRef.current = recognition;

    let finalTranscript = "";

    recognition.onresult = (event) => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      setText(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event) => {
      setText("⚠️ Error: " + event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    setIsListening(true);
  };

  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setText("🛑 Stopped Listening.");
    setLanguage("None");
    setIsListening(false);
  };

  const downloadText = () => {
    const file = new Blob([text], { type: 'text/plain' });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "transcript-" + Date.now() + ".txt";
    document.body.appendChild(element);
    element.click();
  };

  const startNewSession = () => {
    stopRecognition();
    setText("🎤 Your speech will appear here...");
    setLanguage("None");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-black via-gray-900 to-black p-6">

      <Header /> {/* Added Header Component */}
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md p-10 rounded-xl shadow-2xl border border-gray-700 text-white text-center">
        
        {/* Title Section */}
        <h2 className="text-4xl font-extrabold text-[#CFFF04] drop-shadow-lg">
           Voice To Text App
        </h2>
        <p className="text-lg text-gray-300 mt-2">
          Convert your speech into text seamlessly!
        </p>

        {/* Speech Recognition Box */}
        <div className="mt-6 p-6 bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-lg text-lg text-gray-100 min-h-[150px] text-left font-medium leading-relaxed shadow-inner transition-all duration-300 ease-in-out">
          {text}
        </div>

        {/* Language Info */}
        <p className="text-lg font-semibold text-gray-300 mt-3">
          Language: <span className="text-[#CFFF04]">{language}</span>
        </p>

        {/* Buttons Container */}
       {/* Buttons Container */}
<div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
  <button
    onClick={() => startRecognition("en-US")}
    className="px-5 py-3 bg-gradient-to-r from-green-400 to-green-600 text-black font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform"
  >
     Start English
  </button>
  <button
    onClick={() => startRecognition("hi-IN")}
    className="px-5 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform"
  >
     Start Hindi
  </button>
  <button
    onClick={stopRecognition}
    className="px-5 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform"
  >
     Stop
  </button>
  <button
    onClick={downloadText}
    className="px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform"
  >
    Download
  </button>
  <button
    onClick={startNewSession}
    className="px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform col-span-2 sm:col-span-1"
  >
     New Session
  </button>
</div>

      </div>
    </div>
  );
};

export default SpeechToText;
