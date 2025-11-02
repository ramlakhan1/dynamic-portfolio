import React, { useState, useEffect, useRef } from 'react';

export default function Stats({ data }) {
  const [counters, setCounters] = useState(data.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const timers = data.map((stat, idx) => {
      const targetValue = parseInt(stat.value.replace(/\D/g, '')) || 0;
      const increment = targetValue / steps;
      let current = 0;

      return setInterval(() => {
        current += increment;
        if (current >= targetValue) {
          setCounters(prev => {
            const newCounters = [...prev];
            newCounters[idx] = targetValue;
            return newCounters;
          });
          clearInterval(timers[idx]);
        } else {
          setCounters(prev => {
            const newCounters = [...prev];
            newCounters[idx] = Math.floor(current);
            return newCounters;
          });
        }
      }, interval);
    });

    return () => timers.forEach(timer => clearInterval(timer));
  }, [isVisible, data]);

  return (
    <section ref={sectionRef} className="py-20 px-6 border-y border-white/10 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {data.map((stat, idx) => {
            const numericValue = parseInt(stat.value.replace(/\D/g, '')) || 0;
            const suffix = stat.value.replace(/\d/g, '');
            
            return (
              <div
                key={idx}
                className="text-center transform transition-all duration-500 hover:scale-110 group cursor-pointer"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${idx * 0.1}s`,
                }}
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:from-pink-400 group-hover:to-blue-400 transition-all">
                  {isVisible ? (counters[idx] || 0) + suffix : '0' + suffix}
                </div>
                <div className="text-gray-400 text-sm md:text-base group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </div>
                {/* Animated underline */}
                <div className="mt-2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 w-0 group-hover:w-full transition-all duration-300 mx-auto"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}