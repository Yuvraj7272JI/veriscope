import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { ShieldCheck, Wifi, WifiOff, Settings2, Menu, X, Sparkles, ChevronRight } from 'lucide-react';

export default function Navbar({ backendHealth, onOpenSettings, onScrollToAnalyze }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Analyze', href: '#analyze' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Benchmarks', href: '#benchmarks' },
    { name: 'About', href: '#about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08090D]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/50 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#home" className="group">
            <Logo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#10121A]/60 border border-white/[0.06] rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-sm font-medium text-text-secondary hover:text-white hover:bg-white/[0.05] rounded-full transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Area */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Backend Connectivity Status Badge */}
            <button
              onClick={onOpenSettings}
              title="Click to configure backend connection"
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                backendHealth.online
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
              }`}
            >
              <span className="relative flex h-2 w-2">
                {backendHealth.online ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </>
                ) : (
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                )}
              </span>
              <span>{backendHealth.online ? 'AI Engine Ready' : 'Backend Config'}</span>
              <Settings2 className="w-3.5 h-3.5 opacity-60 ml-0.5" />
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onScrollToAnalyze}
              className="relative group overflow-hidden px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/40 transition-all active:scale-95 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Verifying</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenSettings}
              className="p-2 text-text-secondary hover:text-white rounded-lg bg-[#10121A] border border-white/10"
              aria-label="Settings"
            >
              <Settings2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-text-secondary hover:text-white rounded-lg bg-[#10121A] border border-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-4 pb-4 bg-[#10121A]/95 border-b border-white/10 backdrop-blur-xl">
          <div className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSettings();
                }}
                className="flex items-center justify-between px-4 py-2 text-xs font-medium text-text-secondary bg-[#141724] rounded-lg border border-white/5"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${backendHealth.online ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span>{backendHealth.online ? 'Backend Engine Online' : 'Check Backend Config'}</span>
                </div>
                <Settings2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onScrollToAnalyze();
                }}
                className="w-full py-2.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-brand-blue to-brand-purple text-white text-center shadow-lg shadow-brand-blue/20"
              >
                Start Verifying Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
