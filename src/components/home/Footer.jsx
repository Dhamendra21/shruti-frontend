import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#001f3f] to-[#002244] text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div className="md:col-span-2">
            <h3 className="text-2xl mb-4">Shruti AI</h3>
            <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full mb-4"></div>
            <p className="text-blue-100/80 mb-6 max-w-md">
              An innovative Indian Sign Language platform leveraging AI to create accessible communication solutions for the deaf and hard-of-hearing community across India.
            </p>
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 rounded-lg px-4 py-2 text-orange-300 text-sm">
              Developed for Smart India Hackathon 2024
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-4">Quick Links</h4>
            <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full mb-4"></div>
            <ul className="space-y-3">
              {['About Us', 'Services', 'Learning Platform', 'Documentation', 'FAQs', 'Support'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-blue-100/70 hover:text-orange-400 transition-colors duration-200 flex items-center gap-2 group">
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg mb-4">Contact</h4>
            <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full mb-4"></div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-blue-100/70">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-400" />
                <span className="text-sm">support@shrutiai.gov.in</span>
              </li>
              <li className="flex items-start gap-3 text-blue-100/70">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-400" />
                <span className="text-sm">1800-XXX-XXXX (Toll Free)</span>
              </li>
              <li className="flex items-start gap-3 text-blue-100/70">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-400" />
                <span className="text-sm">Ministry of Electronics & IT, New Delhi</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider with gold accent */}
        <div className="h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent mb-8"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-blue-100/60 text-sm text-center md:text-left">
            <p>© 2024 Shruti AI. All rights reserved.</p>
            <p className="mt-1">A Government of India Initiative</p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Github, label: 'GitHub' },
              { icon: Linkedin, label: 'LinkedIn' },
              { icon: Twitter, label: 'Twitter' }
            ].map((social) => (
              <motion.a
                key={social.label}
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-white/10 hover:bg-orange-500 border border-white/20 rounded-lg flex items-center justify-center transition-colors duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Government links */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a href="#" className="text-blue-100/70 hover:text-orange-400 transition-colors duration-200 flex items-center gap-1">
              India.gov.in
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-blue-100/30">•</span>
            <a href="#" className="text-blue-100/70 hover:text-orange-400 transition-colors duration-200 flex items-center gap-1">
              MyGov
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-blue-100/30">•</span>
            <a href="#" className="text-blue-100/70 hover:text-orange-400 transition-colors duration-200 flex items-center gap-1">
              Digital India
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-black/20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-blue-100/50">
            <a href="#" className="hover:text-orange-400 transition-colors duration-200">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-orange-400 transition-colors duration-200">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-orange-400 transition-colors duration-200">Accessibility Statement</a>
            <span>•</span>
            <a href="#" className="hover:text-orange-400 transition-colors duration-200">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
