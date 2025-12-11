import { useEffect, useRef, useState } from "react";
import { RefreshCcw, ArrowLeft, Play } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../livetranslate/Header";

export default function TrainCustomSignPage() {
  const videoRef = useRef(null);
  const previewRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [recording, setRecording] = useState(false);
  const [facingMode, setFacingMode] = useState("user");
  const [text, setText] = useState("");

  const [progress, setProgress] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState(null);

  const timerRef = useRef(null);

  // ==============================
  // START CAMERA MANUALLY
  // ==============================
  async function startCamera() {
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      });

      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        await videoRef.current.play().catch(() => {});
      }
    } catch (err) {
      console.error("Camera Error:", err);
      alert("Camera permission denied");
    }
  }

  function stopCamera() {
    if (!stream) return;
    stream.getTracks().forEach((t) => t.stop());
    setStream(null);
  }

  function toggleCamera() {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
    stopCamera();
    startCamera();
  }

  // ==============================
  // 60-SECOND RECORDING + PROGRESS BAR
  // ==============================
  function startRecording() {
    if (!text.trim()) {
      alert("Please enter a word or sentence");
      return;
    }
    if (!stream) {
      alert("Start the camera first!");
      return;
    }

    setChunks([]);
    setRecording(true);
    setSeconds(0);
    setProgress(0);
    setRecordedBlob(null);

    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => setChunks((prev) => [...prev, e.data]);

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      setRecordedBlob(blob);
      setRecording(false);
      clearInterval(timerRef.current);
    };

    recorder.start();

    // TIMER
    timerRef.current = setInterval(() => {
      setSeconds((prev) => {
        const newSec = prev + 1;
        setProgress(newSec / 60);

        // AUTO STOP AT 60 SEC
        if (newSec >= 60) {
          stopRecording();
        }
        return newSec;
      });
    }, 1000);
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    clearInterval(timerRef.current);
  }

  function replayVideo() {
    if (previewRef.current && recordedBlob) {
      previewRef.current.src = URL.createObjectURL(recordedBlob);
      previewRef.current.play();
    }
  }

  function retake() {
    setRecordedBlob(null);
    setProgress(0);
    setSeconds(0);
    startCamera();
  }

  // ==============================
  // UI
  // ==============================
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-[#080709] dark:to-[#080709] text-slate-900 dark:text-white">
      {/* Top Bar */}

      <div className="max-w-lg mx-auto px-5 pt-8 pb-16">
      <Header/>
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white"
        >
          Train a New Sign
        </motion.h1>

        {/* Badge */}
        <div className="inline-flex text-xs items-center gap-1 px-4 py-1 rounded-full bg-purple-200 dark:bg-purple-700/30 text-purple-900 dark:text-purple-300 border border-purple-400 dark:border-purple-500/40 mb-4 shadow-sm">
          <span>●</span>
          CUSTOM DATASET · LOCAL LEARNING
        </div>

        {/* Input */}
        <label className="block text-sm mb-2 font-medium text-slate-900 dark:text-white">Word or Sentence</label>
        <input
          type="text"
          placeholder="Enter word or sentence..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-white/10 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 transition mb-8 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
        />

        {/* CAMERA SECTION */}
        <div className="relative mb-6">
          <div className="rounded-2xl overflow-hidden border border-slate-300 dark:border-white/10">
            {!recordedBlob ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full aspect-video object-cover bg-black"
              />
            ) : (
              <video
                ref={previewRef}
                className="w-full aspect-video object-cover bg-black"
                controls
              />
            )}
          </div>

          {/* Flip */}
          {!recordedBlob && (
            <button
              onClick={toggleCamera}
              className="absolute right-3 top-3 bg-black/40 p-2 rounded-full backdrop-blur-md hover:bg-black/60"
            >
              <RefreshCcw size={18} />
            </button>
          )}
        </div>

        {/* PROGRESS BAR */}
        {recording && (
          <div className="w-full mb-4">
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
              <span>00:{String(seconds).padStart(2, "0")}</span>
              <span>60s</span>
            </div>
            <div className="h-2 bg-slate-300 dark:bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all"
                style={{ width: `${progress * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* BUTTONS */}
        {/* CAMERA CONTROL */}
        {!stream && !recordedBlob && (
          <button
            onClick={startCamera}
            className="w-full py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium mt-4"
          >
            Start Camera
          </button>
        )}

        {stream && !recording && !recordedBlob && (
          <button
            onClick={stopCamera}
            className="w-full py-4 mb-4 rounded-full bg-gray-600 hover:bg-gray-700 text-white font-medium"
          >
            Stop Camera
          </button>
        )}

        {/* RECORD BUTTON */}
        {!recording && stream && !recordedBlob && (
          <button
            onClick={startRecording}
            className="w-full py-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-lg"
          >
            ● Start Recording (60s)
          </button>
        )}

        {/* STOP RECORD */}
        {recording && (
          <button
            onClick={stopRecording}
            className="w-full py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium"
          >
            ⏹ Stop Recording
          </button>
        )}

        {/* AFTER RECORDING OPTIONS */}
        {recordedBlob && (
          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={replayVideo}
              className="w-full py-4 rounded-full bg-blue-600 text-white"
            >
              ▶ Replay
            </button>

            <button
              onClick={retake}
              className="w-full py-4 rounded-full bg-gray-700 text-white"
            >
              🔁 Retake
            </button>
          </div>
        )}

        {/* FOOTER */}
        <p className="text-center text-[10px] mt-8 text-slate-500 dark:text-slate-500">
          POWERED BY SHRUTI AI ENGINE V2.0
        </p>
      </div>
    </div>
  );
}
