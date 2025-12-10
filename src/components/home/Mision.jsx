import { motion } from "framer-motion";
import { Target, Eye, Heart, Users } from 'lucide-react';

export function Mission() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Decorative mandala pattern */}
      <div className="absolute top-10 right-10 w-64 h-64 opacity-[0.03]">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#FF9933" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#FF9933" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="#FF9933" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="#FF9933" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl text-[#001f3f] mb-2">Our Mission</h3>
                  <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"></div>
                </div>
              </div>
              <p className="text-lg text-slate-700 leading-relaxed">
                To bridge communication barriers and empower the deaf and hard-of-hearing community in India through accessible, AI-powered Indian Sign Language technology that enables inclusive participation in education, employment, and society.
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl text-[#001f3f] mb-2">Our Vision</h3>
                  <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"></div>
                </div>
              </div>
              <p className="text-lg text-slate-700 leading-relaxed">
                To create a digitally inclusive India where every citizen, regardless of hearing ability, can seamlessly communicate and access government services, education, and opportunities through universal sign language integration.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Impact section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-[#001f3f] to-[#003366] rounded-3xl p-10 md:p-12 relative overflow-hidden"
        >
          {/* Gold separator line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>

          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl text-white mb-4">
              Creating Inclusive Digital India
            </h3>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto">
              Aligned with Digital India and Accessible India initiatives, Shruti AI contributes to building an equitable society
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: 'Social Impact', value: '5M+', subtitle: 'People Impacted' },
              { icon: Users, title: 'Community Growth', value: '100+', subtitle: 'Partner Organizations' },
              { icon: Target, title: 'National Reach', value: '28', subtitle: 'States Covered' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-orange-400" />
                </div>
                <div className="text-4xl text-orange-400 mb-1">{stat.value}</div>
                <div className="text-white mb-1">{stat.title}</div>
                <div className="text-sm text-blue-200/70">{stat.subtitle}</div>
              </motion.div>
            ))}
          </div>

          {/* Decorative bottom element */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/10 to-transparent"></div>
        </motion.div>

        {/* Government alignment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-6 py-3">
            <span className="text-sm text-slate-700">Supporting:</span>
            <span className="text-sm text-[#001f3f]">Digital India</span>
            <span className="text-slate-300">•</span>
            <span className="text-sm text-[#001f3f]">Accessible India Campaign</span>
            <span className="text-slate-300">•</span>
            <span className="text-sm text-[#001f3f]">Skill India</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
