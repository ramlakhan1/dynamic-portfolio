import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import LeetCodeDashboard from './components/LeetCodeDashboard';
import GitHubDashboard from './components/GitHubDashboard';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThankYouPopup from './components/ThankYouPopup';
import portfolioData from './data/portfolio.json';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'experience', 'leetcode', 'github', 'contact'];
      const scrollPosition = window.scrollY + 150;
      
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;
          
          return scrollPosition >= elementTop && scrollPosition < elementBottom;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar activeSection={activeSection} />
      <Hero data={portfolioData.personalInfo} />
      <Stats data={portfolioData.stats} />
      <Skills data={portfolioData.skills} />
      <Projects data={portfolioData.projects} />
      <Experience data={portfolioData.experience} />
      <LeetCodeDashboard />
      <GitHubDashboard />
      <Contact data={portfolioData.personalInfo} />
      <Footer data={portfolioData.personalInfo} />
      <ThankYouPopup />
    </div>
  );
}
