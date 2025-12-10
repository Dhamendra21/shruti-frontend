// src/components/textToSign/MicButton.jsx
import { motion } from "framer-motion";

export default function MicButton({ isListening, onToggle }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileTap={{ scale: 0.9 }}
      className={`
        relative
        w-11 h-11
        rounded-full
        flex items-center justify-center
        text-white
        ${isListening ? "bg-[#A855FF]" : "bg-[#8b5cf6]"}
        shadow-[0_0_35px_rgba(168,85,247,0.8)]
      `}
    >
      {/* outer pulse while listening */}
      {isListening && (
        <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500/40 animate-ping" />
      )}

      {/* mic icon (simple) */}
      <span className="relative z-10 text-xl">🎤</span>
    </motion.button>
  );
}
