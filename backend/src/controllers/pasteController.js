import Paste from "../models/Paste.js";
import { v4 as uuid } from "uuid";
import { getCurrentTime } from "../utils/timeUtil.js";

const BASE_URL = process.env.FRONTEND_URL || "";

// HEALTH =========================
export const healthCheck = async (req, res) => {
  try {
    await Paste.findOne();
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false });
  }
};

// CREATE =========================
export const createPaste = async (req, res) => {
  try {
    const {
      content,
      ttl_seconds,
      max_views,
      title,
      category,
      password,
      permanent,
    } = req.body;

    if (!content || !content.trim())
      return res.status(400).json({ message: "content is required" });

    let expiresAt = null;
    if (ttl_seconds) {
      const now = getCurrentTime(req);
      expiresAt = new Date(now.getTime() + ttl_seconds * 1000);
    }

    const paste = await Paste.create({
      _id: uuid(),
      title: title?.trim() || "Untitled Paste",
      content,
      category: category || "Notes",
      password: password || null,
      maxViews: max_views || null,
      expiresAt,
      isPermanent: permanent ? true : false,
    });

    return res.status(201).json({
      id: paste._id,
      title: paste.title,
      category: paste.category,
      url: `${BASE_URL}/p/${paste._id}`,
    });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};

// GET =========================
// export const getPaste = async (req, res) => {
//   try {
//     const now = getCurrentTime(req);
//     const { id } = req.params;
//     const providedPassword = req.headers["x-paste-password"] || null;

//     const paste = await Paste.findById(id);
//     if (!paste) return res.status(404).json({ message: "Not found" });

//     if (paste.isDeleted)
//       return res.status(404).json({ message: "Not found" });

//     if (!paste.isPermanent && paste.expiresAt && now >= paste.expiresAt)
//       return res.status(404).json({ message: "Expired" });

//     if (paste.password && paste.password !== providedPassword)
//       return res.status(401).json({ message: "Password required" });

//     if (paste.maxViews !== null && paste.viewsUsed >= paste.maxViews)
//       return res.status(404).json({ message: "View limit reached" });

//     paste.viewsUsed += 1;
//     paste.lastAccessed = now;
//     paste.viewHistory.push({
//       viewedAt: now,
//       ip: req.ip,
//     });

//     await paste.save();

//     const remaining =
//       paste.maxViews === null
//         ? null
//         : Math.max(paste.maxViews - paste.viewsUsed, 0);

//     let istExpiry = null;
//     if (paste.expiresAt) {
//       istExpiry = paste.expiresAt.toLocaleString("en-IN", {
//         timeZone: "Asia/Kolkata",
//       });
//     }

//     return res.status(200).json({
//       title: paste.title,
//       category: paste.category,
//       content: paste.content,
//       isStarred: paste.isStarred,
//       remaining_views: remaining,
//       expires_at: istExpiry,
//       created_at: paste.createdAt,
//       last_accessed: paste.lastAccessed,
//     });
//   } catch {
//     return res.status(404).json({ message: "Unavailable" });
//   }
// };

export const getPaste = async (req, res) => {
  try {
    const now = getCurrentTime(req);
    const { id } = req.params;
    const providedPassword = req.headers["x-paste-password"] || null;

    const paste = await Paste.findById(id);
    if (!paste) return res.status(404).json({ message: "Not found" });

    if (paste.isDeleted)
      return res.status(404).json({ message: "Not found" });

    // TTL check (only if not permanent)
    if (!paste.isPermanent && paste.expiresAt && now >= paste.expiresAt)
      return res.status(404).json({ message: "Expired" });

    // Password check
    if (paste.password && paste.password !== providedPassword)
      return res.status(401).json({ message: "Password required" });

    // View limit check
    if (paste.maxViews !== null && paste.viewsUsed >= paste.maxViews)
      return res.status(404).json({ message: "View limit reached" });

    // Count view
    paste.viewsUsed += 1;
    paste.lastAccessed = now;
    paste.viewHistory.push({
      viewedAt: now,
      ip: req.ip,
    });

    await paste.save();

    const remaining =
      paste.maxViews === null
        ? null
        : Math.max(paste.maxViews - paste.viewsUsed, 0);

    return res.status(200).json({
      title: paste.title,
      category: paste.category,
      content: paste.content,
      isStarred: paste.isStarred,

      // 🔥 RAW DATE (ISO) — NOT formatted
      remaining_views: remaining,
      expires_at: paste.expiresAt,      

      created_at: paste.createdAt,
      last_accessed: paste.lastAccessed,
    });
  } catch {
    return res.status(404).json({ message: "Unavailable" });
  }
};


// RAW MODE =========================
export const getPasteRaw = async (req, res) => {
  const paste = await Paste.findById(req.params.id);
  if (!paste || paste.isDeleted) return res.status(404).send("Not found");
  res.setHeader("Content-Type", "text/plain");
  return res.send(paste.content);
};

// STAR =========================
export const toggleStar = async (req, res) => {
  const paste = await Paste.findById(req.params.id);
  if (!paste) return res.status(404).json({ message: "Not found" });

  paste.isStarred = !paste.isStarred;
  await paste.save();

  return res.json({ starred: paste.isStarred });
};

// LIST =========================
export const listPastes = async (req, res) => {
  try {
    const data = await Paste.find({}).sort({ createdAt: -1 }).limit(50);

    return res.json(
      data.map((p) => ({
        id: p._id,
        title: p.title,
        category: p.category,
        isStarred: p.isStarred,
        isDeleted: p.isDeleted,
        isPermanent: p.isPermanent,
        expires_at: p.expiresAt,
        remaining_views:
          p.maxViews === null
            ? null
            : Math.max(p.maxViews - p.viewsUsed, 0),
      }))
    );
  } catch {
    return res.status(500).json({ message: "Failed list" });
  }
};

// TRASH =========================
export const moveToTrash = async (req, res) => {
  try {
    const paste = await Paste.findById(req.params.id);
    if (!paste) return res.status(404).json({ message: "Not found" });

    paste.isDeleted = true;
    await paste.save();
    return res.json({ message: "Moved to trash" });
  } catch {
    return res.status(500).json({ message: "Failed to delete" });
  }
};

export const restorePaste = async (req, res) => {
  try {
    const paste = await Paste.findById(req.params.id);
    if (!paste) return res.status(404).json({ message: "Not found" });

    paste.isDeleted = false;
    await paste.save();
    return res.json({ message: "Restored successfully" });
  } catch {
    return res.status(500).json({ message: "Failed to restore" });
  }
};

export const deleteForever = async (req, res) => {
  try {
    await Paste.findByIdAndDelete(req.params.id);
    return res.json({ message: "Permanently deleted" });
  } catch {
    return res.status(500).json({ message: "Failed to delete forever" });
  }
};


// VIEW PASTE==============================================================

export const viewPasteHTML = async (req, res) => {
  try {
    const now = getCurrentTime(req);
    const { id } = req.params;

    const paste = await Paste.findById(id);
    if (!paste || paste.isDeleted)
      return res.status(404).send("Paste not found");

    // Expiry
    if (!paste.isPermanent && paste.expiresAt && now >= paste.expiresAt)
      return res.status(404).send("This paste has expired");

    // View limit
    if (paste.maxViews !== null && paste.viewsUsed >= paste.maxViews)
      return res.status(404).send("Paste is no longer available");

    // Count view
    paste.viewsUsed++;
    paste.lastAccessed = now;
    await paste.save();

    // Escape HTML to prevent script execution
    const safe = paste.content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    return res
      .status(200)
      .set("Content-Type", "text/html")
      .send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>${paste.title || "Paste"}</title>
            <style>
              body { background:#0B1220; color:white; font-family:monospace; padding:40px }
              pre { background:#111; padding:16px; border-radius:10px; }
            </style>
          </head>
          <body>
            <h2>${paste.title || "Paste"}</h2>
            <pre>${safe}</pre>
          </body>
        </html>
      `);
  } catch (e) {
    return res.status(404).send("Unavailable");
  }
};
