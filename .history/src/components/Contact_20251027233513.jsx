import React from 'react';
import { Mail, Linkedin } from 'lucide-react';

export default function Contact({ data }) {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Let's Build Something Amazing
          </span>
        </h2>
        <p className="text-xl text-gray-400 mb-12">
          I'm always excited to work on new projects and collaborate with talented people.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href={`mailto:${data.email}`}
            className="px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-lg hover:scale-105 transition-transform inline-flex items-center justify-center gap-2"
          >
            <Mail size={24} />
            Send Email
          </a>
          <a
            href={data.linkedin}
            className="px-10 py-5 border-2 border-white/20 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
          >
            <Linkedin size={24} />
            Connect
          </a>
        </div>
      </div>
    </section>
  );
}
