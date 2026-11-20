import React from 'react';
import { ShieldCheck, Sparkles, ArrowRight, Activity, Search, Globe, Cpu, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export default function Hero({ onScrollToAnalyze, onScrollToHowItWorks }) {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Trust Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md shadow-inner text-xs font-medium text-text-secondary">
            <span className="flex h-2 w-2 rounded-full bg-brand-cyan animate-pulse" />
            <span className="text-white font-semibold">AI-Powered News Intelligence</span>
            <span className="text-text-muted">•</span>
            <span className="text-brand-blue">Dual Verification Architecture</span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
            Beyond Headlines.{' '}
            <span className="gradient-text">Discover the Truth.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed font-normal">
            An intelligent AI-powered platform that analyzes news, verifies claims, and helps uncover misinformation through machine learning and real-time web intelligence.
          </p>

          {/* Call to Actions */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onScrollToAnalyze}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-blue via-[#5a77ff] to-brand-purple text-white font-semibold text-sm shadow-xl shadow-brand-blue/25 hover:shadow-brand-blue/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-brand-cyan group-hover:rotate-12 transition-transform" />
              <span>Start Verifying</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onScrollToHowItWorks}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium text-sm border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <span>Explore How It Works</span>
            </button>
          </div>
        </div>

        {/* Interactive Holographic AI Visualization */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-white/10 via-brand-blue/20 to-transparent shadow-2xl shadow-brand-blue/10">
            <div className="rounded-[22px] bg-[#0E1017]/90 border border-white/[0.08] backdrop-blur-xl p-6 sm:p-8 relative overflow-hidden">
              
              {/* Radial background scanner glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

              {/* Visualization Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/[0.06] relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider text-text-secondary">
                    Active Inspection Pipeline
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-text-muted font-mono">
                  <span className="flex items-center gap-1.5 text-brand-cyan">
                    <Globe className="w-3.5 h-3.5" /> Live News RSS
                  </span>
                  <span className="flex items-center gap-1.5 text-brand-purple">
                    <Cpu className="w-3.5 h-3.5" /> 5 ML Classifiers
                  </span>
                </div>
              </div>

              {/* Interactive Radar & Flow Simulation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6 relative z-10">
                
                {/* Visual Card 1: Live Verification Node */}
                <div className="p-4 rounded-xl bg-[#131622]/80 border border-white/[0.05] hover:border-brand-blue/30 transition-all group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-brand-blue flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" /> Live Web Wire
                    </span>
                    <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-mono">
                      CORROBORATED
                    </span>
                  </div>
                  <p className="text-xs text-white/90 line-clamp-2 font-medium">
                    "NASA Perseverance rover confirms ancient river delta deposits on Mars"
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-text-muted">
                    <span>Reuters • AP • BBC</span>
                    <span className="text-emerald-400 font-bold font-mono">99.0% Real</span>
                  </div>
                </div>

                {/* Visual Card 2: Central Scanner Core */}
                <div className="p-4 rounded-xl bg-gradient-to-b from-[#181D2E] to-[#121522] border border-brand-blue/40 shadow-lg shadow-brand-blue/10 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-cyan/10 rounded-full blur-xl" />
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-brand-cyan animate-spin-slow" />
                        VeriScope Core
                      </span>
                      <span className="px-2 py-0.5 text-[10px] rounded-full bg-brand-blue/20 text-brand-cyan border border-brand-cyan/30 font-mono font-semibold">
                        TF-IDF 5K
                      </span>
                    </div>
                    <div className="space-y-1.5 mt-3">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-text-secondary">Ensemble Confidence</span>
                        <span className="text-white font-mono font-semibold">99.79%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan h-1.5 rounded-full w-[99.8%]" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-text-muted font-mono">
                    <span>ISOT CORPUS</span>
                    <span className="text-text-primary">44,898 SAMPLES</span>
                  </div>
                </div>

                {/* Visual Card 3: Disinformation Flag */}
                <div className="p-4 rounded-xl bg-[#131622]/80 border border-white/[0.05] hover:border-rose-500/30 transition-all group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" /> Disinformation
                    </span>
                    <span className="px-2 py-0.5 text-[10px] rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/20 font-mono">
                      DEBUNKED
                    </span>
                  </div>
                  <p className="text-xs text-white/90 line-clamp-2 font-medium">
                    "Celebrity death hoax spreading on social media denied by official agency"
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-text-muted">
                    <span>Snopes • FactCheck.org</span>
                    <span className="text-rose-400 font-bold font-mono">98.5% Fake</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Live Metrics Strip */}
        <div className="mt-14 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">44,898+</div>
            <div className="text-xs text-text-secondary mt-1">Verified News Corpus</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-brand-cyan font-mono tracking-tight">5</div>
            <div className="text-xs text-text-secondary mt-1">Trained ML Classifiers</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tracking-tight">99.8%</div>
            <div className="text-xs text-text-secondary mt-1">Peak Accuracy Rate</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-brand-purple font-mono tracking-tight">Real-Time</div>
            <div className="text-xs text-text-secondary mt-1">Web Fact-Checking</div>
          </div>
        </div>

      </div>
    </section>
  );
}
