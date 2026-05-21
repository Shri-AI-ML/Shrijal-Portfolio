import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Database, Cpu, Search, Sparkles, RefreshCw, Send, ArrowRight } from 'lucide-react';

const RAGTerminal = () => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const [retrievedChunks, setRetrievedChunks] = useState([]);
  const terminalEndRef = useRef(null);
  const terminalContainerRef = useRef(null);
  const shouldAutoScrollRef = useRef(true);

  // Hardcoded resume database chunks
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

  // Quick query configurations
  const quickQueries = [
    { label: "get_experience()", query: "get_experience" },
    { label: "get_skills()", query: "get_skills" },
    { label: "get_projects()", query: "get_projects" },
    { label: "explainable_ai_why()", query: "explainable_ai_why" }
  ];

  useEffect(() => {
    // Initial logs on load
    setLogs([
      { type: 'sys', text: 'Initializing Shrijal-RAG-VectorDB (ChromaDB emulator v0.4.1)...' },
      { type: 'sys', text: 'Loading 5 document chunks from Shrijal_Goswami_Resume.pdf...' },
      { type: 'success', text: 'Index ready. Hybrid Retriever (BM25 sparse + Dense Vector) online.' },
      { type: 'sys', text: 'Type a query below or select a helper function to test the retrieval pipeline.' }
    ]);
  }, []);

  // Auto-scroll logic: only scroll if the user is already near the bottom
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
      // Allow a 50px buffer zone to detect if the user is at/near the bottom
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;
      shouldAutoScrollRef.current = isNearBottom;
    }
  };

  useEffect(() => {
    if (shouldAutoScrollRef.current) {
      // Use instant scroll during rapid streaming to prevent lag/stacking scroll events,
      // and smooth scroll for general layout updates.
      const behavior = currentResponse ? 'auto' : 'smooth';
      scrollToBottom(behavior);
    }
  }, [logs, currentResponse, retrievedChunks]);

  const processQuery = (queryText) => {
    if (isTyping || !queryText.trim()) return;

    const normalizedQuery = queryText.toLowerCase().trim();
    
    // Force auto-scroll to resume on new query execution
    shouldAutoScrollRef.current = true;

    // Add user query to logs
    setLogs(prev => [...prev, { type: 'user', text: queryText }]);
    setIsTyping(true);
    setCurrentResponse('');
    setRetrievedChunks([]);

    // 1. Simulate Vector + BM25 Retrieval Steps
    setTimeout(() => {
      setLogs(prev => [...prev, { type: 'sys', text: `[RAG] Parsing query: "${queryText}"` }]);
    }, 300);

    setTimeout(() => {
      setLogs(prev => [...prev, { type: 'retrieving', text: '[Retrieval] Scanning database... Running sparse BM25 scoring & dense Cosine distance calculation...' }]);
    }, 700);

    // 2. Perform mock retrieval scoring
    setTimeout(() => {
      let matchedChunks = [];
      let llmAnswer = "";

      if (normalizedQuery.includes('experience') || normalizedQuery.includes('intern') || normalizedQuery.includes('pinnacle')) {
        matchedChunks = [
          { ...dbChunks[0], score: 0.941, method: "Vector (Cosine)" },
          { ...dbChunks[4], score: 0.725, method: "BM25" }
        ];
        llmAnswer = "Shrijal is currently working as an Artificial Intelligence Intern at Pinnacle Labs (starting May 2026). In this remote role, he designs modular Python AI components, creates production-ready FastAPI endpoints, and debugs ML pipelines to optimize feature accuracy and execution speed. Additionally, he is an active student researcher and community contributor at VIT Bhopal, participating in the Data Science and AI Clubs.";
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
        llmAnswer = "Shrijal has engineered several notable AI/ML systems. First is the Explainable RAG QA System, featuring a dense-sparse hybrid retriever on ChromaDB and Groq LLM with incremental indexing to speed up data updates. Second is the Heart Disease Prediction System, a hybrid stacking ensemble (Random Forest, XGBoost, Logistic Regression) with 89.13% accuracy and 0.94 AUC, which includes a RAG layer for clinical contextual queries.";
      } else if (normalizedQuery.includes('explain') || normalizedQuery.includes('xai') || normalizedQuery.includes('why')) {
        matchedChunks = [
          { ...dbChunks[4], score: 0.887, method: "Vector (Cosine)" },
          { ...dbChunks[2], score: 0.741, method: "BM25" }
        ];
        llmAnswer = "Explainable AI (XAI) is critical in high-stakes domains like medicine and finance. Shrijal implements this by providing source-attribution in his RAG pipelines, and combining his Heart Disease Prediction ensemble with generalized stacking cross-validation and feature-importance indicators. This ensures clinical decisions are backed by inspectable math and features, not just black-box predictions.";
      } else {
        // Fallback search
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

      // 3. Stream LLM Response
      setTimeout(() => {
        setLogs(prev => [...prev, { type: 'sys', text: '[LLM] Stream response init... Groq-LLM-llama3-70b-preview (grounded)' }]);
        
        let index = 0;
        const interval = setInterval(() => {
          if (index < llmAnswer.length) {
            setCurrentResponse(prev => prev + llmAnswer.charAt(index));
            index += 2; // Stream 2 chars at a time for speed
          } else {
            clearInterval(interval);
            setIsTyping(false);
            setLogs(prev => [...prev, { type: 'assistant', text: llmAnswer }]);
            setCurrentResponse('');
          }
        }, 15);
      }, 500);

    }, 1400);

    setInputVal('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      processQuery(inputVal);
    }
  };

  return (
    <section id="terminal" className="py-16 md:py-24 border-t border-zinc-900 relative">
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
      
      {/* Glow overlays */}
      <div className="absolute top-1/3 left-10 glow-overlay-purple opacity-40" />
      <div className="absolute bottom-1/3 right-10 glow-overlay-blue opacity-40" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            INTERACTIVE AI TERMINAL
          </h2>
          <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto font-mono">
            Directly test a simulated <strong>Retrieval-Augmented Generation (RAG)</strong> pipeline indexing Shrijal's credentials.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="glass-panel border border-zinc-800/80 rounded-xl overflow-hidden shadow-2xl relative z-10">
          
          {/* Header Bar */}
          <div className="bg-[#09090b] px-4 py-3 flex items-center justify-between border-b border-zinc-900/80">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
              <span className="text-xs font-mono text-zinc-500 ml-2">shrijal-goswami-rag-agent v1.0.0</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400/90 bg-emerald-950/20 border border-emerald-900/40 rounded px-2 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>VECTOR DB ONLINE</span>
            </div>
          </div>

          {/* Terminal Console */}
          <div 
            ref={terminalContainerRef}
            onScroll={handleScroll}
            className="p-6 h-[400px] overflow-y-auto font-mono text-sm space-y-4 terminal-scroll bg-[#030303]/90"
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
                    <span className="text-purple-400">guest@shrijal.ai:~$</span>
                    <span>{log.text}</span>
                  </div>
                )}
                {log.type === 'retrieving' && (
                  <div className="flex items-center gap-2 text-zinc-400 text-xs italic">
                    <RefreshCw className="h-3 w-3 animate-spin text-purple-400" />
                    <span>{log.text}</span>
                  </div>
                )}
                {log.type === 'retrieved' && (
                  <span className="text-blue-400 text-xs">{log.text}</span>
                )}
                {log.type === 'retrieved-chunk' && (
                  <div className="my-2 p-3 bg-zinc-900/50 border border-zinc-800 rounded text-xs text-zinc-400">
                    {log.text}
                  </div>
                )}
                {log.type === 'assistant' && (
                  <div className="text-zinc-300 pl-4 border-l border-purple-500/30 py-1">
                    <span className="text-purple-400 text-xs block mb-1">RAG_RESPONSE:</span>
                    {log.text}
                  </div>
                )}
              </div>
            ))}

            {/* Display active stream */}
            {currentResponse && (
              <div className="text-zinc-300 pl-4 border-l border-purple-500/30 py-1">
                <span className="text-purple-400 text-xs block mb-1">RAG_RESPONSE (streaming):</span>
                {currentResponse}
                <span className="w-1.5 h-4 bg-purple-500 inline-block animate-pulse ml-0.5 align-middle"></span>
              </div>
            )}

            {/* Display retrieved vector chunks in real time */}
            {retrievedChunks.length > 0 && !currentResponse && isTyping && (
              <div className="space-y-2 py-1">
                <span className="text-zinc-500 text-xs uppercase tracking-wider block font-bold">
                  <Database className="h-3 w-3 inline mr-1 text-blue-500" /> Retrieved Context Chunks:
                </span>
                <div className="grid gap-2 sm:grid-cols-2">
                  {retrievedChunks.map((c, i) => (
                    <div key={i} className="p-3 bg-zinc-950 border border-zinc-900 rounded-md text-xs hover:border-purple-500/20 transition-all">
                      <div className="flex items-center justify-between mb-1 text-zinc-500">
                        <span className="font-semibold text-purple-400/90">{c.source}</span>
                        <span className="text-[10px] bg-purple-950/40 text-purple-400 border border-purple-900/40 rounded px-1">
                          {c.method} · Score: {c.score.toFixed(3)}
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
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping"></span>
                <span>Synthesizing output context...</span>
              </div>
            )}
            <div ref={terminalEndRef} />
          </div>

          {/* Quick Query Helpers */}
          <div className="px-6 py-3 border-t border-zinc-900/60 bg-zinc-950/30 flex flex-wrap gap-2 items-center">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mr-2">Quick Commands:</span>
            {quickQueries.map((q, idx) => (
              <button
                key={idx}
                disabled={isTyping}
                onClick={() => processQuery(q.query)}
                className="text-[11px] font-mono bg-zinc-900/80 hover:bg-purple-950/20 border border-zinc-800 hover:border-purple-500/30 text-purple-400 hover:text-purple-300 py-1 px-2.5 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input Prompt Box */}
          <div className="p-4 border-t border-zinc-900 bg-[#09090b] flex items-center gap-3">
            <span className="text-sm font-mono text-zinc-500 pl-2">guest@shrijal.ai:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isTyping}
              placeholder="Ask about my experience, skills, projects, explainability..."
              className="flex-1 bg-transparent border-0 outline-none text-zinc-100 font-mono text-sm placeholder:text-zinc-600 focus:ring-0"
            />
            <button
              onClick={() => processQuery(inputVal)}
              disabled={isTyping || !inputVal.trim()}
              className="p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RAGTerminal;
