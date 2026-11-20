import React, { useState } from 'react';
import { Cpu, Award, BarChart3, Database, Layers, CheckCircle2, Info } from 'lucide-react';

export default function ModelBenchmarks() {
  const benchmarks = [
    {
      name: 'Random Forest',
      type: 'Ensemble Bagging Classifier (50 Estimators)',
      accuracy: 99.79,
      precision: 99.81,
      recall: 99.74,
      f1: 99.78,
      recommended: true,
      desc: 'Combines multiple decision tree predictors over feature subspaces to eliminate overfitting and capture nonlinear vocabulary associations.'
    },
    {
      name: 'Decision Tree',
      type: 'Hierarchical Entropy Partitioning',
      accuracy: 99.58,
      precision: 99.65,
      recall: 99.46,
      f1: 99.56,
      recommended: false,
      desc: 'Splits on decisive lexical thresholds such as official press wire syntax vs. fabricated rhetoric.'
    },
    {
      name: 'Passive Aggressive',
      type: 'Margin-Based Online Linear Classifier',
      accuracy: 99.50,
      precision: 99.56,
      recall: 99.39,
      f1: 99.47,
      recommended: false,
      desc: 'Rapid linear algorithm optimized for high-dimensional sparse TF-IDF text features.'
    },
    {
      name: 'Logistic Regression',
      type: 'L2 Regularized Sigmoid Classifier',
      accuracy: 98.88,
      precision: 98.49,
      recall: 99.16,
      f1: 98.83,
      recommended: false,
      desc: 'Provides continuous probability calibration along with log-odds weights for each vocabulary token.'
    },
    {
      name: 'Multinomial Naive Bayes',
      type: 'Multinomial Word Frequency Likelihood',
      accuracy: 93.45,
      precision: 93.14,
      recall: 93.14,
      f1: 93.14,
      recommended: false,
      desc: 'Classic baseline applying Bayes theorem with word independence assumptions over text token distributions.'
    }
  ];

  return (
    <section id="benchmarks" className="py-20 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-semibold mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Empirical ML Performance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Classifiers & Benchmark Metrics
          </h2>
          <p className="mt-3 text-sm sm:text-base text-text-secondary">
            Rigorous evaluation on the 44,898-article ISOT News Benchmark corpus across 5 distinct machine learning architectures.
          </p>
        </div>

        {/* Dataset Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-[#0E1018]/80 border border-white/[0.07] backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-brand-blue/10 text-brand-blue">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase text-text-muted">Total Dataset Size</div>
                <div className="text-2xl font-extrabold text-white font-mono">44,898</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-text-secondary">
              21,417 Verified Articles vs. 23,481 Disinformation Records
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E1018]/80 border border-white/[0.07] backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-brand-cyan/10 text-brand-cyan">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase text-text-muted">TF-IDF Vector Space</div>
                <div className="text-2xl font-extrabold text-white font-mono">5,000 D</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-text-secondary">
              Unigram & bigram vocabulary features with stopword filtering
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E1018]/80 border border-white/[0.07] backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase text-text-muted">Peak F1-Score</div>
                <div className="text-2xl font-extrabold text-emerald-400 font-mono">99.78%</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-text-secondary">
              Achieved by Random Forest with 50 bagging estimator trees
            </div>
          </div>
        </div>

        {/* Benchmarks Table Card */}
        <div className="rounded-3xl bg-[#0E1018]/90 border border-white/[0.08] backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white">Algorithm Benchmark Comparison</h3>
              <p className="text-xs text-text-secondary mt-0.5">20% stratified hold-out test set evaluation (8,980 samples)</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-text-secondary">
              Pre-trained Cache: models.pkl (13.6 MB)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#121522] text-xs font-mono uppercase text-text-muted border-b border-white/[0.06]">
                <tr>
                  <th className="py-4 px-6">Algorithm</th>
                  <th className="py-4 px-4 text-center">Accuracy</th>
                  <th className="py-4 px-4 text-center">Precision</th>
                  <th className="py-4 px-4 text-center">Recall</th>
                  <th className="py-4 px-4 text-center">F1 Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {benchmarks.map((m, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{m.name}</span>
                        {m.recommended && (
                          <span className="px-2 py-0.5 text-[10px] rounded-full bg-brand-blue/20 text-brand-cyan border border-brand-blue/30 font-semibold font-mono">
                            Recommended
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-text-secondary mt-0.5">{m.type}</div>
                    </td>
                    <td className="py-4 px-4 text-center font-mono font-bold text-white">
                      <span className={m.accuracy >= 99 ? 'text-emerald-400' : 'text-text-primary'}>
                        {m.accuracy}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center font-mono text-text-secondary">
                      {m.precision}%
                    </td>
                    <td className="py-4 px-4 text-center font-mono text-text-secondary">
                      {m.recall}%
                    </td>
                    <td className="py-4 px-4 text-center font-mono font-bold text-brand-cyan">
                      {m.f1}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-[#121522]/50 border-t border-white/[0.06] text-xs text-text-muted flex items-center gap-2">
            <Info className="w-4 h-4 text-brand-blue shrink-0" />
            <span>
              All models run in-memory within the Python backend server without external third-party API dependencies.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
