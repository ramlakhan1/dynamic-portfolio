import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Calendar, Building2, Sparkles, ArrowRight } from 'lucide-react';

export default function Experience({ data }) {
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef(null);

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

  if (!data || data.length === 0) {
    return (
      <section id="experience" ref={sectionRef} className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Work Experience
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg">No experience data available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" ref={sectionRef} className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
      <div className="absolute top-1/2 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Briefcase className="text-blue-400 w-8 h-8 sm:w-10 sm:h-10" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Work Experience
              </span>
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 px-4">My professional journey and achievements</p>
          <div className="flex justify-center mt-3 sm:mt-4">
            <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30"></div>

          <div className="space-y-8 sm:space-y-12">
            {data.map((job, idx) => (
              <div
                key={idx}
                className="relative group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${idx * 0.1}s`,
                  transition: 'all 0.6s ease-out',
                }}
              >
                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-0 top-6 items-center justify-center">
                  <div className="relative z-20 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    <Building2 className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full animate-ping opacity-20"></div>
                  </div>
                </div>

                {/* Content Card */}
                <div className="md:ml-16 lg:ml-24 relative">
                  {/* Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-500"></div>
                  
                  {/* Main Card */}
                  <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/0 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm group-hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 active:scale-[0.98] touch-manipulation">
                    {/* Decorative Elements */}
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                      <Sparkles className="text-purple-400 animate-pulse w-5 h-5 sm:w-6 sm:h-6" />
                    </div>

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2">
                          <div className="md:hidden w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Briefcase className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                              {job.role || 'Role not specified'}
                            </h3>
                            <div className="flex items-center gap-2 text-blue-400 font-semibold text-base sm:text-lg">
                              <Building2 size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                              <span className="group-hover:text-purple-400 transition-colors break-words">
                                {job.company || 'Company not specified'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Period Badge */}
                      <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300 w-fit">
                        <Calendar size={14} className="sm:w-5 sm:h-5 text-blue-400 group-hover:text-pink-400 transition-colors flex-shrink-0" />
                        <span className="text-gray-300 font-medium text-xs sm:text-sm md:text-base whitespace-nowrap">
                          {job.period || 'Period not specified'}
                        </span>
                      </div>
                    </div>

                    {/* Highlights */}
                    {job.highlights && job.highlights.length > 0 && (
                      <div className="space-y-2 sm:space-y-3 pt-4 sm:pt-6 border-t border-white/10 group-hover:border-white/20 transition-colors">
                        <h4 className="text-gray-400 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
                          Key Achievements
                        </h4>
                        <ul className="space-y-2 sm:space-y-3">
                          {job.highlights.map((highlight, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 sm:gap-3 group/item"
                            >
                              <div className="flex-shrink-0 mt-1 sm:mt-1.5">
                                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-300">
                                  <ArrowRight size={10} className="sm:w-3 sm:h-3 text-white" />
                                </div>
                              </div>
                              <span className="text-gray-300 group-hover/item:text-gray-100 text-sm sm:text-base leading-relaxed flex-1 transition-colors">
                                {highlight}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}