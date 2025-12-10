import { color, motion } from "framer-motion";
import { Hand, Brain, Sparkles, Award } from 'lucide-react';
import Header from "../livetranslate/Header";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#001f3f] via-[#003366] to-[#002244]">
    <Header  />
  
     {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      {/* Mandala pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, #FFB74D 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative z-10">
        {/* SIH Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="inline-block mb-4">
                <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"></div>
              </div>
              <h1 className="text-5xl md:text-6xl text-white mb-6 leading-tight">
                Shruti AI
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-4">
                Sign Hand Gesture Recognition Understanding 
Translation Interface
              </p>
              <p className="text-lg text-blue-200/80 max-w-xl">
                Empowering accessible communication through AI-powered sign language recognition and interactive learning for a more inclusive India.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105">
                Get Started
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-lg hover:bg-white/20 transition-all duration-300">
                Learn More
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10"
            >
              <div>
                <div className="text-3xl text-orange-400 mb-1">5000+</div>
                <div className="text-sm text-blue-200/70">Active Learners</div>
              </div>
              <div>
                <div className="text-3xl text-orange-400 mb-1">98%</div>
                <div className="text-sm text-blue-200/70">Accuracy</div>
              </div>
              <div>
                <div className="text-3xl text-orange-400 mb-1">24/7</div>
                <div className="text-sm text-blue-200/70">Availability</div>
              </div>
            </motion.div>
          </div>

          {/* Right 3D elements */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-2xl shadow-orange-500/40 flex items-center justify-center transform rotate-12"
              >
                <Hand className="w-16 h-16 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-2xl shadow-blue-500/40 flex items-center justify-center transform -rotate-12"
              >
                <Brain className="w-16 h-16 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="relative mx-auto w-48 h-48 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex items-center justify-center"
              >
                <Sparkles className="w-24 h-24 text-orange-300" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,50 C360,100 720,0 1440,50 L1440,100 L0,100 Z" fill="rgb(248, 250, 252)" />
        </svg>
      </div>
    </div>
  );
}
