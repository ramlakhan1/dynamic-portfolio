import React, { useState, useEffect, useRef } from 'react';
import { Code2, ExternalLink, Github, Star } from 'lucide-react';

export default function Projects({ data }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 sm:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg">Some of my best work</p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {data.map((project, idx) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-white/20 active:border-white/30 transition-all duration-500 overflow-hidden cursor-pointer transform hover:scale-105 active:scale-[1.02] hover:-translate-y-2 touch-manipulation"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${idx * 0.1}s`,
              }}
            >
              {/* Animated Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-50 blur transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}>
                    <Code2 size={20} className="sm:w-6 sm:h-6 group-hover:rotate-[-12deg] transition-transform" />
                  </div>
                  {project.featured && (
                    <div className="flex items-center gap-1 text-yellow-400 text-xs sm:text-sm">
                      <Star size={14} className="sm:w-4 sm:h-4 fill-current animate-pulse" />
                      <span className="hidden sm:inline">Featured</span>
                    </div>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 group-hover:text-gray-300 transition-colors">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {project.tech.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="px-2 sm:px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 group-hover:bg-white/10 group-hover:text-blue-400 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-white/10 group-hover:border-blue-400/50 transition-colors">
                  <a
                    href={project.link}
                    onClick={(e) => e.stopPropagation()}
                    className="text-blue-400 hover:text-blue-300 active:text-blue-200 transition-all text-xs sm:text-sm flex items-center gap-1 group/link hover:gap-2 touch-manipulation"
                  >
                    <ExternalLink size={14} className="sm:w-4 sm:h-4 group-hover/link:rotate-[-45deg] transition-transform" />
                    Demo
                  </a>
                  <a
                    href={project.github}
                    onClick={(e) => e.stopPropagation()}
                    className="text-gray-400 hover:text-gray-300 active:text-gray-200 transition-all text-xs sm:text-sm flex items-center gap-1 group/link hover:gap-2 touch-manipulation"
                  >
                    <Github size={14} className="sm:w-4 sm:h-4 group-hover/link:rotate-12 transition-transform" />
                    Code
                  </a>
                </div>
              </div>

              {/* Hover Overlay Effect */}
              {hoveredIndex === idx && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}