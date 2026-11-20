import React from 'react';
import { Send, Cpu, CheckCircle2, ArrowRight, ShieldCheck, Search, Database } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Submit Information',
      desc: 'Paste a news article, headline, social media claim, or statement into the VeriScope AI input terminal.',
      icon: Send,
      badge: 'Step 1: Input Ingestion',
      highlight: 'Headline, Text or URL'
    },
    {
      number: '02',
      title: 'AI Multi-Stage Analysis',
      desc: 'The platform processes the information using either real-time web verification across international news wires or 5,000-D TF-IDF linguistic feature classification.',
      icon: Cpu,
      badge: 'Step 2: Dual Intelligence Pipeline',
      highlight: 'Live RSS or 5 ML Models'
    },
    {
      number: '03',
      title: 'Discover the Results',
      desc: 'Receive an authoritative verdict, animated confidence gauge, deep linguistic breakdown, and direct clickable source links to verified publications.',
      icon: CheckCircle2,
      badge: 'Step 3: Verifiable Truth Matrix',
      highlight: 'Verdict, Gauge & Citations'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Transparent Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How VeriScope AI Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-text-secondary">
            A three-step verification workflow engineered to deliver actionable clarity without black-box opacity.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Subtle connecting line across cards on desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-brand-blue/30 via-brand-purple/30 to-brand-cyan/30 -translate-y-12 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative z-10 rounded-3xl p-6 sm:p-8 bg-[#0E1018]/90 border border-white/[0.08] backdrop-blur-xl hover:border-brand-blue/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-extrabold font-mono text-white/10 group-hover:text-brand-blue/30 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1A2035] to-[#121626] border border-white/10 flex items-center justify-center text-brand-cyan group-hover:scale-110 group-hover:border-brand-cyan/40 transition-all shadow-lg">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="text-[11px] font-mono uppercase tracking-wider text-brand-blue mb-2">
                    {step.badge}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-cyan transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom Highlight pill */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-mono text-text-muted flex items-center justify-between">
                  <span>KEY CAPABILITY</span>
                  <span className="text-brand-cyan font-medium">{step.highlight}</span>
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
