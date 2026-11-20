import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BackgroundGrid from './components/BackgroundGrid';
import Hero from './components/Hero';
import AnalysisPanel from './components/AnalysisPanel';
import ResultsDashboard from './components/ResultsDashboard';
import HowItWorks from './components/HowItWorks';
import ModelBenchmarks from './components/ModelBenchmarks';
import AboutSection from './components/AboutSection';
import ApiStatusModal from './components/ApiStatusModal';
import Footer from './components/Footer';
import { predictNews, checkBackendHealth } from './services/api';

export default function App() {
  const [backendHealth, setBackendHealth] = useState({ online: false, loading: true });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [lastQuery, setLastQuery] = useState('');
  const [apiError, setApiError] = useState('');

  // Initial health check
  const refreshHealth = async () => {
    try {
      const res = await checkBackendHealth();
      setBackendHealth({ ...res, loading: false });
    } catch {
      setBackendHealth({ online: false, loading: false });
    }
  };

  useEffect(() => {
    refreshHealth();
    // Poll health periodically every 25 seconds
    const interval = setInterval(refreshHealth, 25000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToAnalyze = () => {
    const el = document.getElementById('analyze');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAnalyze = async ({ text, mode, model }) => {
    setIsLoading(true);
    setApiError('');
    setLastQuery(text);

    try {
      const result = await predictNews({ text, mode, model });
      setAnalysisResult(result);
      
      // Smooth scroll down to results section
      setTimeout(() => {
        const resultsEl = document.getElementById('results');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err) {
      console.error('Prediction failed:', err);
      setApiError(err.message || 'An unexpected error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    handleScrollToAnalyze();
  };

  return (
    <div className="min-h-screen bg-[#08090D] text-[#F5F6FA] relative selection:bg-[#4385FF]/30 selection:text-[#48D8E8]">
      {/* Background Ambient Grid & Glows */}
      <BackgroundGrid />

      {/* Main Navigation */}
      <Navbar
        backendHealth={backendHealth}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onScrollToAnalyze={handleScrollToAnalyze}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onScrollToAnalyze={handleScrollToAnalyze}
          onScrollToHowItWorks={handleScrollToHowItWorks}
        />

        {/* News Analysis Interface */}
        <AnalysisPanel
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
          apiError={apiError}
          backendOnline={backendHealth.online}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Results Dashboard (Appears dynamically upon analysis) */}
        {analysisResult && (
          <ResultsDashboard
            result={analysisResult}
            originalQuery={lastQuery}
            onReset={handleReset}
          />
        )}

        {/* How It Works Section */}
        <HowItWorks />

        {/* Model Benchmarks & Metrics */}
        <ModelBenchmarks />

        {/* About & Responsible AI Section */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Backend API Configuration & Status Modal */}
      <ApiStatusModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        backendHealth={backendHealth}
        onRefreshHealth={refreshHealth}
      />
    </div>
  );
}
