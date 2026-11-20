import React, { useState } from 'react';
import { X, Server, CheckCircle2, AlertTriangle, RefreshCw, Globe, Terminal, Save, Trash2 } from 'lucide-react';
import { getApiBaseUrl, setCustomApiUrl, checkBackendHealth } from '../services/api';

export default function ApiStatusModal({ isOpen, onClose, backendHealth, onRefreshHealth }) {
  const [customUrl, setCustomUrl] = useState(getApiBaseUrl() || '');
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  if (!isOpen) return null;

  const handleSaveUrl = () => {
    setCustomApiUrl(customUrl.trim());
    onRefreshHealth();
    setTestResult({ success: true, message: 'API Base URL updated successfully.' });
  };

  const handleResetDefault = () => {
    setCustomApiUrl('');
    setCustomUrl('');
    onRefreshHealth();
    setTestResult({ success: true, message: 'Reset to default API endpoint (/api).' });
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await checkBackendHealth();
      if (res.online) {
        setTestResult({
          success: true,
          message: `Connected! Verified ${res.models_count || 5} models online on ${res.service || 'VeriScope Backend'}.`
        });
      } else {
        setTestResult({
          success: false,
          message: `Connection failed: ${res.error || 'Server unreachable'}`
        });
      }
    } catch (e) {
      setTestResult({
        success: false,
        message: `Connection error: ${e.message}`
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0E1018] border border-white/10 shadow-2xl p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Backend Connection Hub</h3>
              <p className="text-xs text-text-secondary">Configure & test VeriScope AI backend</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Status Box */}
        <div className="mt-5 p-4 rounded-2xl bg-[#131622] border border-white/[0.06] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary">Backend Engine Status:</span>
            <span className={`flex items-center gap-1.5 font-bold font-mono px-2 py-0.5 rounded-full ${
              backendHealth.online
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}>
              <span className={`w-2 h-2 rounded-full ${backendHealth.online ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              {backendHealth.online ? 'ONLINE & READY' : 'OFFLINE / UNREACHABLE'}
            </span>
          </div>

          <div className="text-[11px] text-text-muted font-mono flex items-center justify-between pt-2 border-t border-white/[0.04]">
            <span>Active Target URL:</span>
            <span className="text-white truncate max-w-[240px]">
              {getApiBaseUrl() || '(relative proxy /api)'}
            </span>
          </div>

          {backendHealth.online && backendHealth.corpus && (
            <div className="text-[11px] text-text-muted font-mono flex items-center justify-between pt-1">
              <span>Loaded Corpus:</span>
              <span className="text-brand-cyan">{backendHealth.corpus.total || 44898} articles</span>
            </div>
          )}
        </div>

        {/* Custom API URL Input */}
        <div className="mt-5 space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Custom API Base URL (for Vercel or Cloud Deployments)
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Globe className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="http://localhost:5000 or https://your-backend.railway.app"
                className="w-full bg-[#131622] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-text-muted focus:outline-none focus:border-brand-blue"
              />
            </div>
            <button
              onClick={handleSaveUrl}
              className="px-3 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-white text-xs font-semibold flex items-center gap-1 transition-all"
              title="Save custom API URL"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save</span>
            </button>
          </div>
          <div className="flex items-center justify-between text-[11px] text-text-muted pt-1">
            <span>Leave empty to use default proxy</span>
            <button
              onClick={handleResetDefault}
              className="text-brand-cyan hover:underline flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Reset to default</span>
            </button>
          </div>
        </div>

        {/* Local Setup Instructions */}
        <div className="mt-5 p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-xs">
          <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-brand-cyan" />
            <span>How to run the backend locally</span>
          </div>
          <pre className="text-[11px] font-mono text-emerald-400 bg-black/60 p-2.5 rounded-lg overflow-x-auto">
            cd backend&#10;python server.py
          </pre>
          <div className="text-[10px] text-text-muted">
            The server will start on <span className="text-white font-mono">http://localhost:5000</span> and immediately load the 5 trained classifiers and Google News RSS verifier.
          </div>
        </div>

        {/* Test Result Message */}
        {testResult && (
          <div className={`mt-4 p-3 rounded-xl text-xs flex items-center gap-2 ${
            testResult.success
              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
              : 'bg-rose-500/10 border border-rose-500/20 text-rose-300'
          }`}>
            {testResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />}
            <span>{testResult.message}</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
          <button
            onClick={handleTestConnection}
            disabled={testing}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
            <span>{testing ? 'Testing...' : 'Test Connection'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-brand-blue text-white text-xs font-semibold hover:bg-brand-blue/90 transition-all"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
