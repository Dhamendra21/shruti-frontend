// src/components/textToSign/InputCard.jsx
import { motion } from "framer-motion";
import MicButton from "./MicButton";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import useAPI from "../../store/useAPI";

export default function InputCard({
  lang,
  setLang,
  langOptions,
  text,
  setText,
  liveTranscript,
  isListening,
  onToggleMic,
  onTranslate,
  loading,
  error,
}) {
 const { isLoadingVideo} = useAPI();

  async function handleOnTranslate(){
    setLoading(true)
    await onTranslate()
    setLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mt-6"
    >
      {/* Input card */}
      <div className="rounded-3xl bg-[#0b0b15] border border-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.9)] px-4 py-4 mb-4">
        {/* top row: language + mic */}
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center rounded-full bg-black/60 px-3 py-1 text-xs text-slate-100 border border-white/5">
            <select
              className="bg-transparent outline-none text-xs"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              {langOptions.map((opt) => (
                <option
                  key={opt.code}
                  value={opt.code}
                  className="bg-[#05050a]"
                >
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <MicButton isListening={isListening} onToggle={onToggleMic} />
        </div>

        {/* textarea */}
        <textarea
          className="w-full bg-transparent border-none outline-none text-sm text-slate-100 placeholder:text-slate-600 min-h-[80px]"
          placeholder="Type your sentence or use mic..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <p className="mt-4 text-[0.72rem] text-slate-500">
          {isListening
            ? "Listening… speak clearly near your microphone."
            : liveTranscript
            ? `Live transcription: ${liveTranscript}`
            : "Live transcription appears here…"}
        </p>
      </div>

      {/* error */}
      {error && (
        <div className="mb-3 text-[0.72rem] text-red-300 bg-red-900/40 border border-red-700 rounded-xl px-3 py-2">
          {error}
        </div>
      )}

      {/* translate button */}
      <button
        type="button"
        onClick={onTranslate}
        className="
          w-full mt-1
          rounded-3xl
          bg-blue-600
          hover:bg-blue-500
          text-sm font-semibold
          py-3
          text-white
          flex 
          justify-center
          items-center
        
          disabled:opacity-60 disabled:cursor-not-allowed
          transition-all duration-300 ease-out
        "
      >
        {isLoadingVideo ? <Loader2Icon className="animate-spin" />:"Convert"}
      </button>
    </motion.div>
  );
}
