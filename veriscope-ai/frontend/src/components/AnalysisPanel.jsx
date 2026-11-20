import React, { useState } from 'react';
import { 
  Search, 
  Globe, 
  BrainCircuit, 
  Sparkles, 
  RotateCcw, 
  Clipboard, 
  AlertCircle, 
  Check, 
  Layers, 
  ShieldAlert, 
  FileText, 
  Flame, 
  TrendingUp,
  Cpu,
  Info
} from 'lucide-react';

export default function AnalysisPanel({ 
  onAnalyze, 
  isLoading, 
  apiError, 
  backendOnline,
  onOpenSettings
}) {
  const [inputText, setInputText] = useState('');
  const [mode, setMode] = useState('live'); // 'live' | 'nlp'
  const [selectedModel, setSelectedModel] = useState('Random Forest');
  const [copiedExample, setCopiedExample] = useState(false);
  const [validationError, setValidationError] = useState('');

  const characterCount = inputText.length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  const modelsList = [
    { name: 'Random Forest', accuracy: '99.8%', desc: 'Ensemble of decision trees. Highest overall robustness.' },
    { name: 'Decision Tree', accuracy: '99.6%', desc: 'Hierarchical rule partitioning on vocabulary TF-IDF.' },
    { name: 'Passive Aggressive', accuracy: '99.5%', desc: 'Margin-based linear classifier for high-dimensional text.' },
    { name: 'Logistic Regression', accuracy: '98.9%', desc: 'Standard probabilistic sigmoid classification.' },
    { name: 'Multinomial Naive Bayes', accuracy: '93.5%', desc: 'Probabilistic word frequency independence model.' },
  ];

  const exampleNews = [
    {
      title: 'NASA Discovers Water Systems on Mars',
      category: 'Real News',
      text: 'NASA announces new spectroscopic measurements revealing active hydrated mineral systems and ancient subterranean water remnants on Mars.',
      preferredMode: 'live'
    },
    {
      title: 'World Health Organization Global Health Alert',
      category: 'Real News',
      text: 'World Health Organization issues updated global advisory regarding seasonal influenza surveillance and vaccine distribution across 60 member nations.',
      preferredMode: 'live'
    },
    {
      title: 'Celebrity Death Hoax Rumor',
      category: 'Hoax / Fake',
      text: 'Shocking breaking news: Famous veteran actor has died suddenly at his residence today according to unverified viral WhatsApp post.',
      preferredMode: 'live'
    },
    {
      title: '5G Microchip COVID Conspiracy',
      category: 'Disinformation',
      text: 'Secret government documents confirm 5G cell towers are being calibrated to activate biometric nanotech tracking chips in the population.',
      preferredMode: 'nlp'
    },
    {
      title: 'Federal Reserve Interest Rate Announcement',
      category: 'Financial / Real',
      text: 'Federal Reserve governors vote unanimously to maintain benchmark interest rates amid cooling consumer inflation index metrics.',
      preferredMode: 'nlp'
    }
  ];

  const handleClear = () => {
    setInputText('');
    setValidationError('');
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText(text);
        setValidationError('');
      }
    } catch {
      // ignore clipboard error
    }
  };

  const handleSelectExample = (ex) => {
    setInputText(ex.text);
    setMode(ex.preferredMode);
    setValidationError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) {
      setValidationError('Please enter a news headline, article excerpt, claim, or URL to analyze.');
      return;
    }
    if (inputText.trim().length < 8) {
      setValidationError('Please enter at least 8 characters for a reliable semantic analysis.');
      return;
    }
    setValidationError('');
    onAnalyze({
      text: inputText.trim(),
      mode,
      model: selectedModel,
    });
  };

  return (
    <section id="analyze" className="py-12 sm:py-20 relative z-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-cyan text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verification Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Intelligent Credibility Analysis
          </h2>
          <p className="mt-2 text-sm sm:text-base text-text-secondary max-w-xl mx-auto">
            Choose your preferred verification pipeline and let VeriScope AI dissect the claim using real-time news wires or trained linguistic classifiers.
          </p>
        </div>

        {/* Backend Warning Banner if offline */}
        {!backendOnline && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-200">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Backend Python Server is offline:</strong> Run <code className="bg-black/40 px-1.5 py-0.5 rounded text-amber-300 font-mono">python server.py</code> in the backend folder or configure the API endpoint in settings.
              </span>
            </div>
            <button
              onClick={onOpenSettings}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-semibold text-xs whitespace-nowrap transition-all"
            >
              Configure Connection
            </button>
          </div>
        )}

        {/* Main Glassmorphic Analysis Card */}
        <div className="relative rounded-3xl p-1 bg-gradient-to-b from-white/10 via-brand-purple/10 to-white/5 shadow-2xl">
          <div className="rounded-[22px] bg-[#0E1018]/95 border border-white/[0.08] backdrop-blur-2xl p-6 sm:p-8">
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Verification Mode Tabs */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-3">
                  1. Select Verification Architecture
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Mode 1: Live Web Verification */}
                  <button
                    type="button"
                    onClick={() => setMode('live')}
                    className={`relative p-4 rounded-2xl border text-left transition-all ${
                      mode === 'live'
                        ? 'bg-brand-blue/10 border-brand-blue/60 shadow-lg shadow-brand-blue/10 ring-1 ring-brand-blue/50'
                        : 'bg-[#131622]/60 border-white/[0.06] hover:bg-[#161A2A] text-text-secondary'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl ${mode === 'live' ? 'bg-brand-blue text-white' : 'bg-white/5 text-text-muted'}`}>
                          <Globe className="w-4 h-4" />
                        </div>
                        <div>
                          <div className={`text-sm font-bold ${mode === 'live' ? 'text-white' : 'text-text-primary'}`}>
                            Live Web Verification
                          </div>
                          <div className="text-[11px] text-text-secondary">
                            Real-time RSS & fact-check cross-referencing
                          </div>
                        </div>
                      </div>
                      {mode === 'live' && (
                        <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan shadow-sm shadow-brand-cyan animate-pulse" />
                      )}
                    </div>
                    <p className="mt-3 text-xs text-text-secondary/80 leading-relaxed">
                      Searches Google News wires, checks international registries (Snopes, PolitiFact, Reuters, AFP), and presents verifiable citation links.
                    </p>
                  </button>

                  {/* Mode 2: Offline NLP Detection */}
                  <button
                    type="button"
                    onClick={() => setMode('nlp')}
                    className={`relative p-4 rounded-2xl border text-left transition-all ${
                      mode === 'nlp'
                        ? 'bg-brand-purple/10 border-brand-purple/60 shadow-lg shadow-brand-purple/10 ring-1 ring-brand-purple/50'
                        : 'bg-[#131622]/60 border-white/[0.06] hover:bg-[#161A2A] text-text-secondary'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl ${mode === 'nlp' ? 'bg-brand-purple text-white' : 'bg-white/5 text-text-muted'}`}>
                          <BrainCircuit className="w-4 h-4" />
                        </div>
                        <div>
                          <div className={`text-sm font-bold ${mode === 'nlp' ? 'text-white' : 'text-text-primary'}`}>
                            Offline NLP Classifier
                          </div>
                          <div className="text-[11px] text-text-secondary">
                            5,000 TF-IDF linguistic feature vectors
                          </div>
                        </div>
                      </div>
                      {mode === 'nlp' && (
                        <span className="w-2.5 h-2.5 rounded-full bg-brand-purple shadow-sm shadow-brand-purple animate-pulse" />
                      )}
                    </div>
                    <p className="mt-3 text-xs text-text-secondary/80 leading-relaxed">
                      Evaluates vocabulary semantics, sensationalism patterns, and journalistic syntax against a 44,898-article trained corpus.
                    </p>
                  </button>

                </div>
              </div>

              {/* Model Selection Dropdown (Only active in NLP mode) */}
              {mode === 'nlp' && (
                <div className="p-4 rounded-2xl bg-[#131622]/80 border border-brand-purple/20 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-brand-purple" />
                      <span>Select Trained Classifier Algorithm</span>
                    </label>
                    <span className="text-[11px] text-brand-cyan font-mono">
                      ISOT Dataset • 44,898 Balanced Samples
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {modelsList.map((m) => {
                      const isSelected = selectedModel === m.name;
                      return (
                        <button
                          key={m.name}
                          type="button"
                          onClick={() => setSelectedModel(m.name)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-brand-purple/20 border-brand-purple text-white ring-1 ring-brand-purple/40'
                              : 'bg-black/20 border-white/[0.05] hover:bg-white/[0.04] text-text-secondary'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white truncate">{m.name}</span>
                            <span className={`px-1.5 py-0.5 text-[10px] font-mono rounded ${
                              isSelected ? 'bg-brand-purple text-white font-bold' : 'bg-white/5 text-text-muted'
                            }`}>
                              {m.accuracy}
                            </span>
                          </div>
                          <div className="text-[10px] text-text-secondary mt-1 line-clamp-1">
                            {m.desc}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Text Input Area */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="news-input" className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    2. Input News Statement, Article, Claim or URL
                  </label>
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <button
                      type="button"
                      onClick={handlePaste}
                      className="hover:text-brand-cyan transition-colors flex items-center gap-1"
                      title="Paste from clipboard"
                    >
                      <Clipboard className="w-3 h-3" />
                      <span>Paste</span>
                    </button>
                    {inputText && (
                      <button
                        type="button"
                        onClick={handleClear}
                        className="hover:text-rose-400 transition-colors flex items-center gap-1"
                        title="Clear input"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Clear</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="relative rounded-2xl bg-[#090B10] border border-white/10 focus-within:border-brand-blue/60 focus-within:ring-2 focus-within:ring-brand-blue/20 transition-all">
                  <textarea
                    id="news-input"
                    rows={4}
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value);
                      if (validationError) setValidationError('');
                    }}
                    placeholder={
                      mode === 'live'
                        ? 'e.g., "Scientists at NASA discover organic matter and ancient water remnants on Mars" or "Celebrity passes away suddenly at 60"'
                        : 'e.g., Enter news headline or article excerpt to inspect syntactic patterns, vocabulary alignment, and linguistic probability.'
                    }
                    className="w-full bg-transparent p-4 text-sm text-white placeholder-text-muted focus:outline-none resize-y min-h-[110px]"
                  />

                  {/* Character & Word Counter Bar */}
                  <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.05] text-[11px] text-text-muted font-mono">
                    <div className="flex items-center gap-3">
                      <span>{wordCount} {wordCount === 1 ? 'word' : 'words'}</span>
                      <span>•</span>
                      <span>{characterCount} chars</span>
                    </div>
                    <div>
                      {mode === 'live' ? 'Mode: Live RSS Search' : `Model: ${selectedModel}`}
                    </div>
                  </div>
                </div>

                {validationError && (
                  <div className="mt-2 text-xs text-rose-400 flex items-center gap-1.5 animate-fadeIn">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}
              </div>

              {/* Fast Example Suggestions Pills */}
              <div>
                <div className="text-[11px] font-medium text-text-muted mb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3 text-brand-cyan" />
                  <span>Try an example claim:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {exampleNews.map((ex, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelectExample(ex)}
                      className="px-2.5 py-1 text-xs rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-brand-blue/40 text-text-secondary hover:text-white transition-all text-left truncate max-w-xs"
                      title={ex.text}
                    >
                      <span className="text-brand-blue font-medium mr-1.5">[{ex.category}]</span>
                      <span>{ex.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide text-white transition-all duration-300 relative overflow-hidden flex items-center justify-center gap-2.5 shadow-xl ${
                    isLoading
                      ? 'bg-[#181D2E] cursor-not-allowed border border-brand-blue/40'
                      : 'bg-gradient-to-r from-brand-blue via-[#5a77ff] to-brand-purple hover:shadow-brand-blue/40 hover:scale-[1.008] active:scale-[0.99]'
                  }`}
                >
                  {isLoading ? (
                    <>
                      {/* Scanning Animation Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-scan-line" />
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>
                        {mode === 'live' 
                          ? 'Scanning Live Global News Wires & Fact Registries...' 
                          : `Executing 5,000-D TF-IDF Inference via ${selectedModel}...`}
                      </span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-brand-cyan" />
                      <span>Analyze with AI</span>
                    </>
                  )}
                </button>
              </div>

              {/* Error Notice */}
              {apiError && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-semibold text-rose-200">Analysis Request Failed</div>
                    <div>{apiError}</div>
                  </div>
                </div>
              )}

            </form>

          </div>
        </div>

      </div>
    </section>
  );
}
