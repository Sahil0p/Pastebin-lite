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

**Frontend**  
🔗 https://pastebin-lite-frontend-pied.vercel.app

**Backend**  
🔗 https://pastebin-lite-taupe-seven.vercel.app

**Health Check**  
🔗 https://pastebin-lite-taupe-seven.vercel.app/api/healthz

---

## 🧪 Postman Collection
Use this to test APIs easily:

🔗 https://sahilahmed0029-3594081.postman.co/workspace/Sahil-Ahmed's-Workspace~507292b8-beec-4de7-81da-d9594af9042c/collection/47691689-c808fda9-5ca7-4a32-9e84-ffd616af38db?action=share&creator=47691689

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

📌 MongoDB Connection: MONGO_URI

---

## 🔎 Required Endpoints (Implemented)

### Health Check

GET /api/healthz

Response:
\`\`\`json
{ "ok": true }
\`\`\`

### Create Paste  
POST /api/pastes

Request
\`\`\`json
{
  "content": "Hello world",
  "ttl_seconds": 60,
  "max_views": 5
}
\`\`\`

Response
\`\`\`json
{
  "id": "uuid",
  "url": "\$FRONTEND_URL/p/<id>"
}
\`\`\`

### Get Paste (JSON API)
GET /api/pastes/:id

Response
\`\`\`json
{
  "content": "string",
  "remaining_views": 4,
  "expires_at": "2026-01-01T00:00:00.000Z"
}
\`\`\`

404 when:
- paste not found
- expired
- view limit reached

### View Paste (HTML)
GET /p/:id  
Returns rendered HTML page (safe, no scripts)

### Raw Mode
GET /api/pastes/:id/raw  
Returns plain text

---

## 🧪 Deterministic Expiry Mode

When:
TEST_MODE=1  

Backend uses testing clock via:

\`x-test-now-ms: <epoch_ms>\`

If header missing → real time.

---

## 🧭 Deployment Notes

### Frontend Rewrite Rules (SPA Fix)

vercel.json
\`\`\`json
{
  "rewrites": [
    { "source": "/p/:id", "destination": "/" },
    { "source": "/(.*)", "destination": "/" }
  ]
}
\`\`\`

### Environment Variables

#### Backend
MONGODB_URI=  
TEST_MODE=1 (optional)  
FRONTEND_URL=\$FRONTEND_URL  

#### Frontend
VITE_API_URL=\$BACKEND_URL/api

---

## 🏁 Final Verification Checklist

✔ /api/healthz returns JSON  
✔ Create paste works  
✔ HTML view works  
✔ JSON fetch works  
✔ TTL expires correctly  
✔ Max views enforced  
✔ Combined constraints work  
✔ No negative remaining views  
✔ Expired returns 404  
✔ Frontend /p/:id works even on refresh  

---

## 👨‍💻 Author
Pastebin Lite — Built for take-home backend challenge.
