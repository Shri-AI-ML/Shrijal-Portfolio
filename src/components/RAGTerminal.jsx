import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Database, Cpu, Search, Sparkles, RefreshCw, Send, ArrowRight, GitCommit } from 'lucide-react';
import { use3DTilt } from '../hooks/use3DTilt';

// Modular RAG Path with double layer for high-contrast cinematic glow
const RAGPath = ({ d, active, color = '#818cf8', glowColor = 'rgba(99,102,241,0.22)', isDashed = false }) => {
  return (
    <>
      {/* Background glow path (blurred) */}
      {active && (
        <path
          d={d}
          fill="none"
          stroke={glowColor}
          strokeWidth={5.5}
          className="blur-[2px] transition-all duration-500"
          strokeDasharray={isDashed ? '4,4' : '0'}
        />
      )}
      {/* Core solid path */}
      <path
        d={d}
        fill="none"
        stroke={active ? color : 'rgba(255, 255, 255, 0.08)'}
        strokeWidth={active ? 2 : 1.2}
        className="transition-all duration-500"
        strokeDasharray={isDashed ? '4,4' : '0'}
      />
    </>
  );
};

// Animated energy pulse line that travels along connection paths
const PulsePath = ({ d, active, color = '#6366f1' }) => {
  if (!active) return null;
  return (
    <>
      {/* Glowing pulse path */}
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={{ strokeDasharray: "10, 45", strokeDashoffset: 55 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      />
      {/* Fainter wider glow for pulse */}
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={6.5}
        strokeLinecap="round"
        className="blur-[2px]"
        initial={{ strokeDasharray: "10, 45", strokeDashoffset: 55 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        opacity={0.45}
      />
    </>
  );
};

// High-fidelity RAG Node component with custom LED, edge lighting, and breathing pulses
const RAGNode = ({ label, sublabel, activeSteps, ragStep, widthClass, isFusion = false }) => {
  const isActive = activeSteps.includes(ragStep);

  // System-oriented theme configurations (cinematic execution style)
  let activeBorder = 'border-indigo-500/50';
  let activeBg = 'bg-[#12121e]/90';
  let activeGlow = 'shadow-[0_0_15px_rgba(99,102,241,0.12)]';
  let activeText = 'text-indigo-400';
  let activeLed = 'bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.95)]';
  
  if (label === 'Context') {
    activeBorder = 'border-emerald-500/50';
    activeBg = 'bg-[#0f1f18]/90';
    activeGlow = 'shadow-[0_0_15px_rgba(52,211,153,0.12)]';
    activeText = 'text-emerald-400';
    activeLed = 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.95)]';
  } else if (label === 'Groq LLM') {
    activeBorder = 'border-purple-500/50';
    activeBg = 'bg-[#18121f]/90';
    activeGlow = 'shadow-[0_0_15px_rgba(168,85,247,0.12)]';
    activeText = 'text-purple-400';
    activeLed = 'bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.95)]';
  } else if (label === 'ChromaDB') {
    activeBorder = 'border-blue-500/50';
    activeBg = 'bg-[#121824]/90';
    activeGlow = 'shadow-[0_0_15px_rgba(59,130,246,0.12)]';
    activeText = 'text-blue-400';
    activeLed = 'bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.95)]';
  } else if (label === 'BM25') {
    activeBorder = 'border-purple-500/50';
    activeBg = 'bg-[#18121f]/90';
    activeGlow = 'shadow-[0_0_15px_rgba(168,85,247,0.12)]';
    activeText = 'text-purple-400';
    activeLed = 'bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.95)]';
  }

  // Customize Fusion node characteristics to make it the central focal point
  if (isFusion) {
    activeBorder = 'border-indigo-400 ring-1 ring-indigo-500/20';
    activeBg = 'bg-[#141426]/95';
    activeGlow = 'shadow-[0_0_25px_rgba(99,102,241,0.22)]';
    activeText = 'text-indigo-300';
    activeLed = 'bg-indigo-300 shadow-[0_0_12px_rgba(99,102,241,1)] animate-ping';
  }

  const pulseScale = isFusion ? [1, 1.05, 1] : [1, 1.02, 1];
  const pulseDuration = isFusion ? 1.6 : 2.4;

  return (
    <motion.div
      animate={isActive ? { scale: pulseScale } : { scale: 1 }}
      transition={{ repeat: isActive ? Infinity : 0, repeatType: "reverse", duration: pulseDuration, ease: "easeInOut" }}
      className={`relative p-2 rounded-lg border transition-all duration-500 backdrop-blur-md select-none font-mono ${widthClass} ${
        isActive
          ? `${activeBg} ${activeBorder} ${activeGlow} text-zinc-150 z-20`
          : 'bg-[#0a0a0f]/80 border-white/[0.06] text-zinc-400 z-10'
      }`}
      style={{
        boxShadow: isActive 
          ? 'inset 0 1px 1px rgba(255, 255, 255, 0.05)' 
          : 'inset 0 1px 1px rgba(255, 255, 255, 0.01)'
      }}
    >
      {/* Edge highlight lighting (subtle top gradient highlight) */}
      <div 
        className={`absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent transition-opacity duration-500 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      <div className="flex flex-col items-center justify-center text-center">
        {/* LED Status indicator */}
        <div className="flex items-center gap-1.5 mb-0.5 justify-center">
          <span className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${isActive ? activeLed : 'bg-zinc-800'}`} />
          <span className={`block font-bold tracking-wider text-[8px] transition-colors duration-500 ${isActive ? 'text-zinc-100 font-extrabold' : 'text-zinc-500'}`}>{label}</span>
        </div>
        <span className={`text-[6.5px] block opacity-75 uppercase tracking-wide truncate max-w-full transition-colors duration-500 ${isActive ? activeText : 'text-zinc-600'}`}>{sublabel}</span>
      </div>
    </motion.div>
  );
};

const RAGTerminal = () => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const [retrievedChunks, setRetrievedChunks] = useState([]);
  
  // RAG execution pipeline step
  const [ragStep, setRagStep] = useState('idle'); // 'idle' | 'parsing' | 'retrieving' | 'fusing' | 'generating' | 'done'
  
  const terminalEndRef = useRef(null);
  const terminalContainerRef = useRef(null);
  const shouldAutoScrollRef = useRef(true);

  const { tiltStyle, glareStyle, handleMouseMove, handleMouseLeave } = use3DTilt(3, 1.008);

  const dbChunks = [
    {
      id: "chunk_1",
      tag: "experience",
      text: "Pinnacle Labs AI Intern (May 2026 - Present): Built modular Python AI components, FastAPI REST API backends, and modular ML pipelines. Tuned retrieval weights to minimize latency for production deliverables.",
      source: "Resume.pdf#Experience"
    },
    {
      id: "chunk_2",
      tag: "projects_rag",
      text: "Explainable RAG QA System: Architected a hybrid retrieval pipeline using BM25 sparse search + dense vector search over ChromaDB with a Groq LLM backend. Features source attribution, explainable metrics, and incremental indexing to avoid full database rebuilds.",
      source: "Resume.pdf#Projects"
    },
    {
      id: "chunk_3",
      tag: "projects_ml",
      text: "Heart Disease Prediction System: Engineered a hybrid stacking ensemble (Random Forest + XGBoost + Logistic Regression) achieving 89.13% accuracy and 0.94 AUC on UCI database. Integrates Streamlit frontend and FastAPI REST API with a RAG layer for clinical Q&A.",
      source: "Resume.pdf#Projects"
    },
    {
      id: "chunk_4",
      tag: "skills",
      text: "Technical Skills: Languages (Python, C++, SQL), ML/AI (Scikit-learn, XGBoost, Stacking Generalization, PyTorch), GenAI/LLM (LangChain, ChromaDB, RAG Pipelines, Vertex AI, Prompt Engineering, Explainable AI), Frameworks (FastAPI, Streamlit, Pandas, NumPy).",
      source: "Resume.pdf#Skills"
    },
    {
      id: "chunk_5",
      tag: "education_research",
      text: "Education & Interests: B.Tech Computer Science (AI/ML specialization) at VIT Bhopal (2024 - 2028). Research interests include Explainable AI (XAI), dense-sparse hybrid retrieval systems, and real-world ML engineering.",
      source: "Resume.pdf#Education"
    }
  ];

  const quickQueries = [
    { label: "get_experience()", query: "get_experience" },
    { label: "get_skills()", query: "get_skills" },
    { label: "get_projects()", query: "get_projects" },
    { label: "explainable_ai_why()", query: "explainable_ai_why" }
  ];

  useEffect(() => {
    setLogs([
      { type: 'sys', text: 'Initializing Shrijal-RAG-VectorDB (ChromaDB emulator v0.4.1)...' },
      { type: 'sys', text: 'Loading 5 document chunks from Shrijal_Goswami_Resume.pdf...' },
      { type: 'success', text: 'Index ready. Hybrid Retriever (BM25 sparse + Dense Vector) online.' },
      { type: 'sys', text: 'Type a query below or select a helper function to test the retrieval pipeline.' }
    ]);
  }, []);

  const scrollToBottom = (behavior = 'smooth') => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTo({
        top: terminalContainerRef.current.scrollHeight,
        behavior
      });
    }
  };

  const handleScroll = () => {
    if (terminalContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = terminalContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 55;
      shouldAutoScrollRef.current = isNearBottom;
    }
  };

  useEffect(() => {
    if (shouldAutoScrollRef.current) {
      const behavior = currentResponse ? 'auto' : 'smooth';
      scrollToBottom(behavior);
    }
  }, [logs, currentResponse, retrievedChunks]);

  const processQuery = (queryText) => {
    if (isTyping || !queryText.trim()) return;

    const normalizedQuery = queryText.toLowerCase().trim();
    shouldAutoScrollRef.current = true;

    // Add query to terminal logs
    setLogs(prev => [...prev, { type: 'user', text: queryText }]);
    setIsTyping(true);
    setCurrentResponse('');
    setRetrievedChunks([]);

    // 1. Parsing Phase
    setRagStep('parsing');
    setTimeout(() => {
      setLogs(prev => [...prev, { type: 'sys', text: `[RAG] Parsing query: "${queryText}"` }]);
    }, 250);

    // 2. Retrieval Phase
    setTimeout(() => {
      setRagStep('retrieving');
      setLogs(prev => [...prev, { type: 'retrieving', text: '[Retrieval] Scanning database... Running sparse BM25 scoring & dense Cosine distance calculation...' }]);
    }, 650);

    // 3. Fusion Phase
    setTimeout(() => {
      setRagStep('fusing');
      let matchedChunks = [];
      let llmAnswer = "";

      if (normalizedQuery.includes('experience') || normalizedQuery.includes('intern') || normalizedQuery.includes('pinnacle')) {
        matchedChunks = [
          { ...dbChunks[0], score: 0.941, method: "Vector (Cosine)" },
          { ...dbChunks[4], score: 0.725, method: "BM25" }
        ];
        llmAnswer = "Shrijal is currently working as an Artificial Intelligence Intern at Pinnacle Labs (starting May 2026). In this role, he designs modular Python AI components, creates production-ready FastAPI endpoints, and debugs ML pipelines to optimize feature accuracy and execution speed. Additionally, he is an active student researcher at VIT Bhopal, participating in the Data Science and AI Clubs.";
      } else if (normalizedQuery.includes('skills') || normalizedQuery.includes('tech') || normalizedQuery.includes('stack')) {
        matchedChunks = [
          { ...dbChunks[3], score: 0.965, method: "Vector (Cosine)" },
          { ...dbChunks[0], score: 0.658, method: "BM25" }
        ];
        llmAnswer = "Shrijal's technical arsenal spans core engineering and AI specializations. His primary language is Python, backed by strong C++ and SQL skills. In ML, he specializes in Scikit-learn, XGBoost, and Stacking Generalization. For GenAI, he is highly proficient in building RAG pipelines, working with LangChain, ChromaDB, and APIs (Groq, Gemini, Vertex AI). His backend stack centers around FastAPI, Streamlit, and NumPy/Pandas.";
      } else if (normalizedQuery.includes('projects') || normalizedQuery.includes('heart') || normalizedQuery.includes('disease') || normalizedQuery.includes('qa')) {
        matchedChunks = [
          { ...dbChunks[1], score: 0.923, method: "Vector (Cosine)" },
          { ...dbChunks[2], score: 0.912, method: "Vector (Cosine)" }
        ];
        llmAnswer = "Shrijal has engineered several notable AI/ML systems. First is the Explainable RAG QA System, featuring a dense-sparse hybrid retriever on ChromaDB and Groq LLM with incremental indexing. Second is the Heart Disease Prediction System, a hybrid stacking ensemble (Random Forest, XGBoost, Logistic Regression) with 89.13% accuracy and 0.94 AUC, which includes a RAG layer for clinical contextual queries.";
      } else if (normalizedQuery.includes('explain') || normalizedQuery.includes('xai') || normalizedQuery.includes('why')) {
        matchedChunks = [
          { ...dbChunks[4], score: 0.887, method: "Vector (Cosine)" },
          { ...dbChunks[2], score: 0.741, method: "BM25" }
        ];
        llmAnswer = "Explainable AI (XAI) is critical in high-stakes domains like medicine and finance. Shrijal implements this by providing source-attribution in his RAG pipelines, and combining his Heart Disease Prediction ensemble with generalized stacking cross-validation and feature-importance indicators. This ensures clinical decisions are backed by inspectable math and features, not just black-box predictions.";
      } else {
        const scores = dbChunks.map(chunk => {
          let score = 0.15;
          const words = normalizedQuery.split(' ');
          words.forEach(word => {
            if (chunk.text.toLowerCase().includes(word)) score += 0.25;
          });
          return { ...chunk, score: Math.min(score, 0.95), method: "Hybrid" };
        }).sort((a, b) => b.score - a.score);

        matchedChunks = scores.slice(0, 2);
        
        if (matchedChunks[0].score > 0.2) {
          llmAnswer = `Based on retrieved chunks, Shrijal Goswami is an AI/ML developer focused on real-world systems. He is studying Computer Science at VIT Bhopal and has experience with Python, FastAPI, LangChain, ChromaDB, and stacking ensembles. He recently built an Explainable RAG QA pipeline and is interning at Pinnacle Labs.`;
        } else {
          matchedChunks = [dbChunks[4]];
          llmAnswer = "I couldn't find a direct, highly-scored match for that query in the local vector DB. However, I can share that Shrijal Goswami is a B.Tech AI/ML student at VIT Bhopal and an AI Intern at Pinnacle Labs, specializing in Python, FastAPI, and RAG pipelines. Ask me about 'experience', 'projects', 'skills', or 'explainable AI'!";
        }
      }

      setRetrievedChunks(matchedChunks);
      setLogs(prev => [...prev, { 
        type: 'retrieved', 
        text: `[Retrieve] Success. Fetched ${matchedChunks.length} document chunk(s) (top score: ${matchedChunks[0].score.toFixed(3)})` 
      }]);

      // 4. Generation Phase
      setTimeout(() => {
        setRagStep('generating');
        setLogs(prev => [...prev, { type: 'sys', text: '[LLM] Stream response init... Groq-LLM-llama3-70b-preview (grounded)' }]);
        
        let index = 0;
        const interval = setInterval(() => {
          if (index < llmAnswer.length) {
            setCurrentResponse(prev => prev + llmAnswer.charAt(index));
            index += 2;
          } else {
            clearInterval(interval);
            setIsTyping(false);
            setLogs(prev => [...prev, { type: 'assistant', text: llmAnswer }]);
            setCurrentResponse('');
            setRagStep('done');
          }
        }, 12);
      }, 450);

    }, 1300);

    setInputVal('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      processQuery(inputVal);
    }
  };

  return (
    <section id="terminal" className="py-20 border-t border-white/[0.04] relative">
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
      
      <div className="absolute top-1/4 left-10 glow-overlay-purple opacity-30" />
      <div className="absolute bottom-1/4 right-10 glow-overlay-blue opacity-30" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 border border-white/[0.04] bg-[#0e0e14] px-3 py-1 rounded-full text-[10px] text-zinc-400 font-mono mb-4">
            <Terminal className="h-3.5 w-3.5 text-indigo-400" />
            <span>/system/terminal</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            INTERACTIVE AI TERMINAL
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto font-mono">
            Test a simulated <strong>Retrieval-Augmented Generation (RAG)</strong> pipeline indexing Shrijal's credentials.
          </p>
        </div>

        {/* Live Visual RAG Pipeline Graph */}
        <div className="glass-panel border border-white/[0.04] rounded-xl p-4 mb-6 shadow-lg bg-[#0e0e14]/60 overflow-hidden relative">
          <span className="text-[9px] font-mono text-zinc-550 uppercase tracking-widest block mb-4">
            LIVE PIPELINE GRAPH MONITOR // PIPELINE_FLOW
          </span>
          <div className="relative overflow-x-auto no-scrollbar py-2">
            <div className="min-w-[650px] relative h-20 flex justify-between items-center px-4 font-mono text-[9px]">
              
              {/* Connector Path Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="queryGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.16" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="retrievalGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#c084fc" stopOpacity="0.14" />
                    <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="fusionGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="llmGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.16" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Ambient background gradients behind active graph regions */}
                <g className="transition-opacity duration-700">
                  {['parsing', 'retrieving', 'fusing', 'generating', 'done'].includes(ragStep) && (
                    <circle cx="120" cy="40" r="90" fill="url(#queryGlow)" />
                  )}
                  {['retrieving', 'fusing', 'generating', 'done'].includes(ragStep) && (
                    <circle cx="290" cy="40" r="110" fill="url(#retrievalGlow)" />
                  )}
                  {['fusing', 'generating', 'done'].includes(ragStep) && (
                    <circle cx="437" cy="40" r="100" fill="url(#fusionGlow)" />
                  )}
                  {['generating', 'done'].includes(ragStep) && (
                    <circle cx="630" cy="40" r="100" fill="url(#llmGlow)" />
                  )}
                </g>

                {/* Inactive & Active paths with double layer glows */}
                <RAGPath d="M 68 40 H 122" active={ragStep !== 'idle'} color="#818cf8" glowColor="rgba(99,102,241,0.25)" isDashed={ragStep === 'parsing'} />
                <RAGPath d="M 172 40 Q 212 18, 252 18" active={['retrieving', 'fusing', 'generating', 'done'].includes(ragStep)} color="#818cf8" glowColor="rgba(99,102,241,0.25)" />
                <RAGPath d="M 172 40 Q 212 62, 252 62" active={['retrieving', 'fusing', 'generating', 'done'].includes(ragStep)} color="#c084fc" glowColor="rgba(168,85,247,0.25)" />
                <RAGPath d="M 332 18 Q 372 40, 412 40" active={['fusing', 'generating', 'done'].includes(ragStep)} color="#818cf8" glowColor="rgba(99,102,241,0.25)" />
                <RAGPath d="M 332 62 Q 372 40, 412 40" active={['fusing', 'generating', 'done'].includes(ragStep)} color="#c084fc" glowColor="rgba(168,85,247,0.25)" />
                <RAGPath d="M 462 40 H 512" active={['generating', 'done'].includes(ragStep)} color="#10b981" glowColor="rgba(16,185,129,0.25)" />
                <RAGPath d="M 562 40 H 602" active={['generating', 'done'].includes(ragStep)} color="#10b981" glowColor="rgba(16,185,129,0.25)" />

                {/* Animated flowing energy pulses */}
                <PulsePath d="M 68 40 H 122" active={ragStep === 'parsing'} color="#818cf8" />
                <PulsePath d="M 172 40 Q 212 18, 252 18" active={ragStep === 'retrieving'} color="#818cf8" />
                <PulsePath d="M 172 40 Q 212 62, 252 62" active={ragStep === 'retrieving'} color="#c084fc" />
                <PulsePath d="M 332 18 Q 372 40, 412 40" active={ragStep === 'fusing'} color="#818cf8" />
                <PulsePath d="M 332 62 Q 372 40, 412 40" active={ragStep === 'fusing'} color="#c084fc" />
                <PulsePath d="M 462 40 H 512" active={ragStep === 'generating'} color="#10b981" />
                <PulsePath d="M 562 40 H 602" active={ragStep === 'generating'} color="#10b981" />
              </svg>

              {/* Node 1: Query */}
              <RAGNode 
                label="Query" 
                sublabel="/stdin" 
                activeSteps={['parsing', 'retrieving', 'fusing', 'generating', 'done']} 
                ragStep={ragStep} 
                widthClass="w-[68px] min-w-[68px]" 
              />

              {/* Node 2: Router */}
              <RAGNode 
                label="Router" 
                sublabel="Weights" 
                activeSteps={['parsing', 'retrieving', 'fusing', 'generating', 'done']} 
                ragStep={ragStep} 
                widthClass="w-[52px] min-w-[52px]" 
              />

              {/* Parallel Pathways: Dense / Sparse */}
              <div className="flex flex-col gap-3.5 z-10 w-[80px] min-w-[80px]">
                <RAGNode 
                  label="ChromaDB" 
                  sublabel="Dense Vector" 
                  activeSteps={['retrieving', 'fusing', 'generating', 'done']} 
                  ragStep={ragStep} 
                  widthClass="w-[80px] min-w-[80px]" 
                />
                <RAGNode 
                  label="BM25" 
                  sublabel="Sparse Lex" 
                  activeSteps={['retrieving', 'fusing', 'generating', 'done']} 
                  ragStep={ragStep} 
                  widthClass="w-[80px] min-w-[80px]" 
                />
              </div>

              {/* Node 4: Linear Fusion Combiner */}
              <RAGNode 
                label="Fusion" 
                sublabel="α = 0.65" 
                activeSteps={['fusing', 'generating', 'done']} 
                ragStep={ragStep} 
                widthClass="w-[58px] min-w-[58px]" 
                isFusion={true}
              />

              {/* Node 5: Grounded Context */}
              <RAGNode 
                label="Context" 
                sublabel="Grounding" 
                activeSteps={['generating', 'done']} 
                ragStep={ragStep} 
                widthClass="w-[62px] min-w-[62px]" 
              />

              {/* Node 6: Groq LLM */}
              <RAGNode 
                label="Groq LLM" 
                sublabel="Llama-70b" 
                activeSteps={['generating', 'done']} 
                ragStep={ragStep} 
                widthClass="w-[68px] min-w-[68px]" 
              />

            </div>
          </div>
        </div>


        {/* 3D Tilted Terminal Window */}
        <div 
          style={tiltStyle}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="glass-panel border border-white/[0.05] rounded-xl overflow-hidden shadow-2xl relative z-10 bg-[#07070a]/90 select-none"
        >
          {/* Glare Reflection */}
          <div 
            style={{
              ...glareStyle,
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 5
            }} 
          />

          {/* Window Header Bar */}
          <div className="bg-[#09090e] px-4 py-3 flex items-center justify-between border-b border-white/[0.04]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70 inline-block"></span>
              <span className="text-[10px] font-mono text-zinc-500 ml-2">guest@shrijal.ai:~/chromadb-rag-agent</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-400/90 bg-emerald-950/20 border border-emerald-900/30 rounded px-2 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>INDEX ONLINE</span>
            </div>
          </div>

          {/* Terminal Console */}
          <div 
            ref={terminalContainerRef}
            onScroll={handleScroll}
            className="p-6 h-[380px] overflow-y-auto font-mono text-xs space-y-4 terminal-scroll bg-[#050508]/85"
          >
            {logs.map((log, idx) => (
              <div key={idx} className="leading-relaxed">
                {log.type === 'sys' && (
                  <span className="text-zinc-500">{log.text}</span>
                )}
                {log.type === 'success' && (
                  <span className="text-emerald-400">{log.text}</span>
                )}
                {log.type === 'user' && (
                  <div className="flex items-start gap-2 text-white">
                    <span className="text-indigo-400">guest@shrijal.ai:~$</span>
                    <span>{log.text}</span>
                  </div>
                )}
                {log.type === 'retrieving' && (
                  <div className="flex items-center gap-2 text-zinc-400 text-xs italic">
                    <RefreshCw className="h-3.5 w-3.5 animate-spin text-indigo-400" />
                    <span>{log.text}</span>
                  </div>
                )}
                {log.type === 'retrieved' && (
                  <span className="text-indigo-400 text-[11px] block mt-1">{log.text}</span>
                )}
                {log.type === 'assistant' && (
                  <div className="text-zinc-300 pl-3.5 border-l-2 border-indigo-500/30 py-0.5 mt-2">
                    <span className="text-indigo-400 text-[10px] block mb-1 uppercase tracking-wider font-bold">RAG_RESPONSE:</span>
                    {log.text}
                  </div>
                )}
              </div>
            ))}

            {/* Display active streaming character updates */}
            {currentResponse && (
              <div className="text-zinc-300 pl-3.5 border-l-2 border-indigo-500/30 py-0.5 mt-2">
                <span className="text-indigo-400 text-[10px] block mb-1 uppercase tracking-wider font-bold">RAG_RESPONSE (streaming):</span>
                {currentResponse}
                <span className="w-1.5 h-3.5 bg-indigo-400 inline-block animate-pulse ml-0.5 align-middle"></span>
              </div>
            )}

            {/* Display retrieved context cards */}
            {retrievedChunks.length > 0 && !currentResponse && isTyping && (
              <div className="space-y-2 py-1.5">
                <span className="text-zinc-500 text-[9px] uppercase tracking-widest block font-bold">
                  <Database className="h-3.5 w-3.5 inline mr-1.5 text-indigo-400" /> Retrieved Context Folders:
                </span>
                <div className="grid gap-2 sm:grid-cols-2">
                  {retrievedChunks.map((c, i) => (
                    <div key={i} className="p-3 bg-[#0a0a0f] border border-white/[0.04] rounded-lg text-[11px] hover:border-indigo-500/20 transition-all select-none">
                      <div className="flex items-center justify-between mb-1.5 text-zinc-500 text-[9px]">
                        <span className="font-semibold text-indigo-400/90 font-mono">{c.source}</span>
                        <span className="text-[8px] bg-indigo-950/40 text-indigo-400 border border-indigo-900/30 rounded px-1.5 font-mono">
                          {c.method} · {c.score.toFixed(3)}
                        </span>
                      </div>
                      <p className="text-zinc-400 leading-normal line-clamp-3">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isTyping && !currentResponse && retrievedChunks.length === 0 && (
              <div className="flex items-center gap-2 text-zinc-500 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                <span>Resolving context weights...</span>
              </div>
            )}
            <div ref={terminalEndRef} />
          </div>

          {/* Quick Query Helpers */}
          <div className="px-6 py-3 border-t border-white/[0.04] bg-white/[0.01] flex flex-wrap gap-2 items-center">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mr-2">Quick Commands:</span>
            {quickQueries.map((q, idx) => (
              <button
                key={idx}
                disabled={isTyping}
                onClick={() => processQuery(q.query)}
                className="text-[10px] font-mono bg-white/[0.02] hover:bg-indigo-950/20 border border-white/[0.04] hover:border-indigo-500/30 text-indigo-400 hover:text-indigo-300 py-1 px-2.5 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input Prompt Box */}
          <div className="p-4 border-t border-white/[0.04] bg-[#09090e] flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-500 pl-2">guest@shrijal.ai:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isTyping}
              placeholder="Ask about my experience, projects, skills..."
              className="flex-1 bg-transparent border-0 outline-none text-zinc-200 font-mono text-xs placeholder:text-zinc-650 focus:ring-0"
            />
            <button
              onClick={() => processQuery(inputVal)}
              disabled={isTyping || !inputVal.trim()}
              className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RAGTerminal;
