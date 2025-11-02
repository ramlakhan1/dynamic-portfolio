import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Calendar, Building2, Sparkles, ArrowRight } from 'lucide-react';

export default function Experience({ data }) {
  const [isVisible, setIsVisible] = useState(true); // Start visible
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
      <section id="experience" ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Work Experience
              </span>
            </h2>
            <p className="text-gray-400 text-lg">No experience data available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <Briefcase className="text-blue-400" size={40} />
            <h2 className="text-5xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Work Experience
              </span>
            </h2>
          </div>
          <p className="text-xl text-gray-400">My professional journey and achievements</p>
          <div className="flex justify-center mt-4">
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line - Hidden on mobile, shown on larger screens */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30"></div>

          <div className="space-y-12">
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
                  <div className="relative z-20 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    <Building2 className="text-white" size={24} />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full animate-ping opacity-20"></div>
                  </div>
                </div>

                {/* Content Card */}
                <div className="md:ml-24 relative">
                  {/* Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-500"></div>
                  
                  {/* Main Card */}
                  <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/0 border border-white/10 rounded-2xl p-8 backdrop-blur-sm group-hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                      <Sparkles className="text-purple-400 animate-pulse" size={24} />
                    </div>

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="md:hidden w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Briefcase className="text-white" size={20} />
                          </div>
                          <div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-1 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                              {job.role || 'Role not specified'}
                            </h3>
                            <div className="flex items-center gap-2 text-blue-400 font-semibold text-lg">
                              <Building2 size={18} />
                              <span className="group-hover:text-purple-400 transition-colors">
                                {job.company || 'Company not specified'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Period Badge */}
                      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                        <Calendar size={18} className="text-blue-400 group-hover:text-pink-400 transition-colors" />
                        <span className="text-gray-300 font-medium text-sm md:text-base whitespace-nowrap">
                          {job.period || 'Period not specified'}
                        </span>
                      </div>
                    </div>

                    {/* Highlights */}
                    {job.highlights && job.highlights.length > 0 && (
                      <div className="space-y-3 pt-6 border-t border-white/10 group-hover:border-white/20 transition-colors">
                        <h4 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">
                          Key Achievements
                        </h4>
                        <ul className="space-y-3">
                          {job.highlights.map((highlight, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 group/item"
                              style={{
                                opacity: 1,
                                transition: 'all 0.3s ease-out',
                              }}
                            >
                              <div className="flex-shrink-0 mt-1.5">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-300">
                                  <ArrowRight size={12} className="text-white" />
                                </div>
                              </div>
                              <span className="text-gray-300 group-hover/item:text-gray-100 text-base leading-relaxed flex-1 transition-colors">
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

          {/* Decorative Arrow at Bottom */}
          <div className="hidden md:flex justify-center mt-12">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center animate-bounce">
              <ArrowRight size={20} className="text-white rotate-90" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}