import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ArrowRight, Sparkles, FileDown, Cpu, Activity, Database, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { use3DTilt } from '../hooks/use3DTilt';

const Hero = () => {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const headlines = [
    "Building Real-World AI Systems",
    "Optimizing Retrieval-Augmented Generation (RAG)",
    "Training Explainable Machine Learning Models",
    "Engineering LLM-Integrated FastAPI Backends"
  ];

  // System dashboard state variables to simulate active training
  const [epoch, setEpoch] = useState(1);
  const [valAcc, setValAcc] = useState(0.72);
  const [valLoss, setValLoss] = useState(0.45);
  const [sysStatus, setSysStatus] = useState("TRAINING_STAGE_1");
  const [copied, setCopied] = useState(false);

  const { tiltStyle, glareStyle, handleMouseMove, handleMouseLeave } = use3DTilt(5, 1.01);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Simulate training epoch ticks
  useEffect(() => {
    const interval = setInterval(() => {
      setEpoch((prev) => {
        if (prev >= 100) return 1;
        
        // Compute dummy accuracy and loss curves that approach Shrijal's stats
        const nextEpoch = prev + 1;
        const targetAcc = 0.8913;
        const targetLoss = 0.082;
        
        // Exponential decay towards targets
        const ratio = 1 - Math.exp(-nextEpoch / 30);
        const nextAcc = 0.55 + ratio * (targetAcc - 0.55) + (Math.random() - 0.5) * 0.004;
        const nextLoss = 0.65 - ratio * (0.65 - targetLoss) + (Math.random() - 0.5) * 0.005;
        
        setValAcc(parseFloat(Math.min(nextAcc, 0.8913).toFixed(4)));
        setValLoss(parseFloat(Math.max(nextLoss, 0.0812).toFixed(4)));
        
        if (nextEpoch > 70) {
          setSysStatus("GENERALIZED_OPTIMIZED");
        } else if (nextEpoch > 35) {
          setSysStatus("STACKING_METRIC_FUSION");
        } else {
          setSysStatus("TRAINING_LEVEL_0_ESTIMATORS");
        }
        
        return nextEpoch;
      });
    }, 1200);
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
      const offset = 80;
      const elementPosition = term.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const handleProjectsScroll = () => {
    const proj = document.getElementById('projects');
    if (proj) {
      const offset = 80;
      const elementPosition = proj.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('goswamivansh999@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" className="min-h-[85vh] flex flex-col justify-center relative py-12 md:py-20">
      
      {/* Background soft ambient glows */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-indigo-500/5 filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 filter blur-[140px] pointer-events-none" />

      <div className="grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column - Headline & Bio CTAs */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Animated Tech Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 border border-indigo-500/10 bg-indigo-950/10 rounded-full px-3.5 py-1.5 text-xs text-indigo-400 font-mono"
          >
            <Sparkles className="h-3 w-3 text-indigo-400 animate-pulse" />
            <span>AI/ML Engineering Intern @ Pinnacle Labs</span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              SHRIJAL GOSWAMI
            </motion.h1>

            {/* Rotating Headlines */}
            <div className="h-10 flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={headlineIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="text-base sm:text-xl md:text-2xl text-zinc-400 font-mono font-medium"
                >
                  {headlines[headlineIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-zinc-500 text-sm sm:text-base max-w-xl leading-relaxed"
            >
              Building inspectable, production-ready AI systems. Specializing in sparse-dense hybrid retrieval networks (RAG) and stacked generalization ensembles that bridge academic research with scalable backends.
            </motion.p>
          </div>

          {/* Hero Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 items-center w-full max-w-md"
          >
            <button
              onClick={handleTerminalScroll}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold px-5 py-3 rounded-lg border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:shadow-[0_0_25px_rgba(99,102,241,0.25)] transition-all cursor-pointer"
            >
              <Terminal className="h-4 w-4" />
              <span>Launch RAG Terminal</span>
            </button>

            <button
              onClick={handleProjectsScroll}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-900 border border-white/[0.04] text-zinc-300 font-mono text-xs px-5 py-3 rounded-lg transition-all cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowRight className="h-4 w-4 text-zinc-500" />
            </button>

            <a
              href="/Shrijal_Goswami_Resume.pdf"
              download="Shrijal_Goswami_Resume.pdf"
              onClick={handleConfetti}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-950 hover:bg-indigo-950/10 hover:border-indigo-500/30 border border-white/[0.04] text-zinc-300 font-mono text-xs px-5 py-3 rounded-lg transition-all"
            >
              <FileDown className="h-4 w-4 text-indigo-400" />
              <span>Get Resume</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column - Premium 3D AI OS Telemetry Dashboard */}
        <div className="lg:col-span-5 relative flex justify-center">
          
          {/* Spatial blur backdrop behind the card */}
          <div className="absolute w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

          {/* Interactive 3D Card Panel */}
          <div
            style={tiltStyle}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full max-w-[400px] glass-panel border border-white/[0.06] rounded-2xl p-5 shadow-2xl relative overflow-hidden select-none cursor-default"
          >
            {/* Glare Lighting Reflection Layer */}
            <div 
              style={{
                ...glareStyle,
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 5
              }} 
            />

            {/* Simulated OS Window Header */}
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-3.5 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500/40 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500/40 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40 inline-block"></span>
                <span className="text-[10px] font-mono text-zinc-500 ml-1.5">SYSTEM_MONITOR // CLASSIFIER_RUN</span>
              </div>
              <span className="text-[9px] font-mono bg-indigo-500/5 text-indigo-400 border border-indigo-500/10 px-2 py-0.5 rounded uppercase tracking-wider">
                Active Node
              </span>
            </div>

            {/* Neural Net Layer Visualizer */}
            <div className="relative h-20 bg-[#030305]/80 border border-white/[0.03] rounded-lg p-3 flex justify-between items-center overflow-hidden mb-4">
              <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
              
              {/* SVG Animated Connector Paths */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                {/* Level-0 Connections */}
                <path d="M 35 15 L 140 28 M 35 40 L 140 28 M 35 40 L 140 52 M 35 65 L 140 52" stroke="rgba(168,85,247,0.15)" strokeWidth="1" strokeDasharray="3,3" />
                <path d="M 140 28 L 265 40 M 140 52 L 265 40" stroke="rgba(99,102,241,0.15)" strokeWidth="1.5" />
                
                {/* Active pulsating signal path */}
                <motion.path 
                  d="M 35 40 L 140 28 L 265 40" 
                  fill="none"
                  stroke="url(#pulseGrad)" 
                  strokeWidth="1.5"
                  initial={{ strokeDasharray: "20, 150", strokeDashoffset: 170 }}
                  animate={{ strokeDashoffset: -170 }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                />
                
                <defs>
                  <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(168,85,247,0)" />
                    <stop offset="50%" stopColor="rgba(99,102,241,0.8)" />
                    <stop offset="100%" stopColor="rgba(52,211,153,0)" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Node Layer 0 (Input features) */}
              <div className="flex flex-col gap-2 z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-500/70 border border-purple-400/50 shadow-[0_0_5px_rgba(168,85,247,0.5)]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-purple-500/70 border border-purple-400/50 shadow-[0_0_5px_rgba(168,85,247,0.5)]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-purple-500/70 border border-purple-400/50 shadow-[0_0_5px_rgba(168,85,247,0.5)]"></div>
              </div>

              {/* Node Layer 1 (Stack Level-0 Base Classifiers) */}
              <div className="flex flex-col gap-5 z-10">
                <div className="w-3.5 h-3.5 rounded-full bg-indigo-500/80 border border-indigo-400/60 flex items-center justify-center">
                  <span className="text-[6px] font-bold text-white font-mono">RF</span>
                </div>
                <div className="w-3.5 h-3.5 rounded-full bg-indigo-500/80 border border-indigo-400/60 flex items-center justify-center">
                  <span className="text-[6px] font-bold text-white font-mono">XG</span>
                </div>
              </div>

              {/* Node Layer 2 (Stack Level-1 Meta Learner Output) */}
              <div className="z-10 pr-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500/80 border border-emerald-400/60 flex items-center justify-center shadow-[0_0_10px_rgba(52,211,153,0.4)] animate-pulse">
                  <span className="text-[6px] font-bold text-white font-mono">LR</span>
                </div>
              </div>
              
              <div className="text-right z-10 pl-6 border-l border-white/[0.04]">
                <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block">Diagnostics</span>
                <span className="text-[10px] font-mono font-semibold text-emerald-400 block tracking-tight">89.13% ACC</span>
                <span className="text-[9px] font-mono text-indigo-400/70 block">0.94 ROC-AUC</span>
              </div>
            </div>

            {/* Model Parameters & Metrics */}
            <div className="grid grid-cols-2 gap-3.5 mb-4">
              <div className="bg-[#030305]/60 border border-white/[0.03] rounded-lg p-3">
                <span className="text-[8px] font-mono text-zinc-500 uppercase block tracking-wider">Epoch Progress</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-lg font-mono font-bold text-white leading-none">{epoch}</span>
                  <span className="text-[10px] font-mono text-zinc-500">/ 100</span>
                </div>
                <div className="w-full bg-zinc-900 h-1 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${epoch}%` }}
                  />
                </div>
              </div>

              <div className="bg-[#030305]/60 border border-white/[0.03] rounded-lg p-3">
                <span className="text-[8px] font-mono text-zinc-500 uppercase block tracking-wider">Learning Phase</span>
                <span className="text-[10px] font-mono font-semibold text-indigo-400 block mt-1 truncate">
                  {sysStatus.split('_')[0]}
                </span>
                <div className="flex items-center gap-1 mt-2 text-[8px] font-mono text-zinc-500">
                  <Activity className="h-3 w-3 text-indigo-400 animate-pulse" />
                  <span>ALPHA_WEIGHTS: 0.65</span>
                </div>
              </div>
            </div>

            {/* Real-time Graph Plots */}
            <div className="bg-[#030305]/60 border border-white/[0.03] rounded-lg p-3">
              <div className="flex justify-between items-center mb-2 text-[8px] font-mono text-zinc-500">
                <span>EPOCH PERFORMANCE CURVE</span>
                <span className="text-zinc-600">LR_SCHEDULER: EXPONENTIAL</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[8px] font-mono text-zinc-500 block">CROSS_VAL_ACCURACY</span>
                  <span className="text-sm font-mono font-bold text-emerald-400 mt-0.5 block">
                    {(valAcc * 100).toFixed(2)}%
                  </span>
                </div>
                <div>
                  <span className="text-[8px] font-mono text-zinc-500 block">ENSEMBLE_LOSS</span>
                  <span className="text-sm font-mono font-bold text-purple-400 mt-0.5 block">
                    {valLoss}
                  </span>
                </div>
              </div>
            </div>

            {/* Console Readout Footer */}
            <div className="mt-4 p-3 bg-black/60 rounded-lg border border-white/[0.03] font-mono text-[9px] text-zinc-500 space-y-1">
              <div className="flex justify-between">
                <span>SYSTEM_VECTORS: CHROME_DB</span>
                <span className="text-emerald-400/70">SYNC_READY</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>INDEX_BUFFER: BM25_HYBRID</span>
                <span>LATENCY: 45ms</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Production Stats Box (WWDC grid style) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl mt-20 p-4 bg-white/[0.01] border border-white/[0.04] rounded-xl backdrop-blur-sm"
      >
        <div className="flex flex-col items-center md:items-start justify-center p-4 border-r border-white/[0.04] last:border-0">
          <span className="text-2xl font-mono font-bold text-indigo-400">89.13%</span>
          <span className="text-[9px] text-zinc-500 font-mono uppercase mt-1 tracking-wider">Classification Acc</span>
        </div>
        <div className="flex flex-col items-center md:items-start justify-center p-4 border-r border-white/[0.04] last:border-0">
          <span className="text-2xl font-mono font-bold text-purple-400">0.94</span>
          <span className="text-[9px] text-zinc-500 font-mono uppercase mt-1 tracking-wider">UCI general AUC</span>
        </div>
        <div className="flex flex-col items-center md:items-start justify-center p-4 border-r border-white/[0.04] last:border-0">
          <span className="text-2xl font-mono font-bold text-emerald-400">Hybrid</span>
          <span className="text-[9px] text-zinc-500 font-mono uppercase mt-1 tracking-wider">BM25 + Vector Retrieval</span>
        </div>
        <div className="flex flex-col items-center md:items-start justify-center p-4 last:border-0">
          <span className="text-2xl font-mono font-bold text-blue-400">Pinnacle</span>
          <span className="text-[9px] text-zinc-500 font-mono uppercase mt-1 tracking-wider">AI Engineering Intern</span>
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;
