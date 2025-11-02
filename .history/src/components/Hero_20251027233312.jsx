import React from 'react';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

export default function Hero({ data }) {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center space-y-8">
          <div className="inline-block">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full animate-spin-slow blur"></div>
              <img
                src={data.avatar}
                alt={data.name}
                className="relative w-full h-full rounded-full object-cover border-4 border-black"
              />
            </div>
          </div>

          <div>
            <p className="text-blue-400 font-medium mb-4 tracking-wider uppercase text-sm">
              {data.tagline}
            </p>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {data.name}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-6">{data.title}</p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">{data.bio}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:scale-105 transition-transform inline-flex items-center gap-2 group"
            >
              View My Work
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-white/20 rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              Get In Touch
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 pt-8">
            <a href={data.github} className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-blue-400 transition-all">
              <Github size={20} />
            </a>
            <a href={data.linkedin} className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-blue-400 transition-all">
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${data.email}`} className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-blue-400 transition-all">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
