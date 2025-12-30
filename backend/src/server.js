// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import { connectDB } from "./config/db.js";
// import router from "./routes/pasteRoutes.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// app.use("/api", router);

// // Browser RAW MODE
// app.get("/raw/:id", async (req, res) => {
//   try {
//     const backend = `http://localhost:${PORT}/api/pastes/${req.params.id}/raw`;
//     const response = await fetch(backend);
//     const text = await response.text();

//     if (!response.ok) return res.status(404).send("Not Found");

//     res.setHeader("Content-Type", "text/plain");
//     res.send(text);
//   } catch {
//     res.status(404).send("Not Found");
//   }
// });

// (async () => {
//   await connectDB();

//   app.listen(PORT, () => {
//     console.log("=========================================");
//     console.log("🚀 Pastebin Lite Backend Started");
//     console.log("=========================================");
//     console.log(`✅ Server running on http://localhost:${PORT}`);
//     console.log(`📊 Health: /api/healthz`);
//     console.log(`📝 Create: POST /api/pastes`);
//     console.log(`📥 Get: GET /api/pastes/:id`);
//     console.log(`📄 Raw API: GET /api/pastes/:id/raw`);
//     console.log(`🌐 Raw Browser: /raw/:id`);
//     console.log("=========================================");
//   });
// })();


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import router from "./routes/pasteRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", router);

(async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log("=========================================");
    console.log("🚀 Pastebin Lite Backend Started");
    console.log("=========================================");
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/healthz`);
    console.log(`📝 Create paste: POST http://localhost:${PORT}/api/pastes`);
    console.log(`📥 Fetch: GET http://localhost:${PORT}/api/pastes/:id`);
    console.log(`📄 Raw: GET http://localhost:${PORT}/api/pastes/:id/raw`);
    console.log("=========================================");
  });
})();
