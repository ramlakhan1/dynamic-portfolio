import React from 'react';
import { Mail, Linkedin, Phone } from 'lucide-react';

export default function Contact({ data }) {
  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-purple-500/5 to-white/0"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Let's Build Something Amazing
          </span>
        </h2>
        <p className="text-xl text-gray-400 mb-12">
          I'm always excited to work on new projects and collaborate with talented people.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
          <a
            href={`mailto:${data.email}`}
            className="px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-lg hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 inline-flex items-center justify-center gap-2 group"
          >
            <Mail size={24} className="group-hover:rotate-12 transition-transform" />
            Send Email
          </a>
          <a
            href={data.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-5 border-2 border-white/20 rounded-full font-semibold text-lg hover:bg-white/10 hover:border-blue-400 hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 group"
          >
            <Linkedin size={24} className="group-hover:rotate-12 transition-transform" />
            Connect
          </a>
        </div>
        
        {/* Phone Number Display */}
        {data.phone && (
          <div className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-4 w-fit mx-auto hover:bg-white/10 hover:border-green-400/50 transition-all duration-300 group">
            <Phone className="text-green-400 group-hover:scale-110 transition-transform" size={24} />
            <a
              href={`tel:+91${data.phone}`}
              className="text-xl font-semibold text-gray-200 hover:text-green-400 transition-colors"
            >
              +91 {data.phone}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
