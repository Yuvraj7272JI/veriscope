import React from 'react';
import Logo from './Logo';
import { ShieldCheck, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#06070A] py-14 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Logo size="md" showTagline={true} />
            <p className="text-xs text-text-secondary leading-relaxed max-w-sm">
              VeriScope AI is an advanced misinformation detection platform combining 5,000-dimensional TF-IDF linguistic modeling with real-time web news wire and fact-checking intelligence.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Version 2.4.0 • Production Release</span>
            </div>
          </div>

          {/* Nav Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Navigation</div>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li><a href="#home" className="hover:text-brand-cyan transition-colors">Home Landing</a></li>
              <li><a href="#analyze" className="hover:text-brand-cyan transition-colors">Verification Terminal</a></li>
              <li><a href="#how-it-works" className="hover:text-brand-cyan transition-colors">How It Works</a></li>
              <li><a href="#benchmarks" className="hover:text-brand-cyan transition-colors">Model Benchmarks</a></li>
              <li><a href="#about" className="hover:text-brand-cyan transition-colors">About & Ethics</a></li>
            </ul>
          </div>

          {/* Supported Classifiers (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Trained Ensemble Models</div>
            <ul className="space-y-1.5 text-xs text-text-secondary font-mono">
              <li className="flex justify-between items-center py-0.5">
                <span>Random Forest</span>
                <span className="text-emerald-400 font-semibold">99.79% Acc</span>
              </li>
              <li className="flex justify-between items-center py-0.5">
                <span>Decision Tree</span>
                <span className="text-text-primary">99.58% Acc</span>
              </li>
              <li className="flex justify-between items-center py-0.5">
                <span>Passive Aggressive</span>
                <span className="text-text-primary">99.50% Acc</span>
              </li>
              <li className="flex justify-between items-center py-0.5">
                <span>Logistic Regression</span>
                <span className="text-text-primary">98.88% Acc</span>
              </li>
              <li className="flex justify-between items-center py-0.5">
                <span>Multinomial Naive Bayes</span>
                <span className="text-text-primary">93.45% Acc</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} VeriScope AI. Beyond Headlines. Discover the Truth.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-text-muted">
              Built for truthful news intelligence
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors flex items-center gap-1 text-xs"
              title="Scroll to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
