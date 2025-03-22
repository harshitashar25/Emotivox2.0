import { useState } from "react";
import { FaUpload, FaMicrophone, FaPause, FaPlay, FaDownload } from "react-icons/fa";

const VoiceCloning = () => {
  const [text, setText] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "audio/wav") {
      setAudioFile(file);
    } else {
      alert("Please upload a valid WAV file.");
    }
  };

  const handleGenerateSpeech = () => {
    if (!text.trim()) {
      alert("Please enter text for voice cloning.");
      return;
    }
    if (!audioFile) {
      alert("Please upload a reference audio file.");
      return;
    }

    alert(`Voice cloning initiated with reference audio: ${audioFile.name}`);
    setIsSpeaking(true);
    // Here you will integrate with your Gradio backend to process the audio file and text
  };

  const handlePauseSpeech = () => {
    setIsSpeaking(false);
    alert("Paused speech.");
  };

  const handleResumeSpeech = () => {
    setIsSpeaking(true);
    alert("Resumed speech.");
  };

  const handleDownloadSpeech = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cloned_speech.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Voice Cloning
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
          Upload a reference audio file and enter text to synthesize speech.
        </p>

        {/* Text Input */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here..."
          className="w-full h-32 p-4 text-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />

        {/* File Upload */}
        <div className="mt-4">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Upload Reference Audio (WAV only)</label>
          <div className="flex items-center space-x-3">
            <label className="cursor-pointer bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700 transition-transform transform hover:scale-105">
              <FaUpload />
              <span>Upload</span>
              <input
                type="file"
                accept=".wav"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
            {audioFile && <span className="text-gray-600 dark:text-gray-400">{audioFile.name}</span>}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={handleGenerateSpeech}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg transition-transform transform hover:scale-105 flex items-center space-x-2"
          >
            <FaMicrophone />
            <span>Clone Voice</span>
          </button>
          {isSpeaking ? (
            <button
              onClick={handlePauseSpeech}
              className="px-6 py-3 bg-red-500 text-white rounded-lg transition-transform transform hover:scale-105 flex items-center space-x-2"
            >
              <FaPause />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={handleResumeSpeech}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg transition-transform transform hover:scale-105 flex items-center space-x-2"
            >
              <FaPlay />
              <span>Resume</span>
            </button>
          )}
          <button
            onClick={handleDownloadSpeech}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg transition-transform transform hover:scale-105 flex items-center space-x-2"
          >
            <FaDownload />
            <span>Download</span>
          </button>
        </div>

        <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
          <p>Upload a WAV file and input text to create synthesized speech.</p>
        </div>
      </div>
    </div>
  );
};

export default VoiceCloning;
