import express from "express";
import {
  healthCheck,
  createPaste,
  getPaste,
  getPasteRaw,
  listPastes,
  moveToTrash,
  restorePaste,
  deleteForever,
  toggleStar
} from "../controllers/pasteController.js";
import { viewPasteHTML } from "../controllers/pasteController.js";



const router = express.Router();

router.get("/healthz", healthCheck);

router.get("/p/:id", viewPasteHTML);

router.post("/pastes", createPaste);
router.get("/pastes", listPastes);
router.get("/pastes/:id", getPaste);
router.get("/pastes/:id/raw", getPasteRaw);

router.patch("/pastes/:id/star", toggleStar);

router.delete("/pastes/:id", moveToTrash);
router.patch("/pastes/:id/restore", restorePaste);
router.delete("/pastes/:id/permanent", deleteForever);

export default router;
