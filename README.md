# Pastebin Lite – Production Ready Secure Paste Service 🚀

A high-performance, secure Pastebin alternative supporting:
- ⏳ Time-based expiry (TTL)
- 👀 Max view limits
- 📌 Permanent pastes
- 🗄️ MongoDB persistence (data survives restarts)
- 🧪 Deterministic expiry testing
- 🌐 Full HTML + JSON viewer support

---

## 🚀 Live Application Links

**🌍 Project Live Link:**  [Pastebin Lite Live](https://pastebin-lite-frontend-pied.vercel.app)

**🩺 API Health Check:**  [API Health](https://pastebin-lite-taupe-seven.vercel.app/api/healthz)

**📬 Postman Collection:**  [Postman Collection Link](https://sahilahmed0029-3594081.postman.co/workspace/Sahil-Ahmed's-Workspace~507292b8-beec-4de7-81da-d9594af9042c/collection/47691689-c808fda9-5ca7-4a32-9e84-ffd616af38db?action=share&creator=47691689)

---

## 🛠️ Tech Stack

- 🎨 **Frontend**: React + Vite + Tailwind + Framer Motion  
- 🧠 **Backend**: Node.js + Express  
- 🗃️ **Database**: MongoDB (Persistent Storage)  
- 🚀 **Deployment**
  - Backend: Vercel Serverless
  - Frontend: Vercel  
- 🔐 **Security**
  - Password protected pastes
  - Safe HTML rendering

---

## 🛠️ Local Development Setup
### 1️⃣ Clone repository
  ```
  git clone https://github.com/Sahil0p/Pastebin-lite
  cd Pastebin-lite
  ```

### 2️⃣ Backend Setup ⚙️

  ```
  cd backend
  npm install
  ```

- 📄 Create .env
  ```
  MONGODB_URI=your_mongo_url
  FRONTEND_URL=http://localhost:5173
  TEST_MODE=1
  ```

- ▶️ Run:
  ```
  npm run dev
  ```

- 🌐 Backend runs at:
  - `http://localhost:3000`

### 3️⃣ Frontend Setup 🎨

  ```
  cd frontend
  npm install
  ```

- 📄 Create .env
  ```
  VITE_API_URL=http://localhost:3000/api
  ```

- ▶️ Run:
  ```
  npm run dev
  ```

- 🌐 Frontend runs at:
  - http://localhost:5173

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

This project uses **MongoDB** to ensure that all pastes remain safely stored and are **not lost across server restarts or deployments**.  
Unlike in-memory storage, MongoDB provides:

- 🗄️ **Persistent Database Storage** — data survives restarts
- 🔒 **Reliable & Secure Data Handling**
- ⚙️ **Support for TTL, expiry logic & view limits**
- 🚀 **Efficient performance even under high load**

MongoDB acts as the backbone of this application, ensuring every paste, whether temporary or permanent, is stored consistently and retrieved accurately.

📌 **MongoDB Connection**
---

## 🧪 Postman Collection Details

This Postman collection contains a **complete and production-ready API testing suite** for the Pastebin Lite backend.  
It includes every critical operation required to test functionality, persistence, expiry logic, and trash management.

### 📌 Included Requests

- ✅ **Health Check**
- 🟢 **Create Paste**
- 🟢 **Get Paste (JSON API)**
- 🟢 **Get Paste – Raw Text**
- 🟢 **View Paste – HTML Page**
- 🟢 **List All Pastes**



### 🗑️ Trash & Cleanup Management

- 🗑️ **Move to Trash (Soft Delete)**
- ♻️ **Restore Paste (Undo Delete)**
- ❌ **Permanent Delete**


### ⭐ Additional Feature

- ⭐ **Toggle Star (Mark paste as favorite / un-favorite)**

### 🎯 What This Collection Enables Evaluators To Do

- ⚡ Quickly verify API correctness and behavior  
- 🧪 Validate paste creation, retrieval, and viewing  
- 🗄️ Confirm persistence and listing behavior  
- ♻️ Test soft delete + restore lifecycle  
- 🚮 Validate permanent deletion safety  
- ⭐ Validate UX features like starring  
- 🏆 Confirms the backend is production-ready

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
> ├── paste not found  
> ├── expired  
> └── max views reached  

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
