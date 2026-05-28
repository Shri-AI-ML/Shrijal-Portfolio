import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, FileText, Check, Copy, Circle, Cpu } from 'lucide-react';

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
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
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
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-zinc-100 selection:bg-indigo-500/20 selection:text-indigo-200">
      {/* Sticky Header with Vercel-like Glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.04] bg-[#07070a]/70 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              onClick={() => scrollToSection('hero')}
              className="text-base font-mono font-bold tracking-wider cursor-pointer flex items-center gap-2 hover:opacity-85 transition-opacity"
            >
              <Cpu className="h-4 w-4 text-indigo-400" />
              <span>SHRIJAL.AI</span>
            </span>
            <div className="hidden md:flex items-center gap-2 border border-emerald-500/10 bg-emerald-500/5 rounded-full px-2.5 py-0.5 text-[10px] text-emerald-400 font-mono">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span>Active Node: Intern 2026</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5 bg-white/[0.02] border border-white/[0.04] p-1 rounded-full">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-xs font-mono px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${activeSection === item.id
                    ? 'bg-white/[0.05] text-white font-semibold shadow-inner'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.01]'
                  }`}
              >
                /{item.label.toLowerCase()}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/ShrijalGoswami"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-zinc-400 hover:text-white transition-colors bg-white/[0.02] border border-white/[0.04] rounded-lg"
              aria-label="Shrijal Goswami's GitHub Profile"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/shrijal-goswami"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-zinc-400 hover:text-white transition-colors bg-white/[0.02] border border-white/[0.04] rounded-lg"
              aria-label="Shrijal Goswami's LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="/Shrijal_Goswami_Resume.pdf"
              download="Shrijal_Goswami_Resume.pdf"
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-[11px] px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              aria-label="Download Shrijal Goswami's Resume PDF"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Resume.pdf</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="/Shrijal_Goswami_Resume.pdf"
              download="Shrijal_Goswami_Resume.pdf"
              className="p-2 bg-white/[0.02] border border-white/[0.04] rounded-lg text-zinc-400"
              aria-label="Download Shrijal Goswami's Resume PDF"
            >
              <FileText className="h-4 w-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white bg-white/[0.02] border border-white/[0.04] rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#07070a]/95 border-b border-white/[0.04] backdrop-blur-lg md:hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left font-mono py-2.5 px-3 rounded-lg text-sm transition-all ${activeSection === item.id
                      ? 'text-indigo-400 bg-indigo-500/5 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                >
                  /{item.label.toLowerCase()}
                </button>
              ))}
              <div className="pt-4 border-t border-white/[0.04] flex justify-around">
                <a
                  href="https://github.com/ShrijalGoswami"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/shrijal-goswami"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area with responsive paddings and high contrast layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 relative z-10">
        {children}
      </main>

      {/* Sleek Cinematic Footer */}
      <footer className="border-t border-white/[0.04] bg-[#09090e]/60 backdrop-blur-md relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <span className="font-mono text-zinc-300 font-bold tracking-wide">SHRIJAL GOSWAMI</span>
            <p className="text-[10px] text-zinc-500 mt-1 font-mono">B.Tech AI/ML @ VIT Bhopal (2024 - 2028)</p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 bg-white/[0.02] border border-white/[0.05] rounded-full py-1 px-4 text-xs font-mono">
              <span className="text-zinc-500 text-[10px]">HOST GATEWAY:</span>
              <span className="text-zinc-300 font-semibold">goswamivansh999@gmail.com</span>
              <button
                onClick={handleCopyEmail}
                className="ml-2 p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Copy Email"
                aria-label="Copy Shrijal Goswami's Email Address to Clipboard"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>
            <p className="text-[9px] text-zinc-600 font-mono tracking-wider">SECURE SHIELD WEB INTERFACES ACTIVE</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1.5 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-[10px]">GATEWAY: OPERATIONAL</span>
            </div>
            <p className="text-[9px] text-zinc-500">© 2026 Shrijal Goswami. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
