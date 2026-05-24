import React, { useState } from 'react';
import { Cpu, Code, Database, Sliders, CheckCircle } from 'lucide-react';
import { use3DTilt } from '../hooks/use3DTilt';

const SkillCategoryCard = ({ category, catIdx, hoveredSkill, setHoveredSkill }) => {
  const Icon = category.icon;
  const { tiltStyle, glareStyle, handleMouseMove, handleMouseLeave } = use3DTilt(4, 1.01);

  return (
    <div
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-panel border border-white/[0.04] rounded-xl p-6 hover:border-white/[0.08] transition-all bg-[#0e0e14]/40 flex flex-col justify-between relative overflow-hidden select-none shadow-md min-h-[300px]"
    >
      <div style={{ ...glareStyle, position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }} />

      <div>
        <div className="flex items-center gap-3 mb-6 z-10 relative">
          <div className={`p-2 border rounded-lg ${category.iconColor} z-10 relative`}>
            <Icon className="h-4.5 w-4.5" />
          </div>
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-widest z-10 relative">
            {category.title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 z-10 relative">
          {category.skills.map((skill, skIdx) => {
            const skillKey = `${catIdx}-${skIdx}`;
            const isHovered = hoveredSkill === skillKey;
            
            return (
              <div
                key={skIdx}
                onMouseEnter={() => setHoveredSkill(skillKey)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="relative"
              >
                <span 
                  className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-3 py-1.5 rounded-lg border transition-all duration-300 cursor-help select-none ${
                    isHovered 
                      ? 'bg-indigo-950/20 border-indigo-500/50 text-indigo-350 shadow-[0_0_12px_rgba(99,102,241,0.15)] scale-[1.03]' 
                      : 'bg-[#12121c] border-white/[0.03] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${isHovered ? 'bg-indigo-400' : 'bg-zinc-650'}`}></span>
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Description readout matching active hovered skill */}
      <div className="mt-8 pt-4 border-t border-white/[0.04] min-h-[64px] flex items-center z-10 relative">
        {hoveredSkill && hoveredSkill.startsWith(`${catIdx}-`) ? (
          <div className="flex gap-2.5 items-start text-[11px] text-zinc-405 font-mono animate-fadeIn">
            <CheckCircle className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-zinc-200 font-semibold block mb-0.5">
                {category.skills[parseInt(hoveredSkill.split('-')[1])].name}
              </span>
              <p className="leading-relaxed">
                {category.skills[parseInt(hoveredSkill.split('-')[1])].desc}
              </p>
            </div>
          </div>
        ) : (
          <span className="text-[10px] font-mono text-zinc-600 italic">
            // Hover over a skill node for system details
          </span>
        )}
      </div>
    </div>
  );
};

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillCategories = [
    {
      title: "Generative AI & LLMs",
      icon: Cpu,
      iconColor: "text-purple-400 border-purple-500/10 bg-purple-950/10",
      skills: [
        { name: "LangChain", desc: "Orchestrated dense-sparse retriever routing and LLM QA agent nodes." },
        { name: "RAG Pipelines", desc: "Built end-to-end vector indexers with automated PDF/JSON chunking." },
        { name: "ChromaDB", desc: "Implemented local vector embeddings store with low-memory search." },
        { name: "Groq LLM API", desc: "Integrated Llama-3-70b inference for low-latency streaming text." },
        { name: "Gemini / Vertex AI", desc: "Leveraged Google multimodal features for document-based retrieval." },
        { name: "Prompt Engineering", desc: "Optimized few-shot context injections for medical/clinical QA grounding." },
        { name: "Explainable AI (XAI)", desc: "Traced sparse/dense retrieval weights & feature attribution values." }
      ]
    },
    {
      title: "Applied Machine Learning",
      icon: Sliders,
      iconColor: "text-indigo-400 border-indigo-500/10 bg-indigo-950/10",
      skills: [
        { name: "Scikit-learn", desc: "Designed pipelines containing preprocessing, Scaling, and CV generalization." },
        { name: "XGBoost", desc: "Engineered high-performance gradient boosted classifiers for diagnostic prediction." },
        { name: "Stacking Ensembles", desc: "Generalist ensemble meta-learner combining multiple model predictions." },
        { name: "PyTorch (fundamentals)", desc: "Trained basic multi-layer perceptrons and monitored loss curves." },
        { name: "BM25 scoring", desc: "Sparse text ranking to extract exact keyword matches in QA pipelines." },
        { name: "Sentence-Transformers", desc: "Generated dense embeddings for semantic document vector matches." }
      ]
    },
    {
      title: "Programming & Backend",
      icon: Code,
      iconColor: "text-emerald-400 border-emerald-500/10 bg-emerald-950/10",
      skills: [
        { name: "Python", desc: "Primary language. Written modular libraries, ML scripts, and dev tools." },
        { name: "C++", desc: "Strong conceptual foundations, data structures, and memory mechanics." },
        { name: "SQL", desc: "Relational queries, database structuring, and feature indexing lookup." },
        { name: "FastAPI", desc: "Built fully async REST endpoints for low-latency model inference routing." },
        { name: "Streamlit", desc: "Designed interactive dashboards for mock ML generalizer playgrounds." }
      ]
    },
    {
      title: "Data Engineering & Tools",
      icon: Database,
      iconColor: "text-blue-400 border-blue-500/10 bg-blue-950/10",
      skills: [
        { name: "Pandas & NumPy", desc: "Vectorized data cleaning, feature engineering, and matrix operations." },
        { name: "Matplotlib & Seaborn", desc: "Visualized target correlations, outliers, and AUC-ROC curves." },
        { name: "Google Cloud Platform", desc: "Vertex AI pipeline triggers, API credential setups, and storage." },
        { name: "Git / GitHub", desc: "Branching, collaborative PRs, actions, and open source commits." },
        { name: "VS Code / Jupyter", desc: "Primary development sandbox environments." }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 border-t border-white/[0.04] relative">
      <div className="absolute inset-0 bg-dot-grid opacity-25 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-white/[0.04] bg-[#0e0e14] px-3 py-1 rounded-full text-[10px] text-zinc-400 font-mono mb-4">
            <Sliders className="h-3.5 w-3.5 text-indigo-400" />
            <span>/system/core/arsenal</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            TECH ARSENAL
          </h2>
          <p className="text-xs sm:text-sm text-zinc-450 max-w-xl mx-auto font-mono">
            Hover over a skill badge to inspect concrete deployment cases and project contexts.
          </p>
        </div>

        {/* Modular Category Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIdx) => (
            <SkillCategoryCard 
              key={catIdx}
              category={category}
              catIdx={catIdx}
              hoveredSkill={hoveredSkill}
              setHoveredSkill={setHoveredSkill}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
