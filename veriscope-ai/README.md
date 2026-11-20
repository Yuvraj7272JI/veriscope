# VeriScope AI – Intelligent Fake News Detection & Real-Time Fact Verification

> **Tagline:** *Beyond Headlines. Discover the Truth.*  
> **Brand Identity:** Intelligent, Trustworthy, Futuristic, Minimal, Professional.

**VeriScope AI** is a production-grade, full-stack intelligence platform that identifies misinformation, analyzes suspicious headlines, verifies online claims, and assesses informational credibility through a dual architecture: **Real-Time Web Intelligence** and **5,000-dimensional TF-IDF Machine Learning Classifiers**.

---

## 🌟 Key Highlights & Capabilities

### 1. Dual Verification Architecture
- **Live Web Verification:** Searches real-time Google News RSS wires and cross-checks claims against international fact-checking organizations (Snopes, PolitiFact, FactCheck.org, Reuters Fact Check, AP Fact Check, AFP Fact Check, etc.). Distinguishes between genuine reports, celebrity death hoaxes, and rumor mills, providing clickable source links and publication dates.
- **Offline NLP Detection:** Executes fast in-memory inference across a **44,898-article** balanced corpus using pre-trained scikit-learn models:
  - **Random Forest** (99.79% Accuracy, 99.78% F1 – *Recommended*)
  - **Decision Tree** (99.58% Accuracy, 99.56% F1)
  - **Passive Aggressive Classifier** (99.50% Accuracy, 99.47% F1)
  - **Logistic Regression** (98.88% Accuracy, 98.83% F1)
  - **Multinomial Naive Bayes** (93.45% Accuracy, 93.14% F1)

### 2. Sophisticated Visual Design System
- **Dark-Themed Interface:** Built around `#08090D` (primary dark background), `#10121A` (secondary background), `#4385FF` (electric blue), `#9065FF` (neon purple), and `#48D8E8` (cyan highlights).
- **Glassmorphic UI:** Glass cards with subtle gradient borders (`backdrop-blur-xl`), glowing status indicators, and sleek typography using *Plus Jakarta Sans* and *Inter*.
- **Interactive Visualizations:**
  - Animated AI Verification Radar scanner in the Hero section.
  - Circular SVG confidence gauge with real-time gradient sweep and percentage meter.
  - Real vs. Fake probability distribution comparative bars.
  - NLP Vocabulary Inspector revealing matched vs. unmatched tokens in the model's 5,000-word index.
  - Live News Citations cards with direct source links, publication dates, and fact-checker badges.
  - Markdown Report generation & one-click copy to clipboard.

### 3. Production & Deployment Ready
- **Vercel Deployable Frontend:** Includes `vercel.json` with SPA routing fallbacks and environment variable configuration (`VITE_API_BASE_URL`).
- **Flexible Backend:** Standalone Python HTTP server with full CORS support (`GET`, `POST`, `OPTIONS`), health check (`/api/health`), model catalog (`/api/models`), and static asset serving for standalone deployment.

---

## 📁 Project Architecture

```
veriscope-ai/
├── backend/
│   ├── server.py              # Production Python HTTP server (CORS, API inference, static serving)
│   ├── live_verifier.py       # Live web search, hoax detection & fact-check cross-referencing
│   ├── models.pkl             # Pre-trained models (44,898 dataset, 5 algorithms, 13.6 MB)
│   └── requirements.txt       # Python dependencies (scikit-learn, joblib, nltk, etc.)
├── frontend/
│   ├── public/                # Static public assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── AboutSection.jsx       # Mission, methodology & responsible AI notice
│   │   │   ├── AnalysisPanel.jsx      # News input terminal, mode tabs, model picker & example pills
│   │   │   ├── ApiStatusModal.jsx     # Connection hub, URL configuration & health tester
│   │   │   ├── BackgroundGrid.jsx     # Ambient glowing matrix & radial gradient overlay
│   │   │   ├── Footer.jsx             # Brand footer, copyright & model summary
│   │   │   ├── Hero.jsx               # Headline, description, radar visualization & trust strip
│   │   │   ├── HowItWorks.jsx         # 3-step interactive timeline
│   │   │   ├── Logo.jsx               # Distinctive verification shield & AI scope SVG mark
│   │   │   ├── ModelBenchmarks.jsx    # Empirical metrics table for all 5 ML models
│   │   │   ├── Navbar.jsx             # Sticky glassmorphism header & live engine status badge
│   │   │   └── ResultsDashboard.jsx   # Verdict card, circular gauge, probability bars & citations
│   │   ├── services/
│   │   │   └── api.js                 # API abstraction, timeout handling, and custom URL storage
│   │   ├── App.jsx                    # Root app component and state orchestration
│   │   ├── index.css                  # Tailwind styles, glassmorphism utilities & glowing orbs
│   │   └── main.jsx                   # Application bootstrap
│   ├── index.html                     # HTML5 template with Google Fonts & metadata
│   ├── package.json                   # React 18, Vite, Tailwind CSS, Lucide icons
│   ├── tailwind.config.js             # Brand color system and glowing box shadows
│   ├── vite.config.js                 # Vite configuration with /api development proxy
│   ├── vercel.json                    # Vercel deployment & rewrite configuration
│   └── .env.example                   # Environment variable template
└── README.md
```

