import { useState } from "react";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesisInstance, setSpeechSynthesisInstance] = useState(null);

  const handleGenerateSpeech = () => {
    if (!text.trim()) return;

    const speech = new SpeechSynthesisUtterance(text);
    speech.onend = () => setIsSpeaking(false);
    speech.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(speech);
    setSpeechSynthesisInstance(speech);
    setIsSpeaking(true);
  };

  const handlePauseSpeech = () => {
    window.speechSynthesis.pause();
    setIsSpeaking(false);
  };

  const handleResumeSpeech = () => {
    window.speechSynthesis.resume();
    setIsSpeaking(true);
  };

  const handleDownloadSpeech = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "speech.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Text to Speech Converter
        </h2>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here..."
          className="w-full h-40 p-4 text-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
        />

        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={handleGenerateSpeech}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg transition-transform transform hover:scale-105"
          >
            Generate Speech
          </button>
          {isSpeaking ? (
            <button
              onClick={handlePauseSpeech}
              className="px-6 py-3 bg-red-500 text-white rounded-lg transition-transform transform hover:scale-105"
            >
              Pause
            </button>
          ) : (
            <button
              onClick={handleResumeSpeech}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg transition-transform transform hover:scale-105"
            >
              Resume
            </button>
          )}
          <button
            onClick={handleDownloadSpeech}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg transition-transform transform hover:scale-105"
          >
            Download Audio
          </button>
        </div>

        <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
          <p>
            This tool converts your text into speech. You can pause, resume, or download the text as needed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;
