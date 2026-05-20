import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Link as LinkIcon, Users, FileText } from 'lucide-react';

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState(0); // First item expanded by default

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
    <section id="experience" className="py-16 md:py-24 border-t border-zinc-900 relative">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-950 px-3 py-1 rounded-full text-xs text-zinc-400 font-mono mb-4">
            <Briefcase className="h-3.5 w-3.5 text-purple-400" />
            <span>/system/log/experience</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: 'var(--font-display)' }}>
            CAREER TIMELINE
          </h2>
          <p className="text-sm text-zinc-500 font-mono mt-2">
            Click on any milestone to inspect technical details and deliverables.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative border-l border-zinc-800 ml-4 md:ml-32 space-y-12">
          {experiences.map((exp, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div key={idx} className="relative pl-6 md:pl-8 group">
                
                {/* Timeline node */}
                <div 
                  className={`absolute -left-[6.5px] top-1.5 w-3 h-3 rounded-full border transition-all duration-300 ${
                    isExpanded 
                      ? 'bg-purple-500 border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)] scale-125' 
                      : 'bg-zinc-950 border-zinc-800 group-hover:border-zinc-500'
                  }`}
                />

                {/* Date element for Desktop (floated left of line) */}
                <div className="hidden md:block absolute right-full mr-8 top-1 text-right w-24">
                  <span className="text-xs font-mono text-zinc-500 block">{exp.duration.split('–')[0]}</span>
                  <span className="text-[10px] font-mono text-purple-400/70 block uppercase tracking-wider">{exp.type}</span>
                </div>

                {/* Experience Card */}
                <div className="glass-panel border border-zinc-900/80 rounded-xl overflow-hidden hover:border-zinc-800 transition-all">
                  
                  {/* Card Header clickable bar */}
                  <div 
                    onClick={() => toggleExpand(idx)}
                    className="p-5 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{exp.role}</h3>
                        <span className="text-xs text-purple-400 font-mono">@ {exp.company}</span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 font-mono mt-1">
                        <span className="md:hidden flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {exp.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {exp.location}
                        </span>
                      </div>
                    </div>

                    <button className="text-zinc-500 hover:text-white transition-colors">
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                  </div>

                  {/* Expandable Body */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden border-t border-zinc-900/80 bg-zinc-950/20"
                      >
                        <div className="p-5 space-y-4 text-sm leading-relaxed text-zinc-400">
                          
                          {/* Deliverable list */}
                          <ul className="space-y-2.5 list-none pl-0">
                            {exp.details.map((detail, dIdx) => (
                              <li key={dIdx} className="flex gap-2.5 items-start">
                                <span className="text-purple-500 font-mono shrink-0 select-none">▷</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Skill Tags */}
                          <div className="pt-3 border-t border-zinc-900/60">
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">Technologies / Skills Utilized:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {exp.skills.map((skill, sIdx) => (
                                <span 
                                  key={sIdx}
                                  className="text-xs font-mono bg-zinc-900/80 border border-zinc-800/80 px-2 py-0.5 rounded text-zinc-300 hover:border-purple-500/20 hover:text-purple-400 transition-colors"
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
          })}
        </div>

      </div>
    </section>
  );
};

export default Experience;
