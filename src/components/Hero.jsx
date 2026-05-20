import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ArrowRight, Sparkles, FileDown, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

const Hero = () => {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const headlines = [
    "Building Real-World AI Systems",
    "Optimizing Retrieval-Augmented Generation (RAG)",
    "Training Explainable Machine Learning Models",
    "Engineering LLM-Integrated FastAPI Backends"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#8b5cf6', '#6366f1', '#3b82f6']
    });
  };

  const handleTerminalScroll = () => {
    const term = document.getElementById('terminal');
    if (term) {
      term.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProjectsScroll = () => {
    const proj = document.getElementById('projects');
    if (proj) {
      proj.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-[85vh] flex flex-col justify-center items-center relative py-12 md:py-24 text-center">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500/5 filter blur-[100px] pointer-events-none" />

      {/* Floating Sparkle Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 border border-purple-500/20 bg-purple-950/10 rounded-full px-4 py-1.5 text-xs text-purple-300 font-mono mb-8"
      >
        <Sparkles className="h-3 w-3 text-purple-400 animate-pulse" />
        <span>VIT Bhopal AI/ML Student & Intern</span>
      </motion.div>

      {/* Main Hero Header */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[0.95] text-white"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        SHRIJAL GOSWAMI
      </motion.h1>

      {/* Rotating Headlines */}
      <div className="h-12 sm:h-16 mt-4 mb-10 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={headlineIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-lg sm:text-2xl md:text-3xl text-zinc-400 font-medium max-w-2xl px-4"
          >
            {headlines[headlineIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Hero CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-lg px-4 mb-16"
      >
        <button
          onClick={handleTerminalScroll}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono text-sm font-semibold px-6 py-3.5 rounded-lg border border-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all cursor-pointer"
        >
          <Terminal className="h-4 w-4" />
          <span>Launch RAG Terminal</span>
        </button>

        <button
          onClick={handleProjectsScroll}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-sm px-6 py-3.5 rounded-lg transition-all cursor-pointer"
        >
          <span>View Projects</span>
          <ArrowRight className="h-4 w-4 text-zinc-500" />
        </button>

        <a
          href="/Shrijal_Goswami_Resume.pdf"
          download="Shrijal_Goswami_Resume.pdf"
          onClick={handleConfetti}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-950 hover:bg-purple-950/10 hover:border-purple-500/30 border border-zinc-800 text-zinc-300 font-mono text-sm px-6 py-3.5 rounded-lg transition-all"
        >
          <FileDown className="h-4 w-4 text-purple-400" />
          <span>Get Resume</span>
        </a>
      </motion.div>

      {/* Production Stats Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl p-6 glass-panel border border-zinc-800/80 rounded-xl"
      >
        <div className="flex flex-col items-center justify-center p-3 border-r border-zinc-900 last:border-0">
          <span className="text-2xl sm:text-3xl font-mono font-bold text-purple-400">89.13%</span>
          <span className="text-[10px] sm:text-xs text-zinc-500 font-mono uppercase mt-1 tracking-wider">Classification Acc</span>
        </div>
        <div className="flex flex-col items-center justify-center p-3 border-r border-zinc-900 md:border-r last:border-0">
          <span className="text-2xl sm:text-3xl font-mono font-bold text-indigo-400">0.94</span>
          <span className="text-[10px] sm:text-xs text-zinc-500 font-mono uppercase mt-1 tracking-wider">UCI general AUC</span>
        </div>
        <div className="flex flex-col items-center justify-center p-3 border-r border-zinc-900 last:border-0">
          <span className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400">Hybrid</span>
          <span className="text-[10px] sm:text-xs text-zinc-500 font-mono uppercase mt-1 tracking-wider">BM25 + Vector Retrieval</span>
        </div>
        <div className="flex flex-col items-center justify-center p-3 last:border-0">
          <span className="text-2xl sm:text-3xl font-mono font-bold text-blue-400">Pinnacle</span>
          <span className="text-[10px] sm:text-xs text-zinc-500 font-mono uppercase mt-1 tracking-wider">AI Engineering Intern</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
