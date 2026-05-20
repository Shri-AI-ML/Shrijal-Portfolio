import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Flame, GitCommit, FileCheck } from 'lucide-react';

const Certifications = () => {
  const achievements = [
    {
      title: "DataForge Hackathon Finalist",
      host: "IITR E-Summit '26 · VIT Bhopal",
      desc: "Reached the final stage of the flagship hackathon, building scalable ML solutions and pitching models to startup founders.",
      badge: "Finalist Award",
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      icon: Award
    },
    {
      title: "GSSoC '26 Contributor",
      host: "GirlScript Summer of Code",
      desc: "Contributed to community open source projects, reviewing pull requests, solving code syntax issues, and upgrading libraries in Python frameworks.",
      badge: "Open Source Contributor",
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      icon: GitCommit
    }
  ];

  const certificates = [
    {
      title: "Applied Machine Learning in Python",
      issuer: "University of Michigan (Coursera)",
      details: "Covers data representations, classification generalizers, evaluation metrics (AUC-ROC, F1), clustering, and feature selection strategies.",
      tag: "ML Core",
      color: "border-blue-900/40 text-blue-400 bg-blue-950/10"
    },
    {
      title: "Inspect Rich Documents with Gemini Multimodality",
      issuer: "Google Cloud Skills Boost",
      details: "Tuned multimodal prompt chains to parse PDFs, extracts structure from messy tables, and maps vectors for document question-answering.",
      tag: "GenAI / RAG",
      color: "border-purple-900/40 text-purple-400 bg-purple-950/10"
    },
    {
      title: "Build Real-World AI Apps with Gemini & Imagen",
      issuer: "Google Cloud Skills Boost",
      details: "Engineered web templates with API interfaces executing Gemini text inferences and Imagen pixel generations.",
      tag: "GenAI / Cloud",
      color: "border-indigo-900/40 text-indigo-400 bg-indigo-950/10"
    },
    {
      title: "Introduction to Data Science in Python",
      issuer: "University of Michigan (Coursera)",
      details: "Covers cleaning tabular datasets using Pandas series/frames, cleaning structures, and executing basic statistical regressions.",
      tag: "Data Science",
      color: "border-emerald-900/40 text-emerald-400 bg-emerald-950/10"
    }
  ];

  return (
    <section id="certifications" className="py-16 md:py-24 border-t border-zinc-900 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-950 px-3 py-1 rounded-full text-xs text-zinc-400 font-mono mb-4">
            <ShieldCheck className="h-3.5 w-3.5 text-purple-400" />
            <span>/system/credentials</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            ACHIEVEMENTS & DEGREES
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto font-mono">
            Industry accreditations and competitive coding highlights confirming AI competency.
          </p>
        </div>

        {/* Top Achievements (GSSOC, DataForge) */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {achievements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4, borderColor: 'rgba(168, 85, 247, 0.3)' }}
                className="p-6 bg-zinc-950 border border-zinc-900 rounded-xl transition-all relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-purple-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded border ${item.color}`}>
                      {item.badge}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
                  <span className="text-xs text-zinc-500 font-mono block mt-0.5">{item.host}</span>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-3 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certificates.map((cert, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg flex flex-col justify-between hover:border-zinc-800 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${cert.color}`}>
                    {cert.tag}
                  </span>
                  <FileCheck className="h-4 w-4 text-zinc-600" />
                </div>
                
                <h4 className="text-xs sm:text-sm font-bold text-zinc-200 leading-snug">{cert.title}</h4>
                <span className="text-[10px] text-zinc-500 font-mono block mt-1">{cert.issuer}</span>
                <p className="text-[11px] text-zinc-500 leading-normal mt-2.5">{cert.details}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certifications;
