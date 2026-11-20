#!/usr/bin/env python3
"""
VeriScope AI – Intelligent Fake News Detection & Real-Time Fact Verification Server
Production-grade standalone HTTP server and inference API.
"""

import os
import sys
import json
import re
import joblib
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import warnings
warnings.filterwarnings('ignore')

import numpy as np
import nltk
from nltk.corpus import stopwords
from live_verifier import verify_news_live

# Global model store & metadata
MODELS = {}
TFIDF = None
STOP_WORDS = None
METRICS_DATA = []
CORPUS_STATS = {"num_true": 21417, "num_fake": 23481, "total": 44898}

def init_nlp_and_models():
    """Initializes NLTK stopwords and loads pre-trained machine learning models from cache."""
    global MODELS, TFIDF, STOP_WORDS, METRICS_DATA, CORPUS_STATS
    print("\n" + "=" * 65, flush=True)
    print(" VeriScope AI – Intelligent Fact Verification & ML Engine", flush=True)
    print("=" * 65, flush=True)
    print("[1/2] Initializing NLP resources...", flush=True)
    try:
        STOP_WORDS = set(stopwords.words('english'))
    except Exception:
        try:
            nltk.download('stopwords', quiet=True)
            STOP_WORDS = set(stopwords.words('english'))
        except Exception:
            STOP_WORDS = set()

    current_dir = os.path.dirname(os.path.abspath(__file__))
    cache_path = os.path.join(current_dir, "models.pkl")

    if os.path.exists(cache_path):
        print(f"[2/2] Loading pre-trained ML models from: {cache_path}", flush=True)
        cache = joblib.load(cache_path)
        TFIDF = cache.get("tfidf")
        MODELS = cache.get("models", {})
        
        # Load benchmark metrics if available
        if "metrics_df" in cache and hasattr(cache["metrics_df"], "to_dict"):
            METRICS_DATA = cache["metrics_df"].to_dict(orient="records")
        elif "metrics_df" in cache and isinstance(cache["metrics_df"], list):
            METRICS_DATA = cache["metrics_df"]
            
        CORPUS_STATS["num_true"] = cache.get("num_true", 21417)
        CORPUS_STATS["num_fake"] = cache.get("num_fake", 23481)
        CORPUS_STATS["total"] = CORPUS_STATS["num_true"] + CORPUS_STATS["num_fake"]
        
        print(f"[OK] Successfully loaded {len(MODELS)} classifiers:", flush=True)
        for name in MODELS.keys():
            print(f"     - {name}", flush=True)
    else:
        raise FileNotFoundError(f"models.pkl not found at {cache_path}. Please place pre-trained models.pkl in backend/")

    print("[OK] Real-time Web Intelligence and NLP inference ready!\n", flush=True)


