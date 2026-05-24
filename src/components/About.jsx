import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Compass, Code, BrainCircuit, HeartHandshake, Eye } from 'lucide-react';
import { use3DTilt } from '../hooks/use3DTilt';

const ExploreCard = ({ item }) => {
  const Icon = item.icon;
  const { tiltStyle, glareStyle, handleMouseMove, handleMouseLeave } = use3DTilt(5, 1.015);

  return (
    <div
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="p-4 bg-[#0e0e14]/90 border border-white/[0.04] rounded-xl flex gap-4 relative overflow-hidden transition-shadow select-none shadow-md"
    >
      {/* Dynamic Glare Reflector */}
      <div 
        style={{
          ...glareStyle,
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 5
        }} 
      />

      <div className="p-2.5 bg-[#171722] border border-white/[0.04] rounded-lg text-indigo-400 shrink-0 self-start z-10">
        <Icon className="h-4.5 w-4.5" />
      </div>
      
      <div className="space-y-1.5 z-10 flex-1">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-xs sm:text-sm font-semibold text-zinc-200">{item.title}</h4>
          <span className={`text-[9px] px-2 py-0.5 rounded-full border font-mono ${item.statusColor}`}>
            {item.status}
          </span>
        </div>
        <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed">
          {item.desc}
        </p>
      </div>
    </div>
  );
};

const About = () => {
  const explorations = [
    {
      title: "Explainable AI (XAI)",
      desc: "Demystifying deep architectures and stacking ensembles for clinical and regulatory auditability. Focus on feature mapping and cross-validated generalization.",
      status: "Researching",
      statusColor: "text-amber-400 bg-amber-500/5 border-amber-500/10",
      icon: Eye
    },
    {
      title: "Retrieval Systems (RAG)",
      desc: "Optimizing hybrid retrievers (dense vector search + sparse BM25) and indexing schemas to reduce token costs and retrieval latency at production scale.",
      status: "Implementing",
      statusColor: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10",
      icon: BrainCircuit
    },
    {
      title: "Multimodal AI & Agents",
      desc: "Exploring document understanding using multimodal models (Gemini Pro, Vertex AI) and building multi-agent setups via workflow graphs.",
      status: "Exploring",
      statusColor: "text-purple-400 bg-purple-500/5 border-purple-500/10",
      icon: Compass
    },
    {
      title: "Production ML Systems",
      desc: "Designing decoupled microservices using FastAPI backends and writing modular, test-validated Python pipelines tailored for easy cloud deployment.",
      status: "Deploying",
      statusColor: "text-blue-400 bg-blue-500/5 border-blue-500/10",
      icon: Code
    }
  ];

  return (
    <section id="about" className="py-20 border-t border-white/[0.04] relative">
      
      {/* Decorative Blur Glows */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-indigo-500/5 filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/5 filter blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          
          {/* Bio Column */}
          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 border border-white/[0.04] bg-[#0e0e14] px-3 py-1 rounded-full text-[10px] text-zinc-400 font-mono">
              <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
              <span>/profile/bio</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white" style={{ fontFamily: 'var(--font-display)' }}>
              THE BUILDER MINDSET
            </h2>
            
            <div className="space-y-4 text-zinc-400 leading-relaxed text-sm sm:text-base font-normal">
              <p>
                I'm the kind of engineer who sees a real-world problem and instantly starts thinking, 
                <span className="text-white font-medium"> "Can AI solve this?"</span> Currently pursuing my B.Tech 
                in Computer Science with specialization in <span className="text-indigo-400 font-medium">Artificial Intelligence & Machine Learning</span> at 
                VIT Bhopal, I'm focused on building systems that go beyond training scripts and create measurable impact.
              </p>
              <p>
                From tuning sparse-dense hybrid retrieval ratios to training cross-validated stacking ensembles, 
                I love digging into the data pipeline to understand how small structural changes influence system 
                reproducibility and clinical accuracy. Lately, my weeks are spent designing modular FastAPI backends, 
                collaborating in open source (GSSoC '26 Contributor), and debugging code at 2 AM.
              </p>
              <p>
                Whether I am collaborating with researchers or integrating models into web products as an intern 
                at <span className="text-white font-medium">Pinnacle Labs</span>, my goal is to bridge the gap between academic research 
                and production-grade implementations.
              </p>
            </div>
            
            {/* Direct recruiter pitch */}
            <div className="border border-indigo-500/10 bg-indigo-500/5 rounded-xl p-5 flex items-start gap-4">
              <HeartHandshake className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-zinc-200">What I bring to a team:</h4>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  A strong grasp of Python core architectures, practical ML workflows (Scikit-Learn, XGBoost), 
                  LLM integrations (LangChain, Groq API, Vertex AI), and a natural curiosity that drives me 
                  to learn, build, and deploy.
                </p>
              </div>
            </div>
          </div>

          {/* Currently Exploring Grid */}
          <div className="md:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 border border-white/[0.04] bg-[#0e0e14] px-3 py-1 rounded-full text-[10px] text-zinc-400 font-mono">
              <Compass className="h-3.5 w-3.5 text-purple-400" />
              <span>/profile/focus</span>
            </div>
            
            <h3 className="text-xs font-mono text-zinc-400 font-semibold uppercase tracking-wider">
              Currently Exploring
            </h3>
            
            <div className="space-y-3.5">
              {explorations.map((item, idx) => (
                <ExploreCard key={idx} item={item} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
