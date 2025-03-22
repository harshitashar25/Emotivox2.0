import React from "react";
import Header from "./Header"; // Ensure correct path

const About = () => {
  return (
    <div className="bg-gradient-to-b from-teal-800 via-teal-600 to-teal-100 min-h-screen">
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black p-6">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-10 rounded-xl shadow-2xl border border-gray-700 text-white">
          <h2 className="text-4xl font-extrabold text-center mb-6">
            About <span className="text-[#CFFF04]">QuadraTech</span>
          </h2>
          <p className="text-lg text-gray-300 text-center leading-relaxed">
            QuadraTech is an innovative AI-powered platform revolutionizing speech-to-text,
            text-to-speech, and voice cloning technologies.
          </p>

          {/* Features Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-[#CFFF04] mb-3">🌟 Key Features</h3>
            <ul className="list-none space-y-4">
              <li className="flex items-center space-x-3">
                <span className="text-[#CFFF04] text-2xl">✔</span>
                <p className="text-lg">Real-time <strong>Speech-to-Text</strong> conversion.</p>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-[#CFFF04] text-2xl">✔</span>
                <p className="text-lg">High-quality <strong>Text-to-Speech</strong> synthesis.</p>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-[#CFFF04] text-2xl">✔</span>
                <p className="text-lg"><strong>Personalized Voice Cloning</strong> using AI.</p>
              </li>
            </ul>
          </div>

          {/* Tech Stack Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-[#CFFF04] mb-3">🛠️ Technologies Used</h3>
            <div className="grid grid-cols-2 gap-4 text-lg">
              <span className="bg-gray-800 py-2 px-4 rounded-md shadow-md">React.js</span>
              <span className="bg-gray-800 py-2 px-4 rounded-md shadow-md">Tailwind CSS</span>
              <span className="bg-gray-800 py-2 px-4 rounded-md shadow-md">Web Speech API</span>
              <span className="bg-gray-800 py-2 px-4 rounded-md shadow-md">Coqui TTS</span>
              <span className="bg-gray-800 py-2 px-4 rounded-md shadow-md">JavaScript</span>
              <span className="bg-gray-800 py-2 px-4 rounded-md shadow-md">Web Audio API</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-10 text-center">
            <a
              href="/"
              className="px-6 py-3 text-lg font-bold bg-[#CFFF04] text-black rounded-full shadow-lg hover:scale-105 transition transform duration-300"
            >
              Get Started 🚀
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