class VeriScopeHandler(SimpleHTTPRequestHandler):
    """HTTP request handler supporting CORS, API inference, and static SPA serving."""

    def __init__(self, *args, **kwargs):
        # Look for built frontend in frontend/dist or local static folder
        backend_dir = os.path.dirname(os.path.abspath(__file__))
        frontend_dist = os.path.join(os.path.dirname(backend_dir), "frontend", "dist")
        static_dir = os.path.join(backend_dir, "static")
        
        if os.path.exists(frontend_dist):
            directory = frontend_dist
        elif os.path.exists(static_dir):
            directory = static_dir
        else:
            directory = backend_dir

        super().__init__(*args, directory=directory, **kwargs)

    def _set_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')

    def do_OPTIONS(self):
        self.send_response(200)
        self._set_cors_headers()
        self.end_headers()

    def do_GET(self):
        parsed_path = self.path.split('?')[0].rstrip('/')
        
        if parsed_path == '/api/health':
            self._handle_health()
        elif parsed_path == '/api/models':
            self._handle_models()
        elif parsed_path == '/api/metrics':
            self._handle_metrics()
        else:
            # Check if requesting a static file, otherwise SPA fallback to index.html if dist exists
            dist_index = os.path.join(self.directory, "index.html")
            path_file = os.path.join(self.directory, self.path.lstrip('/'))
            
            if os.path.exists(path_file) and not os.path.isdir(path_file):
                super().do_GET()
            elif os.path.exists(dist_index):
                self.path = '/index.html'
                super().do_GET()
            else:
                super().do_GET()

    def _handle_health(self):
        data = {
            "status": "healthy",
            "service": "VeriScope AI Engine",
            "ready": len(MODELS) > 0 and TFIDF is not None,
            "models_count": len(MODELS),
            "available_models": list(MODELS.keys()),
            "corpus": CORPUS_STATS
        }
        res_bytes = json.dumps(data).encode('utf-8')
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(res_bytes)))
        self._set_cors_headers()
        self.end_headers()
        self.wfile.write(res_bytes)

    def _handle_models(self):
        data = {
            "models": list(MODELS.keys()),
            "default": "Random Forest",
            "benchmarks": METRICS_DATA,
            "corpus": CORPUS_STATS
        }
        res_bytes = json.dumps(data).encode('utf-8')
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(res_bytes)))
        self._set_cors_headers()
        self.end_headers()
        self.wfile.write(res_bytes)

    def _handle_metrics(self):
        data = {
            "benchmarks": METRICS_DATA,
            "corpus": CORPUS_STATS,
            "vocabulary_size": len(TFIDF.vocabulary_) if TFIDF else 5000
        }
        res_bytes = json.dumps(data).encode('utf-8')
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(res_bytes)))
        self._set_cors_headers()
        self.end_headers()
        self.wfile.write(res_bytes)

    def do_POST(self):
        if self.path == '/api/predict':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)

            try:
                payload = json.loads(post_data.decode('utf-8'))
                raw_text = payload.get('text', '').strip()
                mode = payload.get('mode', 'live')
                model_name = payload.get('model', 'Random Forest')

                if not raw_text:
                    err_bytes = json.dumps({"error": "Missing or empty 'text' field."}).encode('utf-8')
                    self.send_response(400)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Content-Length', str(len(err_bytes)))
                    self._set_cors_headers()
                    self.end_headers()
                    self.wfile.write(err_bytes)
                    return

                if mode == 'live':
                    # LIVE WEB & FACT CHECK SEARCH
                    live_res = verify_news_live(raw_text)
                    conf_raw = float(live_res.get("confidence", 75.0)) / 100.0
                    verdict_str = live_res.get("verdict", "UNVERIFIED")

                    if "REAL" in verdict_str:
                        p_real = conf_raw
                        p_fake = max(round(1.0 - conf_raw, 4), 0.02)
                    elif "FAKE" in verdict_str or "HOAX" in verdict_str:
                        p_fake = conf_raw
                        p_real = max(round(1.0 - conf_raw, 4), 0.02)
                    elif "RUMOR" in verdict_str or "UNVERIFIED" in verdict_str:
                        p_fake = conf_raw
                        p_real = max(round(1.0 - conf_raw, 4), 0.10)
                    else:
                        p_real = 0.50
                        p_fake = 0.50

                    response = {
                        "mode": "live",
                        "verdict": verdict_str,
                        "badge": live_res.get("badge", "neutral"),
                        "confidence": conf_raw,
                        "headline": live_res.get("headline", ""),
                        "note": live_res.get("explanation", ""),
                        "articles": live_res.get("articles", []),
                        "debunked_by": live_res.get("debunked_by", None),
                        "prob_real": p_real,
                        "prob_fake": p_fake,
                        "matched_words": [],
                        "unmatched_words": [],
                        "total_words": len(raw_text.split())
                    }
                else:
                    # OFFLINE NLP LINGUISTIC MODEL
                    if model_name not in MODELS:
                        model_name = "Random Forest" if "Random Forest" in MODELS else list(MODELS.keys())[0]

                    model = MODELS[model_name]
                    words = re.findall(r'\b[a-zA-Z]{2,}\b', raw_text.lower())
                    clean_tokens = [w for w in words if w not in STOP_WORDS]
                    cleaned = " ".join(clean_tokens)

                    vocab = TFIDF.vocabulary_ if TFIDF is not None else {}
                    matched_words = [w for w in clean_tokens if w in vocab]
                    unmatched_words = [w for w in clean_tokens if w not in vocab]

                    vec = TFIDF.transform([cleaned])
                    pred = int(model.predict(vec)[0])

                    prob_real = 0.5
                    prob_fake = 0.5
                    if hasattr(model, "predict_proba"):
                        probs = model.predict_proba(vec)[0]
                        prob_fake = float(probs[0])
                        prob_real = float(probs[1])
                    elif hasattr(model, "decision_function"):
                        score = float(model.decision_function(vec)[0])
                        prob_real = 1.0 / (1.0 + np.exp(-score))
                        prob_fake = 1.0 - prob_real

                    confidence = max(prob_real, prob_fake)

                    if confidence < 0.60:
                        verdict = "UNCERTAIN / LOW CONFIDENCE"
                        note = f"The selected {model_name} model has low certainty ({confidence*100:.1f}%). The query contains out-of-domain vocabulary with limited overlap in the news corpus."
                    elif pred == 1:
                        verdict = "REAL NEWS"
                        note = f"High alignment with verified journalistic reporting patterns ({prob_real*100:.1f}% confidence) as classified by {model_name}."
                    else:
                        verdict = "FAKE NEWS"
                        note = f"High probability of fabricated content or sensational disinformation ({prob_fake*100:.1f}% confidence) detected by {model_name}."

                    response = {
                        "mode": "nlp",
                        "model": model_name,
                        "verdict": verdict,
                        "pred": pred,
                        "prob_real": round(prob_real, 4),
                        "prob_fake": round(prob_fake, 4),
                        "confidence": round(confidence, 4),
                        "note": note,
                        "headline": f"Analysis via {model_name}",
                        "articles": [],
                        "debunked_by": None,
                        "matched_words": matched_words[:50],  # cap list for efficiency
                        "unmatched_words": unmatched_words[:50],
                        "total_words": len(clean_tokens)
                    }

                response_bytes = json.dumps(response).encode('utf-8')
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(response_bytes)))
                self._set_cors_headers()
                self.end_headers()
                self.wfile.write(response_bytes)

            except Exception as e:
                err_bytes = json.dumps({"error": str(e)}).encode('utf-8')
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(err_bytes)))
                self._set_cors_headers()
                self.end_headers()
                self.wfile.write(err_bytes)
        else:
            self.send_error(404, "Endpoint Not Found")


def run_server(port=None):
    if port is None:
        port = int(os.environ.get("PORT", 5000))
    init_nlp_and_models()
    server_address = ('0.0.0.0', port)
    httpd = ThreadingHTTPServer(server_address, VeriScopeHandler)
    url = f"http://localhost:{port}"
    print("=" * 65, flush=True)
    print(f"[*] VeriScope AI Backend Server running at: {url}", flush=True)
    print(f"[*] API Predict Endpoint: {url}/api/predict", flush=True)
    print(f"[*] Health Check:        {url}/api/health", flush=True)
    print(f"[*] Model Benchmarks:    {url}/api/models", flush=True)
    print("Press Ctrl+C to stop the server.", flush=True)
    print("=" * 65 + "\n", flush=True)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping VeriScope AI server...", flush=True)
        httpd.server_close()


if __name__ == '__main__':
    run_server()
