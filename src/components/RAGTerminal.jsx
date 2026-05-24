import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Database, Cpu, Search, Sparkles, RefreshCw, Send, ArrowRight, GitCommit } from 'lucide-react';
import { use3DTilt } from '../hooks/use3DTilt';

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
        <div className="glass-panel border border-white/[0.04] rounded-xl p-4 mb-6 shadow-lg bg-[#0e0e14]/60">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-4">
            LIVE PIPELINE GRAPH MONITOR // PIPELINE_FLOW
          </span>
          <div className="relative overflow-x-auto no-scrollbar py-2">
            <div className="min-w-[650px] relative h-20 flex justify-between items-center px-4 font-mono text-[9px]">
              
              {/* Connector Path Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                {/* Query to Router */}
                <path d="M 68 40 H 122" stroke={ragStep !== 'idle' ? '#818cf8' : '#1f1f2e'} strokeWidth={ragStep !== 'idle' ? 1.5 : 1} strokeDasharray={ragStep === 'parsing' ? '4,4' : '0'} />
                
                {/* Router to Dense */}
                <path d="M 172 40 Q 212 18, 252 18" stroke={['retrieving', 'fusing', 'generating', 'done'].includes(ragStep) ? '#818cf8' : '#1f1f2e'} strokeWidth={['retrieving', 'fusing', 'generating', 'done'].includes(ragStep) ? 1.5 : 1} />
                
                {/* Router to Sparse */}
                <path d="M 172 40 Q 212 62, 252 62" stroke={['retrieving', 'fusing', 'generating', 'done'].includes(ragStep) ? '#c084fc' : '#1f1f2e'} strokeWidth={['retrieving', 'fusing', 'generating', 'done'].includes(ragStep) ? 1.5 : 1} />
                
                {/* Dense to Fusion */}
                <path d="M 332 18 Q 372 40, 412 40" stroke={['fusing', 'generating', 'done'].includes(ragStep) ? '#818cf8' : '#1f1f2e'} strokeWidth={['fusing', 'generating', 'done'].includes(ragStep) ? 1.5 : 1} />
                
                {/* Sparse to Fusion */}
                <path d="M 332 62 Q 372 40, 412 40" stroke={['fusing', 'generating', 'done'].includes(ragStep) ? '#c084fc' : '#1f1f2e'} strokeWidth={['fusing', 'generating', 'done'].includes(ragStep) ? 1.5 : 1} />
                
                {/* Fusion to Context */}
                <path d="M 462 40 H 512" stroke={['generating', 'done'].includes(ragStep) ? '#34d399' : '#1f1f2e'} strokeWidth={['generating', 'done'].includes(ragStep) ? 1.5 : 1} />
                
                {/* Context to LLM */}
                <path d="M 562 40 H 602" stroke={['generating', 'done'].includes(ragStep) ? '#34d399' : '#1f1f2e'} strokeWidth={['generating', 'done'].includes(ragStep) ? 1.5 : 1} />

                {/* Animated Dash Array flow to show active processing */}
                {ragStep === 'parsing' && (
                  <motion.path d="M 68 40 H 122" fill="none" stroke="#6366f1" strokeWidth="2" initial={{ strokeDasharray: "5,15", strokeDashoffset: 20 }} animate={{ strokeDashoffset: 0 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} />
                )}
                {ragStep === 'retrieving' && (
                  <>
                    <motion.path d="M 172 40 Q 212 18, 252 18" fill="none" stroke="#6366f1" strokeWidth="2" initial={{ strokeDasharray: "5,15", strokeDashoffset: 20 }} animate={{ strokeDashoffset: 0 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} />
                    <motion.path d="M 172 40 Q 212 62, 252 62" fill="none" stroke="#a855f7" strokeWidth="2" initial={{ strokeDasharray: "5,15", strokeDashoffset: 20 }} animate={{ strokeDashoffset: 0 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} />
                  </>
                )}
                {ragStep === 'generating' && (
                  <>
                    <motion.path d="M 462 40 H 512" fill="none" stroke="#10b981" strokeWidth="2" initial={{ strokeDasharray: "5,15", strokeDashoffset: 20 }} animate={{ strokeDashoffset: 0 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} />
                    <motion.path d="M 562 40 H 602" fill="none" stroke="#10b981" strokeWidth="2" initial={{ strokeDasharray: "5,15", strokeDashoffset: 20 }} animate={{ strokeDashoffset: 0 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} />
                  </>
                )}
              </svg>

              {/* Node 1: Query */}
              <div className={`w-16 text-center z-10 p-1.5 rounded border transition-all ${ragStep !== 'idle' ? 'bg-indigo-950/20 border-indigo-500 text-indigo-300' : 'bg-[#0e0e14] border-white/[0.04] text-zinc-500'}`}>
                <span className="block font-bold">Query</span>
                <span className="text-[8px] opacity-75">/stdin</span>
              </div>

              {/* Node 2: Router */}
              <div className={`w-12 text-center z-10 p-1 rounded border transition-all ${['parsing', 'retrieving', 'fusing', 'generating', 'done'].includes(ragStep) ? 'bg-indigo-950/20 border-indigo-500 text-indigo-300' : 'bg-[#0e0e14] border-white/[0.04] text-zinc-500'}`}>
                <span className="block font-bold">Router</span>
                <span className="text-[7px] opacity-75">Weights</span>
              </div>

              {/* Parallel Pathways: Dense / Sparse */}
              <div className="flex flex-col gap-3.5 z-10">
                <div className={`w-20 text-center p-1 rounded border transition-all ${['retrieving', 'fusing', 'generating', 'done'].includes(ragStep) ? 'bg-indigo-950/20 border-indigo-400 text-indigo-300 shadow-[0_0_8px_rgba(99,102,241,0.2)]' : 'bg-[#0e0e14] border-white/[0.04] text-zinc-500'}`}>
                  <span className="block font-bold">ChromaDB</span>
                  <span className="text-[7px] opacity-75">Dense cosine</span>
                </div>
                <div className={`w-20 text-center p-1 rounded border transition-all ${['retrieving', 'fusing', 'generating', 'done'].includes(ragStep) ? 'bg-purple-950/20 border-purple-400 text-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.2)]' : 'bg-[#0e0e14] border-white/[0.04] text-zinc-500'}`}>
                  <span className="block font-bold">BM25</span>
                  <span className="text-[7px] opacity-75">Sparse lex</span>
                </div>
              </div>

              {/* Node 4: Linear Fusion Combiner */}
              <div className={`w-12 text-center z-10 p-1 rounded border transition-all ${['fusing', 'generating', 'done'].includes(ragStep) ? 'bg-indigo-950/20 border-indigo-500 text-indigo-300' : 'bg-[#0e0e14] border-white/[0.04] text-zinc-500'}`}>
                <span className="block font-bold">Fusion</span>
                <span className="text-[7px] opacity-75">α = 0.65</span>
              </div>

              {/* Node 5: Grounded Context */}
              <div className={`w-16 text-center z-10 p-1 rounded border transition-all ${['generating', 'done'].includes(ragStep) ? 'bg-emerald-950/20 border-emerald-500 text-emerald-300' : 'bg-[#0e0e14] border-white/[0.04] text-zinc-500'}`}>
                <span className="block font-bold">Context</span>
                <span className="text-[7px] opacity-75">Retrievals</span>
              </div>

              {/* Node 6: Groq LLM */}
              <div className={`w-14 text-center z-10 p-1.5 rounded border transition-all ${['generating', 'done'].includes(ragStep) ? 'bg-emerald-950/20 border-emerald-500 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.2)]' : 'bg-[#0e0e14] border-white/[0.04] text-zinc-500'}`}>
                <span className="block font-bold">Groq LLM</span>
                <span className="text-[7px] opacity-75">Llama-70b</span>
              </div>

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