---

## 🚀 Quickstart Guide

### Prerequisites
- **Node.js** (v18 or higher) & **npm**
- **Python** (3.9 or higher) with `scikit-learn`, `joblib`, `nltk`, `pandas`, `numpy`

### Step 1: Start the Backend Server
In a terminal, navigate to the `backend` directory and start the server:
```bash
cd backend
python server.py
```
The server will initialize the NLTK resources and load the pre-trained models from `models.pkl`:
```
=================================================================
 VeriScope AI – Intelligent Fact Verification & ML Engine
=================================================================
[1/2] Initializing NLP resources...
[2/2] Loading pre-trained ML models from: .../backend/models.pkl
[OK] Successfully loaded 5 classifiers:
     - Multinomial Naive Bayes
     - Logistic Regression
     - Passive Aggressive
     - Decision Tree
     - Random Forest
[OK] Real-time Web Intelligence and NLP inference ready!

[*] VeriScope AI Backend Server running at: http://localhost:5000
```

### Step 2: Start the Frontend (Development Mode)
In another terminal, navigate to the `frontend` directory and start the Vite dev server:
```bash
cd frontend
npm install
npm run dev
```
Open **`http://localhost:3000`** in your browser. The Vite proxy automatically routes `/api` requests to `http://localhost:5000`.

### Standalone Mode (All-in-One)
You can also run the entire application directly through Python without running Vite:
```bash
cd frontend
npm run build
cd ../backend
python server.py
```
Now visit **`http://localhost:5000`** directly in your browser. `server.py` automatically serves the built React application and handles all API routes!

---

## 📡 API Contract Reference

### 1. `POST /api/predict`
Analyzes a headline or statement.

**Request Body:**
```json
{
  "text": "NASA discovers organic water systems on Mars",
  "mode": "live",
  "model": "Random Forest"
}
```

**Parameters:**
- `text` *(string, required)*: The news headline, claim, or article body.
- `mode` *(string, optional)*: `"live"` for real-time web verification; `"nlp"` for local machine learning classification. Defaults to `"live"`.
- `model` *(string, optional)*: Classifier algorithm when `mode` is `"nlp"`. Options: `"Random Forest"`, `"Decision Tree"`, `"Passive Aggressive"`, `"Logistic Regression"`, `"Multinomial Naive Bayes"`.

**Response (Sample NLP Analysis):**
```json
{
  "mode": "nlp",
  "model": "Random Forest",
  "verdict": "FAKE NEWS",
  "pred": 0,
  "prob_real": 0.1,
  "prob_fake": 0.9,
  "confidence": 0.9,
  "note": "High probability of fabricated content or sensational disinformation (90.0% confidence) detected by Random Forest.",
  "headline": "Analysis via Random Forest",
  "articles": [],
  "debunked_by": null,
  "matched_words": ["secret", "military", "control", "human", "elections"],
  "unmatched_words": ["satellites", "frequencies"],
  "total_words": 7
}
```

**Response (Sample Live Web Analysis):**
```json
{
  "mode": "live",
  "verdict": "CONFIRMED REAL NEWS",
  "confidence": 0.99,
  "prob_real": 0.99,
  "prob_fake": 0.02,
  "headline": "Corroborated by Global News Organizations",
  "note": "This story is actively corroborated by multiple established journalistic publications including NASA (.gov), BBC, and Reuters.",
  "articles": [
    {
      "title": "NASA Discovery Reveals Complex Water Systems on Early Mars",
      "source": "NASA (.gov)",
      "link": "https://...",
      "date": "Mon, 21 Sep 2026"
    }
  ],
  "debunked_by": null
}
```

### 2. `GET /api/health`
Returns system status, active models, and corpus statistics.

### 3. `GET /api/models`
Returns the model catalog and benchmark metrics across all 5 algorithms.

---

## 🌐 Deploying Frontend to Vercel

The frontend is completely decoupled and ready for 1-click deployment on Vercel:

1. Push your repository to GitHub / GitLab.
2. In the Vercel dashboard, click **Add New Project** and select the repository.
3. Configure the Root Directory to **`frontend`**.
4. In **Environment Variables**, add:
   ```env
   VITE_API_BASE_URL=https://your-backend-api.railway.app
   ```
5. Click **Deploy**. Vercel will run `npm run build` using the included `vercel.json` configuration.

---

## ⚖️ Responsible AI Notice

VeriScope AI is designed as an analytical decision-support assistant. Machine learning predictions and web wire searches represent probabilistic credibility assessments based on linguistic patterns and available news reporting at a given point in time. AI predictions do not constitute absolute legal or journalistic proof. For critical decisions, medical claims, or breaking news stories, always consult primary sources, accredited institutions, and peer-reviewed research directly.
