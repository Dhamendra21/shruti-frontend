// src/pages/TextToSign/TextToSignPage.jsx

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api";
import useAPI from "../../store/useAPI";

// Header (used only in full mode)
import Header from "../livetranslate/Header";

// UI Components
import InputCard from "./InputCard";
import ResultSection from "./ResultSection";

const LANG_OPTIONS = [
  { code: "en", label: "EN" },
  { code: "hi", label: "HI" },
  { code: "mr", label: "MR" },
  { code: "bn", label: "BN" },
];

export default function TextToSignPage({
  internalMode = false,
  initialText = "",
}) {
  // -------------------------
  // STATE
  // -------------------------
  const [lang, setLang] = useState("en");
  const [text, setText] = useState(initialText); // <— auto fill reply text
  const [liveTranscript, setLiveTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // API {mode, words, sentence, video_url}
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef(null);

  // ---------------------------
  // 🎙 Setup SpeechRecognition
  // ---------------------------
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("SpeechRecognition not supported in this browser.");
      return;
    }

    // Create recognizer
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    // Language handling
    recognition.lang = lang === "en" ? "en-IN" : `${lang}-IN`;

    // When speech result is available
    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      transcript = transcript.trim();

      setLiveTranscript(transcript);
      setText(transcript); // sync text area with speech
    };

    // When mic stops automatically
    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [lang]);

  // ---------------------------
  // Auto START/STOP mic
  // ---------------------------
  useEffect(() => {
    const rec = recognitionRef.current;
    if (!rec) return;

    try {
      if (isListening) {
        rec.start();
      } else {
        rec.stop();
      }
    } catch (err) {
      console.error("SpeechRecognition err:", err);
    }
  }, [isListening]);

  // ---------------------------
  // Toggle Mic
  // ---------------------------
  const handleToggleMic = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    setIsListening((prev) => !prev);
  };

  // ---------------------------
  // 🚀 Call backend /api/text-to-sign
  // ---------------------------
   const { video, isLoadingVideo, getVideo } = useAPI();
  const handleTranslate = async () => {
    const trimmed = text.trim();
    setError("");
    setResult(null);

    if (!trimmed) {
      setError("Please type something or use the mic first.");
      return;
    }
    getVideo({ text: trimmed });


    if (!video) return; // ⛔ Wait until blob exists

    try {
      const url = URL.createObjectURL(video);
      setResult(url);
      console.log("Generated video URL:", url);
    } catch (err) {
      console.error("Error creating video url:", err);
    }

    
  };

 


    


  // setResult({
  //   video_url: videoURL,
  // });
  // ---------------------------
  // UI RENDER
  // ---------------------------
  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-[#05040a] via-[#05050c] to-[#03040a] text-white ${
        internalMode ? "pt-2" : "pt-5"
      }`}
    >
      <div
        className={`mx-auto pb-10 px-4 ${
          internalMode ? "max-w-[95%]" : "sm:max-w-[50vw]"
        }`}
      >
        {/* Header only in full screen */}
        {!internalMode && <Header />}

        {/* Page Title - skip in popup */}
        {!internalMode && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <h1 className="text-3xl font-semibold leading-tight">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Text → Sign Conversion
              </span>
            </h1>
            <p className="text-sm text-slate-400 mt-2">
              Convert text or speech into Sign Language video.
            </p>

            <div className="inline-flex mt-4 px-4 py-1.5 rounded-full bg-blue-700/40 text-[0.7rem] text-blue-100 border border-blue-500/60 shadow-[0_0_30px_rgba(59,130,246,0.4)]">
              Beta · Offline AI + Video Synthesis
            </div>
          </motion.div>
        )}

        {/* Input Card */}
        <InputCard
          lang={lang}
          setLang={setLang}
          langOptions={LANG_OPTIONS}
          text={text}
          setText={setText}
          liveTranscript={liveTranscript}
          isListening={isListening}
          onToggleMic={handleToggleMic}
          onTranslate={handleTranslate}
          loading={loading}
          error={error}
          internalMode={internalMode}
        />

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Generated Sign Video</h2>

          {
            <video
              src={result}
              loop
              autoPlay
              className="w-full max-h-[400px] rounded-lg border border-slate-700"
            />
          }
        </div>

        {/* Result */}
        <ResultSection result={result} internalMode={internalMode} />
      </div>
    </div>
  );
}
