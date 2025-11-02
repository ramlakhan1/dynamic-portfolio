import React from 'react';

export default function Experience({ data }) {
  return (
    <section id="experience" className="py-32 px-6 bg-gradient-to-b from-white/0 via-white/5 to-white/0">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>
          <p className="text-gray-400 text-lg">My professional journey</p>
        </div>

        <div className="space-y-8">
          {data.map((job, idx) => (
            <div key={idx} className="relative pl-8 pb-8 border-l-2 border-white/10 last:pb-0">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{job.role}</h3>yyyyy
                    <p className="text-blue-400 font-medium">{job.company}</p>
                  </div>
                  <span className="text-gray-400 text-sm mt-2 md:mt-0">{job.period}</span>
                </div>
                <ul className="space-y-2">
                  {job.highlights.map((highlight, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2">
                      <span className="text-blue-400 mt-1.5">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}