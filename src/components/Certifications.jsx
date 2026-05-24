import React from 'react';
import { Award, ShieldCheck, GitCommit, FileCheck } from 'lucide-react';
import { use3DTilt } from '../hooks/use3DTilt';

const AchievementCard = ({ item }) => {
  const Icon = item.icon;
  const { tiltStyle, glareStyle, handleMouseMove, handleMouseLeave } = use3DTilt(4, 1.01);

  return (
    <div
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="p-6 bg-[#0e0e14]/90 border border-white/[0.04] rounded-xl transition-all relative flex flex-col justify-between overflow-hidden select-none shadow-md"
    >
      {/* Glare layer */}
      <div style={{ ...glareStyle, position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }} />

      <div className="z-10">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div className="p-3 bg-[#171722] border border-white/[0.04] rounded-lg text-indigo-400">
            <Icon className="h-5 w-5" />
          </div>
          <span className={`text-[9px] font-mono font-semibold px-2.5 py-0.5 rounded border uppercase tracking-wider ${item.color}`}>
            {item.badge}
          </span>
        </div>
        
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{item.title}</h3>
        <span className="text-[10px] text-zinc-550 font-mono block mt-0.5">{item.host}</span>
        <p className="text-[11px] sm:text-xs text-zinc-450 mt-3 leading-relaxed">{item.desc}</p>
      </div>
    </div>
  );
};

const CertificateCard = ({ cert }) => {
  const { tiltStyle, glareStyle, handleMouseMove, handleMouseLeave } = use3DTilt(3, 1.008);

  return (
    <div
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="p-4 bg-[#0e0e14]/90 border border-white/[0.04] rounded-lg flex flex-col justify-between hover:border-white/[0.08] relative overflow-hidden transition-all select-none shadow-sm"
    >
      {/* Glare layer */}
      <div style={{ ...glareStyle, position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }} />

      <div className="z-10">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-[8px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider ${cert.color}`}>
            {cert.tag}
          </span>
          <FileCheck className="h-4 w-4 text-zinc-650" />
        </div>
        
        <h4 className="text-xs sm:text-sm font-bold text-zinc-200 leading-snug">{cert.title}</h4>
        <span className="text-[9px] text-zinc-550 font-mono block mt-1">{cert.issuer}</span>
        <p className="text-[10px] text-zinc-500 leading-normal mt-2.5">{cert.details}</p>
      </div>
    </div>
  );
};

const Certifications = () => {
  const achievements = [
    {
      title: "DataForge Hackathon Finalist",
      host: "IITR E-Summit '26 · VIT Bhopal",
      desc: "Reached the final stage of the flagship hackathon, building scalable ML solutions and pitching models to startup founders.",
      badge: "Finalist Award",
      color: "text-amber-400 bg-amber-500/5 border-amber-500/10",
      icon: Award
    },
    {
      title: "GSSoC '26 Contributor",
      host: "GirlScript Summer of Code",
      desc: "Contributed to community open source projects, reviewing pull requests, solving code syntax issues, and upgrading libraries in Python frameworks.",
      badge: "Open Source Contributor",
      color: "text-purple-400 bg-purple-500/5 border-purple-500/10",
      icon: GitCommit
    }
  ];

  const certificates = [
    {
      title: "Applied Machine Learning in Python",
      issuer: "University of Michigan (Coursera)",
      details: "Covers data representations, classification generalizers, evaluation metrics (AUC-ROC, F1), clustering, and feature selection strategies.",
      tag: "ML Core",
      color: "border-blue-900/30 text-blue-400 bg-blue-950/10"
    },
    {
      title: "Inspect Rich Documents with Gemini Multimodality",
      issuer: "Google Cloud Skills Boost",
      details: "Tuned multimodal prompt chains to parse PDFs, extracts structure from messy tables, and maps vectors for document question-answering.",
      tag: "GenAI / RAG",
      color: "border-purple-900/30 text-purple-400 bg-purple-950/10"
    },
    {
      title: "Build Real-World AI Apps with Gemini & Imagen",
      issuer: "Google Cloud Skills Boost",
      details: "Engineered web templates with API interfaces executing Gemini text inferences and Imagen pixel generations.",
      tag: "GenAI / Cloud",
      color: "border-indigo-900/30 text-indigo-400 bg-indigo-950/10"
    },
    {
      title: "Introduction to Data Science in Python",
      issuer: "University of Michigan (Coursera)",
      details: "Covers cleaning tabular datasets using Pandas series/frames, cleaning structures, and executing basic statistical regressions.",
      tag: "Data Science",
      color: "border-emerald-900/30 text-emerald-400 bg-emerald-950/10"
    }
  ];

  return (
    <section id="certifications" className="py-20 border-t border-white/[0.04] relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-white/[0.04] bg-[#0e0e14] px-3 py-1 rounded-full text-[10px] text-zinc-400 font-mono mb-4">
            <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
            <span>/system/credentials</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            ACHIEVEMENTS & DEGREES
          </h2>
          <p className="text-xs sm:text-sm text-zinc-450 max-w-xl mx-auto font-mono">
            Industry accreditations and competitive coding highlights confirming AI competency.
          </p>
        </div>

        {/* Top Achievements (GSSOC, DataForge) */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {achievements.map((item, idx) => (
            <AchievementCard key={idx} item={item} />
          ))}
        </div>

        {/* Bottom Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certificates.map((cert, idx) => (
            <CertificateCard key={idx} cert={cert} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certifications;
