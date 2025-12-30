import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../hooks/useApi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function ViewPaste() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [paste, setPaste] = useState(null);
  const [error, setError] = useState("");

  // Prevent double view decrement bug
  const loaded = useRef(false);

  const pasteUrl = `${window.location.origin}/p/${id}`;
  const rawUrl = `${import.meta.env.VITE_API_URL}/pastes/${id}/raw`;

  const loadPaste = async (password = null) => {
    try {
      const res = await API.get(`/pastes/${id}`, {
        headers: password ? { "x-paste-password": password } : undefined,
      });

      setPaste(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        const pw = prompt("This paste is password protected. Enter password:");
        if (pw) loadPaste(pw);
        return;
      }
      setError("⚠️ This paste is unavailable.");
    }
  };

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    loadPaste();
  }, [id]);

  const trashPaste = async () => {
    await API.delete(`/pastes/${id}`);
    toast.success("Moved to Trash");
    navigate("/list");
  };

  const restorePaste = async () => {
    await API.patch(`/pastes/${id}/restore`);
    toast.success("Restored Successfully");
    navigate("/list");
  };

  const deleteForever = async () => {
    if (!confirm("This cannot be undone")) return;
    await API.delete(`/pastes/${id}/permanent`);
    toast.success("Deleted Permanently");
    navigate("/list");
  };

  if (!paste && !error)
    return (
      <div className="max-w-5xl mx-auto animate-pulse">
        <div className="h-6 w-56 bg-gray-700 rounded mb-3"></div>
        <div className="h-72 bg-gray-800 rounded-lg"></div>
      </div>
    );

  if (error)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-red-400 text-xl font-semibold mt-10"
      >
        {error}
      </motion.div>
    );

  /** ---------------- SAFE NORMALIZATION ---------------- **/
  const isPermanent =
    paste.isPermanent ?? paste.permanent ?? paste?.is_permanent ?? false;

  const expires =
    paste.expires_at ??
    paste.expiresAt ??
    paste?.expires ??
    null;

  const lastAccess =
    paste.last_accessed ??
    paste.lastAccessed ??
    paste?.last_access ??
    null;

  const remainingViews =
    paste.remaining_views ??
    paste.maxViews ??
    paste.viewsLeft ??
    "Unlimited";

  /** --------------------------------------------------- **/

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative card shadow-strong"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3 flex-wrap gap-3">
        <h1 className="text-3xl font-bold">{paste.title || "Untitled"}</h1>

        <div className="flex gap-2">
          <span className="tag tag-notes">{paste.category}</span>

          {isPermanent && (
            <span className="permanent-badge animate-pulse">♾ Permanent</span>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <pre className="bg-black text-green-300 p-4 rounded-xl overflow-auto text-sm border border-gray-700 min-h-[260px] mt-3">
{paste.content}
      </pre>

      {/* INFO GRID */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        
        {/* Remaining Views */}
        <div className="card p-3">
          Remaining Views:
          <span className="font-bold text-blue-400 ml-1">
            {remainingViews}
          </span>
        </div>

        {/* EXPIRES */}
        <div className="card p-3">
  Expires:
  <span className="font-bold text-yellow-300 ml-1">
    {isPermanent
      ? "Never"
      : expires
      ? new Date(expires).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })
      : "Never"}
  </span>
</div>


        {/* LAST ACCESSED */}
        <div className="card p-3">
  Last Accessed:
  <span className="font-bold text-green-400 ml-1">
    {lastAccess
      ? new Date(lastAccess).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })
      : "Never"}
  </span>
</div>


      </div>
    </motion.div>
  );
}
