# SahihVerify & Escalation Intelligence

**SahihVerify & Escalation Intelligence** is an enterprise-grade, multi-agent AI fact-checking and verification platform designed for institutional trust, regulatory compliance, and rapid disinformation mitigation (optimized for Malaysia's ecosystem: Bernama, SKMM, KKM, BNM, Sebenarnya.my).

The application features a dual-service architecture:
1. **Frontend & Express Gateway (`sahih-frontend`)**: React + Vite + Tailwind UI backed by an Express server managing session state, Firebase Firestore sync, and API proxying.
2. **Python Verification Engine (`verify-engine`)**: A high-performance FastAPI/Python microservice executing parallel grounded search queries, Admiralty Intelligence source grading (A1–F6), and consensus synthesis.

---

## Architecture Overview

```
 [Client Browser] 
        │
        ▼ (HTTPS / REST / Auth)
┌───────────────────────────────────────────────┐
│ Cloud Run Service 1: sahih-frontend           │
│ - React SPA (Vite + Tailwind)                 │
│ - Express.js API & Firebase Auth Gate         │
└───────┬───────────────────────────────────────┘
        │ (gRPC / HTTP proxy)
        ▼
┌───────────────────────────────────────────────┐
│ Cloud Run Service 2: verify-engine (Python)   │
│ - FastAPI / Python Agentic Core               │
│ - Google GenAI SDK (Gemini 2.5 Flash / 3.7)   │
│ - Parallel Google Search Grounding            │
└───────────────────────────────────────────────┘
```

---

## Prerequisites

- [Google Cloud SDK (`gcloud`)](https://cloud.google.com/sdk/docs/install) installed and authenticated.
- Docker installed locally (if building custom container images).
- Active Google Cloud Project with Billing enabled.
- Gemini API Key (`GEMINI_API_KEY`).

---

## Part 1: Deploying the Python `verify-engine` to Cloud Run

The Python verification engine runs as an independent microservice.

### 1. Create a `Dockerfile` for the Python Engine (e.g., in a `verify-engine/` folder or root)
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```

### 2. Build and Deploy to Cloud Run
```bash
# Set your GCP Project ID and Region
export PROJECT_ID="your-gcp-project-id"
export REGION="asia-southeast1"

# Submit build to Google Cloud Build
gcloud builds submit --tag gcr.io/$PROJECT_ID/verify-engine ./verify-engine

# Deploy to Cloud Run
gcloud run deploy verify-engine \
  --image gcr.io/$PROJECT_ID/verify-engine \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY="your-gemini-api-key"
```

Save the resulting Cloud Run service URL (e.g., `https://verify-engine-xxxxx-as.a.run.app`).

---

## Part 2: Deploying the Frontend & Express Gateway to Cloud Run

### 1. Configure Environment Variables
Create a `.env.production` or set them directly in Cloud Run:
```env
NODE_ENV=production
GEMINI_API_KEY=your-gemini-api-key
VERIFY_ENGINE_URL=https://verify-engine-xxxxx-as.a.run.app
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-gcp-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id
```

### 2. Build and Deploy Frontend to Cloud Run
```bash
# Build container image
gcloud builds submit --tag gcr.io/$PROJECT_ID/sahih-frontend .

# Deploy frontend to Cloud Run
gcloud run deploy sahih-frontend \
  --image gcr.io/$PROJECT_ID/sahih-frontend \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production,VERIFY_ENGINE_URL=https://verify-engine-xxxxx-as.a.run.app,GEMINI_API_KEY=your-gemini-api-key
```

---

## Part 3: Environment Variables Reference

| Variable Name | Scope | Description |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Server-side / Python | Google Gemini API key for model inference and search grounding. |
| `VERIFY_ENGINE_URL` | Frontend / Express | URL endpoint of the Python `verify-engine` Cloud Run service. |
| `FIREBASE_PROJECT_ID` | Client & Server | Firebase Firestore project identifier for audit trail persistence. |
| `PORT` | Server (Default 3000) | Ingress port hardcoded by container runtime (managed by Nginx/Cloud Run proxy). |

---

## Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start Development Server**:
   ```bash
   npm run dev
   ```
3. **Build Production Bundle**:
   ```bash
   npm run build
   ```
4. **Start Production Server**:
   ```bash
   npm start
   ```
