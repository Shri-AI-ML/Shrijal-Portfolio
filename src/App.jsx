import React, { Suspense, lazy } from 'react';
import NeuralCanvas from './components/ui/NeuralCanvas';
import GlowBlob from './components/ui/GlowBlob';
import Layout from './components/Layout';
import Hero from './components/Hero';
import About from './components/About';

// Lazy loaded components below the fold for performance/SEO optimization
const RAGTerminal = lazy(() => import('./components/RAGTerminal'));
const Experience = lazy(() => import('./components/Experience'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const ResearchLogs = lazy(() => import('./components/ResearchLogs'));
const Certifications = lazy(() => import('./components/Certifications'));
const Contact = lazy(() => import('./components/Contact'));

// Premium terminal-style fallback loader matching design system
const ModuleLoader = () => (
  <div className="py-20 flex flex-col items-center justify-center min-h-[200px]">
    <div className="flex flex-col items-center gap-3 font-mono text-zinc-500 text-xs">
      <div className="h-5 w-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      <span>INITIALIZING MODULE BUFFER...</span>
    </div>
  </div>
);

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
        {/* Above-the-fold content loaded instantly */}
        <Hero />
        <About />

        {/* Below-the-fold content loaded lazily */}
        <Suspense fallback={<ModuleLoader />}>
          <RAGTerminal />
          <Experience />
          <Skills />
          <Projects />
          <ResearchLogs />
          <Certifications />
          <Contact />
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;

