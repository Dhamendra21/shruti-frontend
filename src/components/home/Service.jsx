import { motion } from "framer-motion";
import { MessageSquare, Volume2, Hand, BookOpen, Sparkles, Languages } from 'lucide-react';

const services = [
  {
    icon: MessageSquare,
    title: 'Text to Sign Language',
    description: 'Convert written text into Indian Sign Language gestures with AI-powered real-time translation.',
    color: 'from-blue-500 to-blue-600',
    features: ['Real-time conversion', 'Multiple languages', 'HD gesture display']
  },
  {
    icon: Volume2,
    title: 'Audio to Sign Language',
    description: 'Transform speech and audio into accurate sign language representations instantly.',
    color: 'from-orange-500 to-orange-600',
    features: ['Voice recognition', 'Live transcription', 'Natural gestures']
  },
  {
    icon: BookOpen,
    title: 'Learn Sign Language',
    description: 'Interactive learning modules for letters, numbers, words, and complete conversations.',
    color: 'from-green-500 to-green-600',
    features: ['Interactive lessons', 'Progress tracking', 'Certification']
  }
];

export function Services() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full mx-auto"></div>
          </div>
          <h2 className="text-4xl md:text-5xl text-[#001f3f] mb-4">
            Our Services
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Comprehensive AI-powered solutions for Indian Sign Language communication
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className={`relative w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl text-[#001f3f] mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-500">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Decorative element */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="w-6 h-6 text-orange-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive learning preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-br from-[#001f3f] to-[#003366] rounded-3xl p-10 md:p-12 overflow-hidden relative"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, #FFB74D 20px, #FFB74D 21px)`
          }}></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 rounded-full px-4 py-2 text-orange-300 mb-4">
                <Languages className="w-4 h-4" />
                <span className="text-sm">Interactive Learning</span>
              </div>
              <h3 className="text-3xl md:text-4xl text-white mb-4">
                Master Indian Sign Language
              </h3>
              <p className="text-blue-100 mb-6">
                Learn alphabets, numbers, common words, and conversational phrases through our structured curriculum designed for all skill levels.
              </p>
              <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-300">
                Start Learning Today
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {['A', 'B', 'C'].map((letter, i) => (
                <motion.div
                  key={letter}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 flex flex-col items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <Hand className="w-12 h-12 text-orange-400 mb-2" />
                  <span className="text-2xl text-white">{letter}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
