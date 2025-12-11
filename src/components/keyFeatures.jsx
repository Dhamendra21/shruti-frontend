import { motion } from "framer-motion";
import { Shield, Zap, Users, Globe, Award, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Government-grade security standards for all user data'
  },
  {
    icon: Zap,
    title: 'Real-time Processing',
    description: 'Instant AI-powered translation and recognition'
  },
  {
    icon: Users,
    title: 'Accessible Design',
    description: 'WCAG 2.1 AA compliant for universal access'
  },
  {
    icon: Globe,
    title: 'Multi-platform',
    description: 'Works seamlessly across all devices'
  },
  {
    icon: Award,
    title: 'Certified Content',
    description: 'Verified by Indian Sign Language experts'
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Detailed analytics and learning insights'
  }
];

export function Features() {
  return (
    <section className="py-20 px-6 bg-white dark:bg-slate-900">
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
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mx-auto"></div>
          </div>
          <h2 className="text-4xl md:text-5xl text-slate-900 dark:text-white mb-4">
            Key Features
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Built with cutting-edge technology and accessibility at the core
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-400 hover:shadow-xl transition-all duration-300">
                {/* Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {feature.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-100 dark:from-orange-900/40 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
