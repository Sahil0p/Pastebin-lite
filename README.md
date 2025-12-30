# Pastebin Lite – Production Ready Secure Paste Service

A high-performance, secure Pastebin alternative supporting:
- Time-based expiry (TTL)
- Max view limits
- Permanent pastes
- Server persistence (MongoDB / DB survives restarts)
- Deterministic expiry testing
- Full HTML + JSON viewer support

---

## 🚀 Live Application

[![Frontend](https://img.shields.io/badge/Frontend-Live-brightgreen)](https://pastebin-lite-frontend-pied.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Server-blue)](https://pastebin-lite-taupe-seven.vercel.app)
[![Health](https://img.shields.io/badge/API-Health_Check-success)](https://pastebin-lite-taupe-seven.vercel.app/api/healthz)
[![Postman](https://img.shields.io/badge/Postman-Collection-orange)](https://sahilahmed0029-3594081.postman.co/workspace/Sahil-Ahmed's-Workspace~507292b8-beec-4de7-81da-d9594af9042c/collection/47691689-c808fda9-5ca7-4a32-9e84-ffd616af38db?action=share&creator=47691689)

---

## 🧪 Postman Collection Details

The Postman collection contains a **complete testing suite** for this backend, including:

- ✅ Health Check API  
- ✅ Create Paste API (with TTL + max views payload samples)  
- ✅ Get Paste JSON API  
- ✅ HTML View Endpoint Tests  
- ✅ Raw Text Mode Test  
- ✅ Expiry Testing using `x-test-now-ms` header  
- ✅ Tests for expired + max view exceeded scenarios  

This allows evaluators to:
- Quickly verify correctness  
- Validate expiry & business rules  
- Confirm deterministic testing behavior  
- Validate production readiness  

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite + Tailwind + Framer Motion  
- **Backend**: Node.js + Express  
- **Database**: MongoDB (Persistent Storage)  
- **Deployment**
  - Backend: Vercel Serverless
  - Frontend: Vercel  
- **Security**
  - Password protected pastes
  - Safe HTML rendering

---

## ✨ Features

✔ Create text/code pastes  
✔ Shareable URL  
✔ View paste as HTML Page  
✔ Fetch as JSON API  
✔ Raw mode  
✔ Optional Expiry (TTL)  
✔ Optional Max Views  
✔ Permanent Pastes Supported  
✔ Expiry & View Limit Enforcement  
✔ Deterministic testing with `x-test-now-ms`  
✔ 404 for expired/deleted/not-found  

---

## 🧷 Persistence Requirement ✔

This project uses **MongoDB** to ensure data is NOT lost across requests.

📌 MongoDB Connection:


---

## 🛠️ Local Development Setup
### 1️⃣ Clone repository
```
git clone https://github.com/Sahil0p/Pastebin-lite
cd Pastebin-lite
```

### 2️⃣ Backend Setup

```
git clone <repo>
cd backend
npm install
```

- Create .env
```
MONGODB_URI=your_mongo_url
FRONTEND_URL=http://localhost:5173
TEST_MODE=1
```

- Run:
```
npm run dev
```

- Backend runs at:

> http://localhost:3000

### 3️⃣ Frontend Setup

```
cd frontend
npm install
```

- Create .env
```
VITE_API_URL=http://localhost:3000/api
```

- Run:
```
npm run dev
```

- Frontend runs at:

> http://localhost:5173

---

## 🔎 Required Endpoints (Implemented)

### Health Check
**GET** `/api/healthz`
```json
{ "ok": true }
```

### Create Paste

**POST** `/api/pastes`
```
{
  "content": "Hello world",
  "ttl_seconds": 60,
  "max_views": 5
}

```

**Response**
```
{
  "id": "uuid",
  "url": "https://pastebin-lite-frontend-pied.vercel.app/p/<id>"
}
```

### Get Paste (JSON API)

**GET** `/api/pastes/:id`
```
{
  "content": "string",
  "remaining_views": 4,
  "expires_at": "2026-01-01T00:00:00.000Z"
}
```

> Returns 404 when:
> paste not found
> expired
> max views reached

### View Paste (HTML)

**GET** `/p/:id`
> Returns rendered HTML page (safe, no scripts)

### Raw Mode

**GET** `/api/pastes/:id/raw`
> Returns plain text.

---

## 🧪 Deterministic Expiry Mode

- When: `TEST_MODE = 1`
- Backend supports controlled testing clock using header: `x-test-now-ms: <epoch_ms>`
- If header missing → real time is used.

---

## 🧭 Deployment Notes
### Frontend Rewrite Rules (SPA Fix)

**vercel.json**
```
{
  "rewrites": [
    { "source": "/p/:id", "destination": "/" },
    { "source": "/(.*)", "destination": "/" }
  ]
}
```
### ⚙️ Environment Variables
**Backend**
```
MONGODB_URI=
TEST_MODE=1 (optional)
FRONTEND_URL=https://pastebin-lite-frontend-pied.vercel.app
```

**Frontend**

```
VITE_API_URL=https://pastebin-lite-taupe-seven.vercel.app/api
```

---

## 🏁 Final Verification Checklist

- ✔ /api/healthz returns JSON
- ✔ Create paste works
- ✔ HTML view works
- ✔ JSON fetch works
- ✔ TTL expires correctly
- ✔ Max views enforced
- ✔ Combined constraints work
- ✔ No negative remaining views
- ✔ Expired returns 404
- ✔ Frontend /p/:id works even on refresh
