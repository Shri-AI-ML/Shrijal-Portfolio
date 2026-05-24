import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Cpu, Server, Check } from 'lucide-react';
import { use3DTilt } from '../hooks/use3DTilt';

const ExperienceCard = ({ exp, idx, isExpanded, toggleExpand }) => {
  const { tiltStyle, glareStyle, handleMouseMove, handleMouseLeave } = use3DTilt(3, 1.008);

  const statusMap = {
    "Pinnacle Labs": { text: "RUNNING", color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10" },
    "Data Science Club, VIT Bhopal": { text: "ACTIVE", color: "text-indigo-400 bg-indigo-500/5 border-indigo-500/10" },
    "AI CLUB - VIT BHOPAL University": { text: "COMPLETE", color: "text-zinc-400 bg-zinc-500/5 border-zinc-500/10" },
    "Kshitiksha Foundation": { text: "COMPLETE", color: "text-zinc-400 bg-zinc-500/5 border-zinc-500/10" }
  };

  const status = statusMap[exp.company] || { text: "COMPLETE", color: "text-zinc-400 bg-zinc-500/5 border-zinc-550/10" };

  return (
    <div className="relative pl-6 md:pl-8 group">
      {/* Visual Pipeline Node Dot */}
      <div 
        className={`absolute -left-[6.5px] top-4 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 z-10 ${
          isExpanded 
            ? 'bg-[#07070a] border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)] scale-110' 
            : 'bg-[#07070a] border-zinc-800 group-hover:border-zinc-500'
        }`}
      />

      {/* Date element for Desktop (left of timeline line) */}
      <div className="hidden md:block absolute right-full mr-8 top-3.5 text-right w-28">
        <span className="text-[10px] font-mono text-zinc-500 block">{exp.duration.split('–')[0]}</span>
        <span className="text-[9px] font-mono text-indigo-400/70 block uppercase tracking-widest">{exp.type}</span>
      </div>

      {/* Interactive 3D Card */}
      <div
        style={tiltStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-panel border border-white/[0.04] rounded-xl overflow-hidden hover:border-white/[0.08] transition-all bg-[#0e0e14]/40 relative shadow-md"
      >
        <div style={{ ...glareStyle, position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }} />

        {/* Card Header clickable bar */}
        <div 
          onClick={() => toggleExpand(idx)}
          className="p-5 flex items-center justify-between cursor-pointer select-none z-10 relative"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">{exp.role}</h3>
              <span className="text-xs text-indigo-400 font-mono font-semibold">@ {exp.company}</span>
              <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${status.color}`}>
                {status.text}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 text-[10px] text-zinc-500 font-mono mt-1.5">
              <span className="md:hidden flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {exp.duration}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {exp.location}
              </span>
            </div>
          </div>

          <button className="text-zinc-500 hover:text-white transition-colors cursor-pointer">
            {isExpanded ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
          </button>
        </div>

        {/* Expandable Details Panel */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-white/[0.04] bg-white/[0.01] z-10 relative"
            >
              <div className="p-5 space-y-4 text-xs sm:text-sm leading-relaxed text-zinc-400 font-normal">
                
                {/* Deliverable list */}
                <ul className="space-y-2.5 list-none pl-0">
                  {exp.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex gap-2.5 items-start">
                      <span className="text-indigo-400 font-mono shrink-0 select-none text-[10px] mt-0.5">▷</span>
                      <span className="text-[11px] sm:text-xs leading-normal">{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* Skill Tags */}
                <div className="pt-3.5 border-t border-white/[0.04]">
                  <span className="text-[9px] font-mono text-zinc-550 uppercase tracking-widest block mb-2">Technologies / Skills Utilized:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="text-[10px] font-mono bg-[#171722] border border-white/[0.04] px-2 py-0.5 rounded text-zinc-350 hover:border-indigo-500/20 hover:text-indigo-400 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const experiences = [
    {
      role: "Artificial Intelligence Intern",
      company: "Pinnacle Labs",
      duration: "May 2026 – Present",
      location: "Kolkata (Remote)",
      type: "Internship",
      details: [
        "Architecting and writing modular Python AI components, directly integrating applied ML workflows with production-grade FastAPI REST backends.",
        "Enhancing and debugging data processing and model inference pipelines — improving code reliability, feature correctness, and deployment speed across development sprints.",
        "Testing hybrid retrieval weights and chunk sizing configurations to minimize latencies at scale."
      ],
      skills: ["Python", "FastAPI", "Applied ML", "RAG Pipelines", "API Design", "Data Pipelines"]
    },
    {
      role: "Active Member",
      company: "Data Science Club, VIT Bhopal",
      duration: "August 2025 – Present",
      location: "VIT Bhopal, India",
      type: "Club Activity",
      details: [
        "Participated in hands-on data workshops, contributing to collaborative projects involving exploratory data analysis (EDA) and data cleansing methods.",
        "Collaborated with peers to design, build, and deploy small-scale predictive models while organizing learning bootcamps for student developer communities."
      ],
      skills: ["Exploratory Data Analysis", "Pandas", "NumPy", "Scikit-learn", "Community Building"]
    },
    {
      role: "Core Member",
      company: "AI CLUB - VIT BHOPAL University",
      duration: "January 2025 – August 2025",
      location: "VIT Bhopal, India",
      type: "Club Activity",
      details: [
        "Engaged in technical discussion groups focusing on deep architectures, generative models, and LLM prompting mechanics.",
        "Assisted in coordinating hackathons and coding contests aimed at fostering AI interest among undergraduate students."
      ],
      skills: ["Machine Learning Fundamentals", "Prompt Engineering", "Hackathon Organization"]
    },
    {
      role: "Content Writer",
      company: "Kshitiksha Foundation",
      duration: "January 2025 – February 2025",
      location: "Remote (NGO)",
      type: "NGO Engagement",
      details: [
        "Researched and created content on animal welfare, women's empowerment, mental health, and social equity to enhance digital outreach.",
        "Coordinated with marketing teams to write engaging blogs, social media snippets, and outreach guides.",
        "Honed technical communication and storytelling skills to translate complex social impact statistics into relatable articles."
      ],
      skills: ["Technical Writing", "Research & Fact-checking", "Digital Storytelling", "Content Strategy"]
    }
  ];

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="experience" className="py-20 border-t border-white/[0.04] relative">
      {/* Grid drift background overlay */}
      <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-white/[0.04] bg-[#0e0e14] px-3 py-1 rounded-full text-[10px] text-zinc-400 font-mono mb-4">
            <Briefcase className="h-3.5 w-3.5 text-indigo-400" />
            <span>/system/log/experience</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white" style={{ fontFamily: 'var(--font-display)' }}>
            CAREER TIMELINE
          </h2>
          <p className="text-xs sm:text-sm text-zinc-550 font-mono mt-2">
            Click on any milestone to inspect technical details and deliverables.
          </p>
        </div>

        {/* Timeline Container with pipeline connection lines */}
        <div className="relative border-l border-zinc-800 ml-4 md:ml-32 space-y-10">
          {experiences.map((exp, idx) => (
            <ExperienceCard
              key={idx}
              exp={exp}
              idx={idx}
              isExpanded={expandedIndex === idx}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
