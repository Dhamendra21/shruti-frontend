import { useState, useEffect } from "react";

export default function TTSControl({ ttsOn, toggleTTS, activeLang, onChangeLang }) {
  const [voices, setVoices] = useState([]);

  // Load available voices for offline speech
  useEffect(() => {
    function loadVoices() {
      const vs = window.speechSynthesis.getVoices();
      if (vs.length > 0) setVoices(vs);
    }

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  return (
    <section
      className="
        mt-4
        rounded-3xl
        bg-bgBox
        border border-border1
        px-4 py-3
        flex flex-col gap-3
      "
    >
      {/* Header Row */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-100 flex items-center gap-2">
            <span className="text-lg">🔊</span>
            Text-to-Speech (Offline)
          </p>
          <p className="text-[0.75rem] text-slate-400 mt-0.5">
            Speak translated text directly using browser voice.
          </p>
        </div>

        {/* Toggle Switch */}
        <button
          type="button"
          onClick={toggleTTS}
          className="relative inline-flex items-center cursor-pointer"
        >
          <div
            className={`
              w-11 h-6
              rounded-full
              transition
              ${ttsOn ? "bg-purpleAccent/90" : "bg-slate-600"}
            `}
          />
          <div
            className={`
              absolute
              w-5 h-5
              bg-white
              rounded-full
              top-0.5
              transform
              transition
              ${ttsOn ? "translate-x-[22px]" : "translate-x-[3px]"}
            `}
          />
        </button>
      </div>

      {/* Language Selector (Only visible when ON) */}
      {ttsOn && (
        <div className="flex items-center justify-between">
          <label className="text-[0.75rem] text-slate-300">
            Output language
          </label>

          <select
            className="
              bg-bgBox
              border border-border2
              text-slate-200
              rounded-lg
              text-sm
              px-2 py-1
            "
            value={activeLang}
            onChange={(e) => {
              onChangeLang(e.target.value);
            }}
          >
            <option value="en-IN">English</option>
            <option value="hi-IN">हिंदी</option>
            <option value="mr-IN">मराठी</option>
            <option value="bn-IN">বাংলা</option>
          </select>
        </div>
      )}
    </section>
  );
}
