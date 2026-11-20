import React from 'react';
import { Shield, Sparkles, Scale, AlertCircle, Eye, Globe2, BookOpen } from 'lucide-react';

export default function AboutSection() {
  const pillars = [
    {
      title: 'Combating Misinformation',
      desc: 'Misinformation circulates faster than corrections. VeriScope AI empowers journalists, researchers, and everyday citizens with instant analytical verification tools.',
      icon: Shield,
    },
    {
      title: 'Transparent AI Reasoning',
      desc: 'No black-box scores. Every verdict surfaces the active vocabulary alignment, confidence metrics, and verbatim citations to source publications.',
      icon: Eye,
    },
    {
      title: 'Real-Time Cross-Checking',
      desc: 'Live web intelligence monitors international news wires (Reuters, AP, BBC) and specialized fact-checking repositories (Snopes, PolitiFact, FactCheck.org).',
      icon: Globe2,
    },
    {
      title: 'Dual Architectural Design',
      desc: 'Combining historical machine learning patterns from 44,000+ verified news records with breaking live news wire search for total coverage.',
      icon: Scale,
    },
  ];

  return (
    <section id="about" className="py-20 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mission & Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About VeriScope AI
          </h2>
          <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
            Engineering truth and information integrity through responsible machine learning and open web verification.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#0E1018]/80 border border-white/[0.08] backdrop-blur-xl hover:border-brand-blue/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-cyan mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsible AI Disclaimer Card */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-500/10 via-[#10121A] to-brand-blue/10 border border-amber-500/30 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Responsible AI & Critical Verification Notice</span>
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                VeriScope AI is designed as an analytical decision-support assistant. Machine learning predictions and web wire searches represent probabilistic credibility assessments based on linguistic patterns and available news reporting at a given point in time. 
              </p>
              <p className="text-xs text-amber-200/80 leading-relaxed font-medium">
                AI predictions do not constitute absolute legal or journalistic proof. For critical decisions, medical claims, or breaking news stories, always consult primary sources, accredited institutions, and peer-reviewed research directly.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
