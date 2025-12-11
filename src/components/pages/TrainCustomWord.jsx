import { useEffect, useRef, useState } from "react";
import { RefreshCcw, ArrowLeft, X } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../livetranslate/Header";
import api from "../../api";
import spinner from "../spinner.mp4";

export default function TrainSignPage() {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [recording, setRecording] = useState(false);
  const [facingMode, setFacingMode] = useState("user");
  const [text, setText] = useState("");
  const [uploading, setUploading] = useState(false)
  console.log(uploading);
  
  // ==============================
  // CAMERA INIT
  // ==============================
  useEffect(() => {
    let active = true;

    async function initCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
          audio: false,
        });

        if (!active) return;
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

    initCamera();

    return () => {
      active = false;
      stopCamera();
    };
  }, [facingMode]);

  function stopCamera() {
    if (!stream) return;
    stream.getTracks().forEach((t) => t.stop());
  }

  function toggleCamera() {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  }

  // ==============================
  // RECORD
  // ==============================
  function startRecording() {
    if (!text.trim()) {
      alert("Please enter a word or sentence");
      return;
    }

    setChunks([]);
    setRecording(true);

    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => setChunks((prev) => [...prev, e.data]);

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      uploadVideo(text.trim(), blob);
      setRecording(false);
    };

    recorder.start();
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
  }

  async function uploadVideo(name, blob) {
    const form = new FormData();
    form.append("video", blob, `${name}.webm`);
    setUploading(true)

    await api.post("/api/storeVideo", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setUploading(false)
    alert("Sign saved!");
  }

  // ==============================
  // UI DESIGN
  // ==============================
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-[#080709] dark:to-[#080709] text-slate-900 dark:text-white">
      <Header />
      {/* Top Bar */}

      <div className="max-w-lg mx-auto px-5 pt-8 pb-16">
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
        <div className="inline-flex text-xs items-center gap-1 px-4 py-1 rounded-full bg-purple-200 dark:bg-purple-700/30 text-purple-900 dark:text-purple-300 border border-purple-900/40 dark:border-purple-500/40 mb-4 shadow-sm">
          <span>●</span>
          CUSTOM DATASET · LOCAL LEARNING
        </div>

        {/* Subtitle */}
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Record your custom sign for a specific word or phrase. This data stays
          on your device to personalize your AI model.
        </p>

        {/* Input */}
        <label className="block text-sm mb-2 font-medium text-slate-900 dark:text-white">
          Word or Sentence
        </label>
        <input
          type="text"
          placeholder="Enter word or sentence..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-white/10 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500 transition mb-8 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />

        {/* Camera */}
        <div className="relative mb-8">
          <div
            className={`rounded-2xl overflow-hidden border ${
              recording ? "border-purple-500" : "border-white/10"
            }`}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full aspect-video object-cover scale-x-[-1]"
            />
          </div>

          {/* Flip Button */}
          <button
            onClick={toggleCamera}
            className="absolute right-3 top-3 bg-black/40 p-2 rounded-full backdrop-blur-md hover:bg-black/60"
          >
            <RefreshCcw size={18} />
          </button>

          {/* Stop Camera Button */}
          <button
            onClick={stopCamera}
            className="absolute left-3 top-3 bg-black/40 p-2 rounded-full backdrop-blur-md hover:bg-black/60"
          >
            <X size={18} />
          </button>

          {/* Hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 px-3 py-1 rounded-full text-xs backdrop-blur-md flex items-center gap-1">
            <span>ℹ️</span> Make sure your hands are visible
          </div>
        </div>

              
        {/* Buttons */}
        {!recording ? (
          <button
            onClick={startRecording}
            className="w-full mt-2 py-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm shadow-[0_0_20px_rgba(120,80,255,0.4)]"
          >
            ● Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="w-full mt-2 py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium text-sm"
          >
            ⏹ Stop & Save
          </button>
        )}

        {uploading ? (<video className="w-16 h-16 mt-4 mx-auto" src={spinner} autoPlay loop muted></video>):""}
        <p className="text-center text-[10px] mt-8 text-slate-500 dark:text-slate-500">
          POWERED BY SHRUTI AI ENGINE V2.0
        </p>
      </div>
    </div>
  );
}
