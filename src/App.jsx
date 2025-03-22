import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import TextToSpeech from "./components/TextToSpeech";
import "./index.css";
import VoiceCloning from "./components/VoiceCloning";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/text-to-speech" element={<TextToSpeech />} />
          <Route path="/voice-cloning" element={<VoiceCloning />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
