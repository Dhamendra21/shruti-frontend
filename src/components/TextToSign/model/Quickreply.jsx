import { motion, AnimatePresence } from "framer-motion";

export default function QuickReplyModal({ children, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed mt-50 inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-[95%] max-w-2xl rounded-3xl bg-[#0d0d14] border border-white/10 p-4"
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 40 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
        >
          <button
            onClick={onClose}
            className="absolute bottom-[95vh] right-4 bg-white/10 hover:bg-white/20
                       w-8 h-8 rounded-full flex items-center justify-center text-white"
          >
            ✕
          </button>

          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
