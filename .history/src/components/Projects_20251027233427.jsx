import React from 'react';
import { Code2, ExternalLink, Github, Star } from 'lucide-react';

export default function Projects({ data }) {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Some of my best work</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((project) => (
            <div
              key={project.id}
              className="group relative bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                    <Code2 size={24} />
                  </div>
                  {project.featured && (
                    <div className="flex items-center gap-1 text-yellow-400 text-sm">
                      <Star size={16} fill="currentColor" />
                      <span>Featured</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <a href={project.link} className="text-blue-400 hover:text-blue-300 transition-colors text-sm flex items-center gap-1">
                    <ExternalLink size={16} />
                    Demo
                  </a>
                  <a href={project.github} className="text-gray-400 hover:text-gray-300 transition-colors text-sm flex items-center gap-1">
                    <Github size={16} />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}