import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

export default function Hero({ data }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const fullText = data.tagline || 'Welcome';

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
        ></div>
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/50 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center space-y-8 animate-fadeInUp">
          <div className="inline-block">
            <div className="relative w-32 h-32 mx-auto mb-6 group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full animate-spin-slow blur group-hover:blur-md transition-all"></div>
              <img
                src={data.avatar}
                alt={data.name}
                className="relative w-full h-full rounded-full object-cover border-4 border-black group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 rounded-full border-2 border-blue-400/50 animate-ping opacity-0 group-hover:opacity-100"></div>
            </div>
          </div>

          <div>
            <p className="text-blue-400 font-medium mb-4 tracking-wider uppercase text-sm h-6">
              {typedText}<span className="animate-blink">|</span>
            </p>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                {data.name.split('').map((char, i) => (
                  <span
                    key={i}
                    className="inline-block hover:scale-110 hover:rotate-12 transition-transform duration-300"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-6 animate-slideUp" style={{ animationDelay: '0.3s' }}>
              {data.title}
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 animate-slideUp" style={{ animationDelay: '0.5s' }}>
              {data.bio}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 animate-slideUp" style={{ animationDelay: '0.7s' }}>
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 inline-flex items-center gap-2 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-white/20 rounded-full font-semibold hover:bg-white/10 hover:border-blue-400 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 scale-0 group-hover:scale-100 transition-transform origin-left"></div>
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 pt-8 animate-slideUp" style={{ animationDelay: '0.9s' }}>
            {[
              { icon: Github, href: data.github, color: 'hover:text-gray-300' },
              { icon: Linkedin, href: data.linkedin, color: 'hover:text-blue-400' },
              { icon: Mail, href: `mailto:${data.email}`, color: 'hover:text-red-400' },
            ].map(({ icon: Icon, href, color }, idx) => (
              <a
                key={idx}
                href={href}
                className={`w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-blue-400 hover:scale-125 hover:-translate-y-1 transition-all duration-300 group ${color}`}
              >
                <Icon size={20} className="group-hover:rotate-12 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
