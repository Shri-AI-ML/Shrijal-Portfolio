import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, FileText, Check, Copy, Circle } from 'lucide-react';

const Github = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { label: 'System', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Terminal', id: 'terminal' },
    { label: 'Timeline', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Certifications', id: 'certifications' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('goswamivansh999@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030303] text-zinc-100 selection:bg-purple-500/30 selection:text-purple-200">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-900 bg-[#030303]/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span 
              onClick={() => scrollToSection('hero')} 
              className="text-lg font-mono font-bold tracking-tight cursor-pointer flex items-center gap-2"
            >
              <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
              SHRIJAL.AI
            </span>
            <div className="hidden md:flex items-center gap-2 border border-zinc-800/80 bg-zinc-950/60 rounded-full px-3 py-1 text-xs text-zinc-400">
              <Circle className="h-2 w-2 fill-emerald-500 text-emerald-500 animate-ping" />
              <span>Available for Internships 2026</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-mono transition-colors hover:text-white ${
                  activeSection === item.id ? 'text-purple-400' : 'text-zinc-400'
                }`}
              >
                /{item.label.toLowerCase()}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com/Shri-AI-ML"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/shrijalgoswami"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-white transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="/Shrijal_Goswami_Resume.pdf"
              download="Shrijal_Goswami_Resume.pdf"
              className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-purple-500/30 hover:bg-purple-950/10 text-xs font-mono px-4 py-2 rounded-md transition-all"
            >
              <FileText className="h-4 w-4 text-purple-400" />
              <span>Resume.pdf</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <a
              href="/Shrijal_Goswami_Resume.pdf"
              download="Shrijal_Goswami_Resume.pdf"
              className="p-2 bg-zinc-950 border border-zinc-800 rounded-md text-zinc-400"
            >
              <FileText className="h-4 w-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#030303]/95 border-b border-zinc-900 backdrop-blur-lg md:hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left font-mono py-2 text-base transition-colors ${
                    activeSection === item.id ? 'text-purple-400 border-l-2 border-purple-500 pl-2' : 'text-zinc-400'
                  }`}
                >
                  /{item.label.toLowerCase()}
                </button>
              ))}
              <div className="pt-4 border-t border-zinc-900 flex justify-around">
                <a
                  href="https://github.com/Shri-AI-ML"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
                >
                  <Github className="h-5 w-5" /> GitHub
                </a>
                <a
                  href="https://linkedin.com/in/shrijalgoswami"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
                >
                  <Linkedin className="h-5 w-5" /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
        {children}
      </main>

      {/* Sleek Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/40 relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="font-mono text-zinc-300 font-bold">SHRIJAL GOSWAMI</span>
            <p className="text-xs text-zinc-500 mt-1 font-mono">B.Tech AI/ML @ VIT Bhopal (2024 - 2028)</p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 rounded-full py-1 px-4 text-xs font-mono">
              <span className="text-zinc-500">EMAIL:</span>
              <span className="text-zinc-300">goswamivansh999@gmail.com</span>
              <button 
                onClick={handleCopyEmail} 
                className="ml-2 p-1 text-zinc-500 hover:text-white transition-colors"
                title="Copy Email"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>
            <p className="text-[10px] text-zinc-600 font-mono">Designed for Recruitment & Open Source Collaboration</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-emerald-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>SYSTEM: OPERATIONAL</span>
            </div>
            <p className="text-[10px] text-zinc-500">© 2026 Shrijal Goswami. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
