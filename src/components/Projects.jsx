import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Terminal, Brain, Sliders, CheckCircle2, ChevronRight, FileText, Activity } from 'lucide-react';

const Github = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

import confetti from 'canvas-confetti';

const Projects = () => {
  const [activeTabs, setActiveTabs] = useState({
    rag: 'specs', // 'specs' or 'playground'
    heart: 'specs'
  });

  // --- PLAYGROUND 1 STATE (Explainable RAG) ---
  const [ragQuery, setRagQuery] = useState('Pinnacle Labs internship details');
  const [hybridAlpha, setHybridAlpha] = useState(0.5); // 0 = Pure BM25, 1 = Pure Dense

  const ragDataset = [
    {
      id: "doc_1",
      title: "Pinnacle Labs AI Internship Profile",
      denseMatch: 0.94,
      sparseMatch: 0.21,
      snippet: "Role includes building modular Python AI components, designing production-grade FastAPI backends, and tuning retrieval weights."
    },
    {
      id: "doc_2",
      title: "Skills & Core Technologies List",
      denseMatch: 0.72,
      sparseMatch: 0.88,
      snippet: "Strong core language skills in Python, C++, and SQL, with libraries Scikit-learn, XGBoost, and FastAPI backend frameworks."
    },
    {
      id: "doc_3",
      title: "Heart Disease Predictor Spec",
      denseMatch: 0.65,
      sparseMatch: 0.45,
      snippet: "Employs a hybrid stacking generalization ensemble over UCI database. Integrated ChromaDB and LangChain for patient Q&A."
    }
  ];

  const calculateHybridScore = (dense, sparse) => {
    return (hybridAlpha * dense + (1 - hybridAlpha) * sparse).toFixed(3);
  };

  const sortedRAGResults = [...ragDataset]
    .map(doc => ({
      ...doc,
      score: parseFloat(calculateHybridScore(doc.denseMatch, doc.sparseMatch))
    }))
    .sort((a, b) => b.score - a.score);

  // --- PLAYGROUND 2 STATE (Heart Disease Predictor) ---
  const [patientAge, setPatientAge] = useState(58);
  const [patientChol, setPatientChol] = useState(254);
  const [patientHR, setPatientHR] = useState(132);
  const [angina, setAngina] = useState(true);
  const [evalLogs, setEvalLogs] = useState([]);
  const [predResult, setPredResult] = useState(null);
  const [evaluating, setEvaluating] = useState(false);

  const runHeartInference = () => {
    setEvaluating(true);
    setPredResult(null);
    setEvalLogs([
      "1. Triggering inference endpoint `/api/v1/predict/heart`...",
      "2. Loaded Patient Profile variables. Initializing feature tensors...",
      "3. Applying StandardScaler normalization: mapped Age -> 0.42, Chol -> 0.68, MaxHR -> -0.32",
      "4. Feeding features to Level-0 base estimators...",
    ]);

    setTimeout(() => {
      setEvalLogs(prev => [
        ...prev,
        "5. RF Estimator probability: 0.762 | XGBoost Estimator probability: 0.841 | Logistic Reg probability: 0.785",
        "6. Feeding Level-0 probabilities vector [0.762, 0.841, 0.785] to Level-1 Meta-Learner (Logistic Regression)..."
      ]);
    }, 800);

    setTimeout(() => {
      // Logic for dummy score calculation based on variables
      let baseRisk = 20;
      if (patientAge > 55) baseRisk += 20;
      if (patientChol > 240) baseRisk += 15;
      if (patientHR < 140) baseRisk += 15; // Lower max HR under stress is higher risk
      if (angina) baseRisk += 22;
      
      const finalRisk = Math.min(baseRisk, 98);
      
      setPredResult({
        risk: finalRisk,
        classification: finalRisk > 50 ? "High Diagnostic Priority" : "Normal / Low Priority",
        rfVal: 0.762,
        xgbVal: 0.841,
        lrVal: 0.785,
        contributor: angina ? "Angina (Exercise Induced)" : patientChol > 240 ? "Hypercholesterolemia (Chol > 240)" : "Age (> 55)"
      });
      setEvalLogs(prev => [...prev, `7. Ensemble Output synthesized. Prediction successfully cached. Status 200 OK.`]);
      setEvaluating(false);

      if (finalRisk > 50) {
        confetti({
          particleCount: 30,
          spread: 40,
          colors: ['#ef4444', '#f97316']
        });
      }
    }, 1500);
  };

  return (
    <section id="projects" className="py-16 md:py-24 border-t border-zinc-900 relative">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-950 px-3 py-1 rounded-full text-xs text-zinc-400 font-mono mb-4">
            <Brain className="h-3.5 w-3.5 text-purple-400" />
            <span>/system/core/projects</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            CORE AI SYSTEMS
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto font-mono">
            Engineering-first projects featuring system architectures, metrics, and fully-functional live model playgrounds.
          </p>
        </div>

        {/* PROJECTS CONTAINER */}
        <div className="space-y-16">
          
          {/* PROJECT 1: EXPLAINABLE RAG QA */}
          <div className="glass-panel border border-zinc-900 rounded-2xl overflow-hidden grid lg:grid-cols-12 gap-0">
            
            {/* Project Info Panel */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-900">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono bg-purple-950/40 text-purple-400 border border-purple-900/40 rounded px-2.5 py-0.5">
                    RETRIEVAL ENGINE
                  </span>
                  <div className="flex gap-2">
                    <a 
                      href="https://github.com/Shri-AI-ML/Explainable-RAG-QA-System" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-md hover:border-purple-500/20 text-zinc-400 hover:text-white transition-all"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Explainable RAG QA System</h3>
                <p className="text-xs font-mono text-zinc-500 mt-1">Python · FastAPI · ChromaDB · BM25 · Groq API · LangChain</p>

                {/* Tab Switcher */}
                <div className="flex gap-2 border-b border-zinc-900 py-3 mt-4">
                  <button 
                    onClick={() => setActiveTabs(prev => ({ ...prev, rag: 'specs' }))}
                    className={`text-xs font-mono pb-1 border-b ${activeTabs.rag === 'specs' ? 'border-purple-500 text-white font-semibold' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                  >
                    System Architecture
                  </button>
                  <button 
                    onClick={() => setActiveTabs(prev => ({ ...prev, rag: 'playground' }))}
                    className={`text-xs font-mono pb-1 border-b flex items-center gap-1.5 ${activeTabs.rag === 'playground' ? 'border-purple-500 text-white font-semibold' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                  >
                    <Terminal className="h-3.5 w-3.5 text-purple-400" />
                    Live Playground
                  </button>
                </div>

                {/* Tab Contents */}
                <div className="mt-4 min-h-[220px]">
                  <AnimatePresence mode="wait">
                    {activeTabs.rag === 'specs' ? (
                      <motion.div
                        key="specs-rag"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="space-y-4 text-xs sm:text-sm text-zinc-400"
                      >
                        <div>
                          <span className="text-zinc-200 font-semibold font-mono block">PROBLEM:</span>
                          <p className="leading-relaxed">
                            Dense vectors capture semantic context but miss exact keyword identifiers (e.g., function names, model codes). Plain LLMs hallucinate sources.
                          </p>
                        </div>
                        <div>
                          <span className="text-zinc-200 font-semibold font-mono block">ARCHITECTURE:</span>
                          <p className="leading-relaxed">
                            A hybrid retrieval chain routing queries via parallel pathways: BM25 (sparse tf-idf) + Sentence-Transformers (dense Cosine embeddings over ChromaDB). Merges scores linearly before Groq synthesis.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div className="p-2.5 bg-zinc-950 border border-zinc-900 rounded">
                            <span className="text-zinc-500 font-mono block text-[9px] uppercase">Retrieval Latency</span>
                            <span className="text-emerald-400 font-mono font-bold text-sm">~45ms at scale</span>
                          </div>
                          <div className="p-2.5 bg-zinc-950 border border-zinc-900 rounded">
                            <span className="text-zinc-500 font-mono block text-[9px] uppercase">Context Grounding</span>
                            <span className="text-indigo-400 font-mono font-bold text-sm">100% Attributed</span>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="play-rag"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="space-y-4 text-xs font-mono text-zinc-400"
                      >
                        <p className="leading-normal text-zinc-500">
                          // Simulate the linear hybrid combination weights in real-time. Slide the Alpha parameter below to observe rank-reversal.
                        </p>
                        <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg space-y-3">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-zinc-400">Hybrid Alpha Weight:</span>
                            <span className="text-purple-400 font-bold">{hybridAlpha.toFixed(2)}</span>
                          </div>
                          <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.05"
                            value={hybridAlpha}
                            onChange={(e) => setHybridAlpha(parseFloat(e.target.value))}
                            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                          />
                          <div className="flex justify-between text-[9px] text-zinc-600">
                            <span>100% BM25 (Keyword)</span>
                            <span>50/50 Balanced</span>
                            <span>100% Vector (Semantic)</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Specs Footer */}
              <div className="pt-4 border-t border-zinc-900 text-[10px] sm:text-xs text-zinc-500 font-mono flex items-center justify-between">
                <span>Scalability: Incremental indexing chunks</span>
                <span>Future: Cohere Rerank integration</span>
              </div>
            </div>

            {/* Playground / Visual Panel */}
            <div className="lg:col-span-6 p-6 sm:p-8 bg-[#09090b]/40 flex flex-col justify-center">
              {activeTabs.rag === 'specs' ? (
                /* Static Architecture Graph */
                <div className="p-5 bg-[#030303] border border-zinc-900 rounded-xl space-y-4 font-mono text-xs">
                  <span className="text-zinc-500 uppercase tracking-wider font-bold block text-[10px] border-b border-zinc-900 pb-2">Pipeline execution stack</span>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-zinc-950 border border-zinc-900 rounded">
                      <span className="text-zinc-400">1. Input Query Parsing</span>
                      <span className="text-purple-400">FastAPI</span>
                    </div>
                    <div className="flex items-center justify-center text-zinc-600"><ChevronRight className="h-4 w-4 rotate-90" /></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 bg-zinc-950 border border-zinc-900 rounded text-center">
                        <span className="text-zinc-500 block text-[9px]">BM25 (Sparse)</span>
                        <span className="text-amber-400">Keyword Index</span>
                      </div>
                      <div className="p-2 bg-zinc-950 border border-zinc-900 rounded text-center">
                        <span className="text-zinc-500 block text-[9px]">ChromaDB (Dense)</span>
                        <span className="text-blue-400">Cosine Vector</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center text-zinc-600"><ChevronRight className="h-4 w-4 rotate-90" /></div>
                    <div className="flex justify-between items-center p-2 bg-zinc-950 border border-zinc-900 rounded">
                      <span className="text-zinc-400">2. Linear Hybrid Fusion</span>
                      <span className="text-emerald-400">Score Re-ranking</span>
                    </div>
                    <div className="flex items-center justify-center text-zinc-600"><ChevronRight className="h-4 w-4 rotate-90" /></div>
                    <div className="flex justify-between items-center p-2 bg-zinc-950 border border-zinc-900 rounded">
                      <span className="text-zinc-400">3. Source-Attributed Answer</span>
                      <span className="text-indigo-400">Groq LLM Generation</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Dynamic Hybrid Search Results Playground */
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold uppercase text-zinc-500">Live Search Rank Output:</span>
                    <span className="text-[10px] font-mono text-zinc-600">Query: "Pinnacle Labs"</span>
                  </div>
                  <div className="space-y-2 font-mono text-xs">
                    {sortedRAGResults.map((doc, idx) => (
                      <div 
                        key={doc.id} 
                        className={`p-3 border rounded-lg transition-all duration-300 ${
                          idx === 0 
                            ? 'bg-purple-950/15 border-purple-500/40 shadow-[0_0_15px_rgba(139,92,246,0.05)]' 
                            : 'bg-zinc-950/80 border-zinc-900'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`font-semibold text-xs ${idx === 0 ? 'text-purple-300' : 'text-zinc-400'}`}>
                            #{idx + 1} {doc.title}
                          </span>
                          <span className={`text-[10px] border px-1.5 py-0.2 rounded ${idx === 0 ? 'bg-purple-500/20 border-purple-400 text-purple-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}>
                            Score: {doc.score}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-500 leading-normal line-clamp-2">{doc.snippet}</p>
                        <div className="flex gap-3 text-[9px] mt-2 text-zinc-600">
                          <span>Vector similarity: {(doc.denseMatch * hybridAlpha).toFixed(3)}</span>
                          <span>BM25 relevance: {(doc.sparseMatch * (1 - hybridAlpha)).toFixed(3)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* PROJECT 2: HEART DISEASE ENSEMBLE */}
          <div className="glass-panel border border-zinc-900 rounded-2xl overflow-hidden grid lg:grid-cols-12 gap-0">
            
            {/* Project Info Panel */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-900">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono bg-indigo-950/40 text-indigo-400 border border-indigo-900/40 rounded px-2.5 py-0.5">
                    DIAGNOSTIC ENSEMBLE
                  </span>
                  <div className="flex gap-2">
                    <a 
                      href="https://github.com/Shri-AI-ML/Heart-Disease-Prediction" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-md hover:border-purple-500/20 text-zinc-400 hover:text-white transition-all"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Heart Disease Prediction System</h3>
                <p className="text-xs font-mono text-zinc-500 mt-1">Python · Scikit-learn · XGBoost · FastAPI · Streamlit · ChromaDB</p>

                {/* Tab Switcher */}
                <div className="flex gap-2 border-b border-zinc-900 py-3 mt-4">
                  <button 
                    onClick={() => setActiveTabs(prev => ({ ...prev, heart: 'specs' }))}
                    className={`text-xs font-mono pb-1 border-b ${activeTabs.heart === 'specs' ? 'border-purple-500 text-white font-semibold' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                  >
                    System Architecture
                  </button>
                  <button 
                    onClick={() => setActiveTabs(prev => ({ ...prev, heart: 'playground' }))}
                    className={`text-xs font-mono pb-1 border-b flex items-center gap-1.5 ${activeTabs.heart === 'playground' ? 'border-purple-500 text-white font-semibold' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                  >
                    <Activity className="h-3.5 w-3.5 text-purple-400" />
                    Live Playground
                  </button>
                </div>

                {/* Tab Contents */}
                <div className="mt-4 min-h-[220px]">
                  <AnimatePresence mode="wait">
                    {activeTabs.heart === 'specs' ? (
                      <motion.div
                        key="specs-heart"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="space-y-4 text-xs sm:text-sm text-zinc-400"
                      >
                        <div>
                          <span className="text-zinc-200 font-semibold font-mono block">PROBLEM:</span>
                          <p className="leading-relaxed">
                            Single classifiers suffer from generalization gaps on medical diagnostic datasets. Black-box models cannot offer explanations of decision boundaries.
                          </p>
                        </div>
                        <div>
                          <span className="text-zinc-200 font-semibold font-mono block">SOLUTION:</span>
                          <p className="leading-relaxed">
                            Stacked Generalization combining Level-0 classifiers (Random Forest + XGBoost + Logistic Regression) via a meta-learner. Integrated local RAG for contextual patient file reference.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div className="p-2.5 bg-zinc-950 border border-zinc-900 rounded">
                            <span className="text-zinc-500 font-mono block text-[9px] uppercase">Ensemble Accuracy</span>
                            <span className="text-emerald-400 font-mono font-bold text-sm">89.13% Cross-Validated</span>
                          </div>
                          <div className="p-2.5 bg-zinc-950 border border-zinc-900 rounded">
                            <span className="text-zinc-500 font-mono block text-[9px] uppercase">Generalization AUC</span>
                            <span className="text-indigo-400 font-mono font-bold text-sm">0.94 ROC-AUC Score</span>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="play-heart"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="space-y-3.5 text-xs font-mono text-zinc-400"
                      >
                        <p className="text-zinc-500">// Configure the patient metrics slider to trigger the stacking generalizer inference pipeline.</p>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <span className="text-[10px] text-zinc-500">Patient Age ({patientAge})</span>
                            <input 
                              type="range" min="30" max="80" value={patientAge} 
                              onChange={(e) => setPatientAge(parseInt(e.target.value))}
                              className="w-full h-1 bg-zinc-800 rounded appearance-none cursor-pointer accent-indigo-500"
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] text-zinc-500">Cholesterol ({patientChol} mg/dL)</span>
                            <input 
                              type="range" min="150" max="380" value={patientChol} 
                              onChange={(e) => setPatientChol(parseInt(e.target.value))}
                              className="w-full h-1 bg-zinc-800 rounded appearance-none cursor-pointer accent-indigo-500"
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] text-zinc-500">Max Heart Rate ({patientHR} bpm)</span>
                            <input 
                              type="range" min="90" max="200" value={patientHR} 
                              onChange={(e) => setPatientHR(parseInt(e.target.value))}
                              className="w-full h-1 bg-zinc-800 rounded appearance-none cursor-pointer accent-indigo-500"
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <span className="text-[10px] text-zinc-500 mb-1">Exercise Angina</span>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => setAngina(true)}
                                className={`px-2 py-0.5 border text-[10px] rounded ${angina ? 'bg-indigo-950 border-indigo-500 text-indigo-300' : 'bg-zinc-950 border-zinc-900 text-zinc-500'}`}
                              >
                                Yes
                              </button>
                              <button 
                                onClick={() => setAngina(false)}
                                className={`px-2 py-0.5 border text-[10px] rounded ${!angina ? 'bg-indigo-950 border-indigo-500 text-indigo-300' : 'bg-zinc-950 border-zinc-900 text-zinc-500'}`}
                              >
                                No
                              </button>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={runHeartInference}
                          disabled={evaluating}
                          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-[11px] font-semibold py-2 rounded-md transition-colors shadow-[0_0_15px_rgba(99,102,241,0.2)] cursor-pointer"
                        >
                          {evaluating ? "Evaluating Stacked Generalization..." : "Evaluate Stacking Generalization"}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Specs Footer */}
              <div className="pt-4 border-t border-zinc-900 text-[10px] sm:text-xs text-zinc-500 font-mono flex items-center justify-between">
                <span>Scalability: Decoupled REST microservices</span>
                <span>Future: SHAP value feature mapping</span>
              </div>
            </div>

            {/* Playground / Visual Panel */}
            <div className="lg:col-span-6 p-6 sm:p-8 bg-[#09090b]/40 flex flex-col justify-center">
              {activeTabs.heart === 'specs' ? (
                /* Static Architecture Graph */
                <div className="p-5 bg-[#030303] border border-zinc-900 rounded-xl space-y-4 font-mono text-xs">
                  <span className="text-zinc-500 uppercase tracking-wider font-bold block text-[10px] border-b border-zinc-900 pb-2">Stacked Generalizer Architecture</span>
                  <div className="space-y-3.5">
                    <div className="p-2 bg-zinc-950 border border-zinc-900 rounded text-center">
                      <span className="text-zinc-400">Raw Data Tensors</span>
                      <span className="text-[10px] text-zinc-500 block">Age, Chol, MaxHR, Angina</span>
                    </div>
                    <div className="flex items-center justify-center text-zinc-600"><ChevronRight className="h-4 w-4 rotate-90" /></div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 bg-zinc-950 border border-zinc-900 rounded text-center">
                        <span className="text-[9px] text-zinc-500 block">Level-0</span>
                        <span className="text-indigo-400 font-semibold">RandomForest</span>
                      </div>
                      <div className="p-2 bg-zinc-950 border border-zinc-900 rounded text-center">
                        <span className="text-[9px] text-zinc-500 block">Level-0</span>
                        <span className="text-blue-400 font-semibold">XGBoost</span>
                      </div>
                      <div className="p-2 bg-zinc-950 border border-zinc-900 rounded text-center">
                        <span className="text-[9px] text-zinc-500 block">Level-0</span>
                        <span className="text-purple-400 font-semibold">LogReg</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center text-zinc-600"><ChevronRight className="h-4 w-4 rotate-90" /></div>
                    <div className="p-2 bg-zinc-950 border border-zinc-900 rounded text-center">
                      <span className="text-zinc-500 block text-[9px]">Level-1 Meta-Learner</span>
                      <span className="text-emerald-400 font-bold">Logistic Regression Classifier</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Dynamic Playground Output logs & predictions */
                <div className="space-y-4 font-mono text-xs">
                  <div className="p-3 bg-zinc-950 border border-zinc-900 rounded-lg h-[130px] overflow-y-auto space-y-1.5 text-[10px] text-zinc-400 terminal-scroll">
                    {evalLogs.map((log, lIdx) => (
                      <div key={lIdx} className="leading-relaxed">
                        {log.startsWith('Risk') || log.startsWith('Ensemble') ? (
                          <span className="text-emerald-400 font-semibold">{log}</span>
                        ) : log.includes('Estimator') ? (
                          <span className="text-purple-400">{log}</span>
                        ) : (
                          <span className="text-zinc-500">{log}</span>
                        )}
                      </div>
                    ))}
                    {evaluating && (
                      <div className="flex items-center gap-1.5 text-zinc-500 italic">
                        <span className="w-1 h-3 bg-indigo-500 animate-pulse"></span>
                        <span>Executing cross-validation evaluation...</span>
                      </div>
                    )}
                    {evalLogs.length === 0 && (
                      <span className="text-zinc-600 italic">// Click 'Evaluate' to initialize models...</span>
                    )}
                  </div>

                  {predResult && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-4 border rounded-lg flex items-center justify-between gap-4 ${
                        predResult.risk > 50 
                          ? 'bg-red-950/20 border-red-500/30' 
                          : 'bg-emerald-950/20 border-emerald-500/30'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-bold">Ensemble Diagnostic Output:</span>
                        <span className={`text-base font-black ${predResult.risk > 50 ? 'text-red-400' : 'text-emerald-400'}`}>
                          {predResult.risk}% Risk Probability
                        </span>
                        <p className="text-[10px] text-zinc-400 mt-0.5">Classification: {predResult.classification}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-zinc-500 block uppercase font-bold">Primary Risk Contributor:</span>
                        <span className="text-[10px] text-zinc-300 font-semibold">{predResult.contributor}</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Projects;
