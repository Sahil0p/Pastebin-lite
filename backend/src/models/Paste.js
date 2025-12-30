import mongoose from "mongoose";

const PasteSchema = new mongoose.Schema(
  {
    _id: String,

    title: {
      type: String,
      default: "Untitled Paste",
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["Coding", "Notes", "Logs", "Secrets"],
      default: "Notes",
    },

    password: {
      type: String,
      default: null,
    },

    maxViews: {
      type: Number,
      default: null,
    },

    viewsUsed: {
      type: Number,
      default: 0,
    },

    expiresAt: {
      type: Date,
      default: null,
    },

    isPermanent: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    isStarred: {
      type: Boolean,
      default: false,
    },

    lastAccessed: {
      type: Date,
      default: null,
    },

    viewHistory: [
      {
        viewedAt: Date,
        ip: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Paste", PasteSchema);
