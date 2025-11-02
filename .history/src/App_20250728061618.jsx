import React, { useState } from 'react'
import './App.css'
import VideoPlayer from './VideoPlayer';
import YouTubeEmbed from './YouTubeEmbed';
import YouTubeSearchPlayer from './YouTubeSearchPlayer';

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  // Track which player is currently playing: 'custom', 'ytsearch', or null
  const [playing, setPlaying] = useState(null);

  // Close menu on link click (for mobile UX)
  const handleNavClick = () => setMenuOpen(false)

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <a href="#home">Portfolio</a>
          </div>
          <ul className={`nav-menu${menuOpen ? ' open' : ''}`}>
            <li className="nav-item">
              <a href="#home" className="nav-link" onClick={handleNavClick}>Home</a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link" onClick={handleNavClick}>About</a>
            </li>
            <li className="nav-item">
              <a href="#skills" className="nav-link" onClick={handleNavClick}>Skills</a>
            </li>
            <li className="nav-item">
              <a href="#projects" className="nav-link" onClick={handleNavClick}>Projects</a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link" onClick={handleNavClick}>Contact</a>
            </li>
          </ul>
          {/* Hamburger Icon */}
          <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero fade-in">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Your Name</span>
            </h1>
            <h2 className="hero-subtitle">Full Stack Developer</h2>
            <p className="hero-description">
              I create beautiful, functional, and user-centered digital experiences.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary scale-fade">View My Work</a>
              <a href="#contact" className="btn btn-secondary scale-fade">Get In Touch</a>
            </div>
          </div>
          <div className="hero-image fade-in">
            <div className="profile-placeholder">
              <span>👨‍💻</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about fade-in">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a passionate developer with a love for creating innovative solutions. 
                With expertise in modern web technologies, I build applications that are 
                not only functional but also provide exceptional user experiences.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, 
                contributing to open-source projects, or sharing knowledge with the 
                developer community.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat scale-fade">
                <h3>2+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat scale-fade">
                <h3>20+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat scale-fade">
                <h3>15+</h3>
                <p>Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills fade-in">
        <div className="container">
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="skills-grid">
            <div className="skill-category scale-fade">
              <h3>Frontend</h3>
              <div className="skill-items">
                <span className="skill-item">React</span>
                <span className="skill-item">JavaScript</span>
                <span className="skill-item">TypeScript</span>
                <span className="skill-item">HTML/CSS</span>
                <span className="skill-item">Tailwind CSS</span>
              </div>
            </div>
            <div className="skill-category scale-fade">
              <h3>Backend</h3>
              <div className="skill-items">
                <span className="skill-item">Node.js</span>
                <span className="skill-item">Express</span>
                <span className="skill-item">Python</span>
                <span className="skill-item">MongoDB</span>
                <span className="skill-item">PostgreSQL</span>
              </div>
            </div>
            <div className="skill-category scale-fade">
              <h3>Tools</h3>
              <div className="skill-items">
                <span className="skill-item">Git</span>
                <span className="skill-item">Docker</span>
                <span className="skill-item">AWS</span>
                <span className="skill-item">Figma</span>
                <span className="skill-item">VS Code</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects fade-in">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          {/* YouTube Search & Playlist */}
          <YouTubeSearchPlayer
            isPlaying={playing === 'ytsearch'}
            onPlay={() => setPlaying('ytsearch')}
            onPause={() => setPlaying(null)}
          />
          {/* Stylish Video Player Showcase */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: '#2563eb' }}>Demo Video</h3>
            <VideoPlayer
              isPlaying={playing === 'custom'}
              onPlay={() => setPlaying('custom')}
              onPause={() => setPlaying(null)}
            />
          </div>
          {/* YouTube Videos Grid */}
          <div className="youtube-embed-grid">
            <YouTubeEmbed videoId="dQw4w9WgXcQ" title="Project Walkthrough" />
            <YouTubeEmbed videoId="ysz5S6PUM-U" title="UI Animation Demo" />
            <YouTubeEmbed videoId="3fumBcKC6RE" title="Client Testimonial" />
          </div>
          <div className="projects-grid">
            <div className="project-card scale-fade">
              <div className="project-image">
                <div className="project-placeholder">📱</div>
              </div>
              <div className="project-content">
                <h3>E-Commerce Platform</h3>
                <p>A full-stack e-commerce solution with payment integration and admin dashboard.</p>
                <div className="project-tech">
                  <span>React</span>
                  <span>Node.js</span>
                  <span>MongoDB</span>
                </div>
                <div className="project-links">
                  <a href="#" className="project-link">Live Demo</a>
                  <a href="#" className="project-link">GitHub</a>
                </div>
              </div>
            </div>
            <div className="project-card scale-fade">
              <div className="project-image">
                <div className="project-placeholder">🎮</div>
              </div>
              <div className="project-content">
                <h3>Task Management App</h3>
                <p>A collaborative task management application with real-time updates.</p>
                <div className="project-tech">
                  <span>React</span>
                  <span>Firebase</span>
                  <span>Tailwind</span>
                </div>
                <div className="project-links">
                  <a href="#" className="project-link">Live Demo</a>
                  <a href="#" className="project-link">GitHub</a>
                </div>
              </div>
            </div>
            <div className="project-card scale-fade">
              <div className="project-image">
                <div className="project-placeholder">📊</div>
              </div>
              <div className="project-content">
                <h3>Data Visualization Dashboard</h3>
                <p>Interactive dashboard for data analysis and visualization.</p>
                <div className="project-tech">
                  <span>React</span>
                  <span>D3.js</span>
                  <span>Python</span>
                </div>
                <div className="project-links">
                  <a href="#" className="project-link">Live Demo</a>
                  <a href="#" className="project-link">GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact fade-in">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Let's work together!</h3>
              <p>I'm always interested in new opportunities and exciting projects.</p>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <span>your.email@example.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>Your City, Country</span>
                </div>
              </div>
            </div>
            <form className="contact-form">
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Subject" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary scale-fade">Send Message</button>
            </form>
            <a
              href="https://wa.me/919876543210?text=Hello%20I%20saw%20your%20portfolio%20and%20want%20to%20connect!"
              className="whatsapp-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span role="img" aria-label="WhatsApp">💬</span> Message me on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer fade-in">
        <div className="container">
          <p>&copy; 2024 Your Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
