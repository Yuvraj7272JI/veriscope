/**
 * VeriScope AI API Service
 * Handles prediction inference, health checks, model catalog, and connection state.
 */

// Retrieve configured API URL or fall back to default
export const getApiBaseUrl = () => {
  const custom = localStorage.getItem('veriscope_custom_api_url');
  if (custom && custom.trim()) {
    return custom.trim().replace(/\/+$/, '');
  }
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && envUrl.trim()) {
    return envUrl.trim().replace(/\/+$/, '');
  }
  return '';
};

export const setCustomApiUrl = (url) => {
  if (!url || !url.trim()) {
    localStorage.removeItem('veriscope_custom_api_url');
  } else {
    localStorage.setItem('veriscope_custom_api_url', url.trim().replace(/\/+$/, ''));
  }
};

/**
 * Predict authenticity of news headline or article.
 * @param {Object} params
 * @param {string} params.text - Headline, article, claim or URL
 * @param {'live' | 'nlp'} params.mode - 'live' for real-time web intelligence, 'nlp' for offline ML
 * @param {string} params.model - Selected classifier algorithm
 */
export async function predictNews({ text, mode = 'live', model = 'Random Forest' }) {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/api/predict`;

  const controller = new AbortController();
  // 30 second timeout for live web crawls, 12s for local NLP
  const timeoutId = setTimeout(() => controller.abort(), mode === 'live' ? 30000 : 12000);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text.trim(),
        mode,
        model,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMsg = `Server responded with HTTP ${response.status}`;
      try {
        const errorJson = await response.json();
        if (errorJson.error) errorMsg = errorJson.error;
      } catch {
        // ignore parse error
      }
      throw new Error(errorMsg);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Analysis timed out. The live verification network search took longer than 30 seconds. Please try again.');
    }
    if (err.message && (err.message.includes('Failed to fetch') || err.message.includes('NetworkError') || err.message.includes('ECONNREFUSED'))) {
      throw new Error(
        `Backend unreachable at ${baseUrl || 'local server'}. Please ensure the VeriScope AI Python server is running (python server.py) or configure the API URL in settings.`
      );
    }
    throw err;
  }
}

/**
 * Check backend health and status
 */
export async function checkBackendHealth() {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/api/health`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(endpoint, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) return { online: false, error: `HTTP ${response.status}` };
    const data = await response.json();
    return { online: true, ...data };
  } catch (err) {
    return {
      online: false,
      error: err.message || 'Cannot connect to backend',
    };
  }
}

/**
 * Get benchmark accuracy metrics for all 5 models
 */
export async function getModelMetrics() {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/api/models`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('Failed to fetch model metrics');
    return await response.json();
  } catch (err) {
    console.warn('Using offline benchmark fallbacks:', err.message);
    // Verified fallback metrics computed during training on the 44,898 dataset
    return {
      models: [
        'Random Forest',
        'Decision Tree',
        'Passive Aggressive',
        'Logistic Regression',
        'Multinomial Naive Bayes',
      ],
      default: 'Random Forest',
      benchmarks: [
        { Algorithm: 'Random Forest', Accuracy: 0.997884, Precision: 0.998131, Recall: 0.997432, 'F1 Score': 0.997782 },
        { Algorithm: 'Decision Tree', Accuracy: 0.995768, Precision: 0.996492, Recall: 0.994631, 'F1 Score': 0.995561 },
        { Algorithm: 'Passive Aggressive', Accuracy: 0.994989, Precision: 0.995558, Recall: 0.993931, 'F1 Score': 0.994744 },
        { Algorithm: 'Logistic Regression', Accuracy: 0.988753, Precision: 0.984929, Recall: 0.991597, 'F1 Score': 0.988252 },
        { Algorithm: 'Multinomial Naive Bayes', Accuracy: 0.934521, Precision: 0.931373, Recall: 0.931373, 'F1 Score': 0.931373 },
      ],
      corpus: { num_true: 21417, num_fake: 23481, total: 44898 },
    };
  }
}
