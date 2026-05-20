import React from 'react';
import NeuralCanvas from './components/ui/NeuralCanvas';
import GlowBlob from './components/ui/GlowBlob';
import Layout from './components/Layout';
import Hero from './components/Hero';
import About from './components/About';
import RAGTerminal from './components/RAGTerminal';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ResearchLogs from './components/ResearchLogs';
import Certifications from './components/Certifications';
import Contact from './components/Contact';

function App() {
  return (
    <div className="relative bg-[#030303] overflow-hidden min-h-screen">
      {/* Interactive Background Particle Network */}
      <NeuralCanvas />

      {/* Decorative Blur Glow Blobs */}
      <GlowBlob className="top-12 left-10 w-96 h-96" color="purple" delay={0} duration={12} />
      <GlowBlob className="top-1/3 right-12 w-80 h-80" color="blue" delay={2} duration={10} />
      <GlowBlob className="top-2/3 left-1/4 w-[500px] h-[500px]" color="indigo" delay={4} duration={15} />
      <GlowBlob className="bottom-10 right-10 w-96 h-96" color="emerald" delay={1} duration={8} />

      {/* Global Glassmorphism layout wrapper */}
      <Layout>
        {/* Core Sections */}
        <Hero />
        <About />
        <RAGTerminal />
        <Experience />
        <Skills />
        <Projects />
        <ResearchLogs />
        <Certifications />
        <Contact />
      </Layout>
    </div>
  );
}

export default App;
