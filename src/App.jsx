import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import TextToSpeech from "./components/TextToSpeech";
import "./index.css";
import VoiceCloning from "./components/VoiceCloning";
import SpeechToText from "./components/SpeechToText";
import About from "./components/About";


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/text-to-speech" element={<TextToSpeech />} />
          <Route path="/voice-cloning" element={<VoiceCloning />} />
          <Route path="/speech-to-text" element={<SpeechToText />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
