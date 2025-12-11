import { motion } from "framer-motion";
import Header from "../livetranslate/Header";

export default function About() {
  return (
    <div className="mt-5 px-4 pb-10 max-w-[650px] mx-auto text-slate-800 dark:text-slate-200 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 min-h-screen">

<Header/>

      {/* HEADER TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-semibold mb-4 bg-gradient-to-r from-purpleAccent to-violet-400 bg-clip-text text-transparent"
      >
        About SHRUTI AI
      </motion.h1>

      {/* SUBTITLE */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-sm text-slate-600 dark:text-slate-400 mb-6"
      >
        Real-time Sign Gesture Translation System
      </motion.p>

      {/* INTRO CARD */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="
          bg-white/50 dark:bg-bgBox/50 border border-slate-200 dark:border-border1 backdrop-blur-xl 
          p-5 rounded-2xl shadow-soft
        "
      >
        <p className="text-[0.95rem] leading-relaxed">
          <span className="font-semibold text-purpleAccent">SHRUTI AI</span> 
          is an innovative real-time translation interface that converts 
          <span className="text-slate-100 font-semibold"> Indian Sign Language (ISL)</span> based hand gestures into 
          meaningful text and speech using AI vision and natural language processing.
        </p>

        <p className="mt-3 text-[0.9rem] leading-relaxed text-slate-700 dark:text-slate-300">
          The platform enables inclusive communication for people with speech or hearing disabilities, bridging the gap between 
          sign gestures and spoken languages like English, Hindi, Marathi, and Bengali.
        </p>
      </motion.div>


      {/* FEATURES */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-xl font-semibold mt-10 mb-3 text-slate-900 dark:text-white"
      >
        ✨ Core Features
      </motion.h2>

      <div className="space-y-4">

        <Feature
          title="Real-time Gesture Recognition"
          desc="Uses advanced deep learning models to identify Indian Sign Language hand gestures instantly."
        />
        <Feature
          title="Offline Text-to-Speech"
          desc="Speech is generated locally using the browser — no internet required."
        />
        <Feature
          title="Multilingual Translation"
          desc="Translate ISL gestures into English, Hindi, Marathi, Bengali and more."
        />
        <Feature
          title="WebRTC Camera Streaming"
          desc="On-device camera stream processed using secure WebRTC channels."
        />
        <Feature
          title="Accessible Interface"
          desc="Built for inclusivity with clean UI, big text, and responsive layout."
        />
      </div>


      {/* PHILOSOPHY SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="
          bg-white/60 dark:bg-bgBox/60 border border-slate-200 dark:border-border2 backdrop-blur-xl 
          p-5 mt-10 rounded-2xl
        "
      >
        <h2 className="text-xl font-semibold mb-2">🚀 Vision & Mission</h2>
        <p className="text-[0.9rem] leading-relaxed text-slate-300">
          The vision of SHRUTI AI is to make communication inclusive and remove language accessibility barriers for the deaf and speech-impaired community using AI and open technology.
        </p>
      </motion.div>


      {/* FUTURE ROADMAP */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="mt-10"
      >
        <h2 className="text-xl font-semibold mb-3">🛣️ Future Roadmap</h2>

        <ul className="text-[0.9rem] text-slate-300 space-y-2">
          <li>• Full 3D avatar-based sign output</li>
          <li>• Hindi → ISL reverse translation</li>
          <li>• Advanced continuous gesture recognition</li>
          <li>• Native Android application</li>
          <li>• Offline model running using WebGPU</li>
          <li>• Community-driven ISL dataset</li>
        </ul>
      </motion.div>


      {/* Creator section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="
          mt-12 bg-bgBox/40 border border-border1 backdrop-blur-xl
          p-5 rounded-2xl
        "
      >
        <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">👤 Created By</h2>
        <p className="text-[0.9rem] leading-relaxed text-slate-700 dark:text-slate-300">
          SHRUTI AI is independently developed by 
          <span className="font-semibold text-purpleAccent"> Dhamendra Sahu</span>, 
          a passionate developer working on AI, IoT, and accessible solutions.
        </p>

        <p className="mt-3 text-[0.9rem] text-slate-700 dark:text-slate-300">
          GitHub: <span className="text-purpleAccent">github.com/&lt;your-username&gt;</span>
        </p>
      </motion.div>

    </div>
  );
}


// SUB COMPONENT (animated feature)
function Feature({ title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="
        bg-white/60 dark:bg-bgText/60 border border-slate-200 dark:border-border2 
        backdrop-blur-lg px-4 py-3 
        rounded-xl
      "
    >
      <h3 className="text-[0.95rem] font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </h3>
      <p className="text-[0.85rem] text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}
