import React, { useState, useEffect, useRef } from 'react';

export default function Skills({ data }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 sm:py-32 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg">Technologies I work with</p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {data.map((skill, idx) => (
            <div
              key={idx}
              className="space-y-2 sm:space-y-3 transform transition-all duration-500 hover:scale-105 active:scale-[1.02] hover:translate-x-2 touch-manipulation"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${idx * 0.1}s`,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-base sm:text-lg font-medium group-hover:text-blue-400 transition-colors break-words pr-2">
                  {skill.name}
                </span>
                <span className="text-blue-400 font-bold tabular-nums text-sm sm:text-base flex-shrink-0">{skill.level}%</span>
              </div>
              <div className="h-2.5 sm:h-3 bg-white/5 rounded-full overflow-hidden relative group cursor-pointer">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                  style={{ 
                    width: isVisible ? `${skill.level}%` : '0%',
                    transitionDelay: `${idx * 0.1 + 0.3}s`
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-end pr-1 sm:pr-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}