// import { useState, useEffect } from "react";
// import API from "../hooks/useApi";
// import Editor from "react-simple-code-editor";
// import Prism from "prismjs";
// import toast from "react-hot-toast";

// import "prismjs/components/prism-javascript";

// export default function CreatePaste() {
//   const [theme, setTheme] = useState("dark");

//   useEffect(() => {
//     const isDark = document.documentElement.classList.contains("dark");

//     import(
//       isDark
//         ? "prismjs/themes/prism-tomorrow.css"
//         : "prismjs/themes/prism-coy.css"
//     );
//     setTheme(isDark ? "dark" : "light");

//     const observer = new MutationObserver(() => {
//       const dark = document.documentElement.classList.contains("dark");
//       setTheme(dark ? "dark" : "light");
//     });

//     observer.observe(document.documentElement, { attributes: true });
//     return () => observer.disconnect();
//   }, []);

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [category, setCategory] = useState("Notes");
//   const [password, setPassword] = useState("");
//   const [ttl, setTtl] = useState("");
//   const [maxViews, setMaxViews] = useState("");
//   const [permanent, setPermanent] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   const createPaste = async () => {
//     setError("");
//     setResult(null);

//     if (!content.trim()) {
//       toast.error("Paste content cannot be empty!");
//       return;
//     }

//     try {
//       const res = await API.post("/pastes", {
//         title,
//         content,
//         category,
//         password: password || undefined,
//         permanent,
//         ttl_seconds: permanent ? undefined : ttl ? Number(ttl) : undefined,
//         max_views: permanent ? undefined : maxViews ? Number(maxViews) : undefined,
//       });

//       setResult(res.data);
//       toast.success("Paste Created Successfully 🎉");
//     } catch (err) {
//       const msg = err?.response?.data?.message || "Failed to create paste";
//       setError(msg);
//       toast.error(msg);
//     }
//   };

//   return (
//     <div
//       className={`relative max-w-6xl mx-auto ${
//         theme === "dark" ? "text-gray-200" : "text-gray-900"
//       }`}
//     >
//       {/* HEADER */}
//       <div className="text-center py-8">
//         <h1 className="page-title">Create New Paste</h1>
//         <p className="subtitle">Professional • Secure • Pastebin PRO Experience</p>
//       </div>

//       {/* TITLE */}
//       <input
//         type="text"
//         placeholder="Paste Title"
//         className="w-full mb-4"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       {/* EDITOR */}
//       <div className="card editor-box shadow-strong">
//         <Editor
//           value={content}
//           onValueChange={setContent}
//           highlight={(code) =>
//             Prism.highlight(code, Prism.languages.javascript, "javascript")
//           }
//           padding={16}
//           className={`min-h-[380px] text-sm outline-none rounded-xl ${
//             theme === "dark"
//               ? "bg-black text-green-300"
//               : "bg-white text-gray-900"
//           }`}
//           placeholder="// Write your code or text here..."
//         />
//       </div>

//       {/* SETTINGS */}
//       <div className="card mt-8 shadow-strong">
//         <h3 className="text-xl font-bold mb-3">Paste Settings</h3>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="Coding">Coding</option>
//             <option value="Notes">Notes</option>
//             <option value="Logs">Logs</option>
//             <option value="Secrets">Secrets</option>
//           </select>

//           <input
//             type="password"
//             placeholder="Password (optional)"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <input
//             type="number"
//             placeholder="TTL (seconds)"
//             value={ttl}
//             disabled={permanent}
//             className={permanent ? "opacity-50 cursor-not-allowed" : ""}
//             onChange={(e) => setTtl(e.target.value)}
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//           <input
//             type="number"
//             placeholder="Max Views"
//             value={maxViews}
//             disabled={permanent}
//             className={permanent ? "opacity-50 cursor-not-allowed" : ""}
//             onChange={(e) => setMaxViews(e.target.value)}
//           />

//           <label className="flex items-center gap-2 text-sm">
//             <input
//               type="checkbox"
//               checked={permanent}
//               onChange={() => setPermanent(!permanent)}
//             />
//             Permanent Paste (Never Expires)
//           </label>
//         </div>

//         <button
//           onClick={createPaste}
//           className="btn btn-primary mt-6 shadow-strong"
//         >
//           🚀 Create Paste
//         </button>
//       </div>

//       {/* RESULT */}
//       {result && (
//         <div className="card mt-6 shadow-strong">
//           <p className="text-green-500 font-bold">
//             🎉 Paste Created Successfully
//           </p>

//           <p className="font-mono break-all mt-2">
//             {window.location.origin}/p/{result.id}
//           </p>

//           <div className="flex gap-3 mt-3">
//             <button
//               className="btn btn-green"
//               onClick={() =>
//                 navigator.clipboard.writeText(
//                   `${window.location.origin}/p/${result.id}`
//                 )
//               }
//             >
//               📋 Copy Link
//             </button>

//             <button
//               className="btn btn-primary"
//               onClick={() =>
//                 window.open(
//                   `${window.location.origin}/p/${result.id}`,
//                   "_blank"
//                 )
//               }
//             >
//               🔗 Open in New Tab
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import API from "../hooks/useApi";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import toast from "react-hot-toast";

import "prismjs/components/prism-javascript";

export default function CreatePaste() {
  const [theme, setTheme] = useState("dark");

  // 🔥 Detect Theme & Load Matching Prism Theme
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");

    import(
      isDark
        ? "prismjs/themes/prism-tomorrow.css"
        : "prismjs/themes/prism-coy.css"
    );

    setTheme(isDark ? "dark" : "light");

    const observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains("dark");
      setTheme(dark ? "dark" : "light");
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // ------------------ FORM STATES ------------------
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Notes");
  const [password, setPassword] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [permanent, setPermanent] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // ✅ Reset Form When Page Reopened
  const location = useLocation();
  useEffect(() => {
    setTitle("");
    setContent("");
    setCategory("Notes");
    setPassword("");
    setTtl("");
    setMaxViews("");
    setPermanent(false);
    setResult(null);
    setError("");
  }, [location.key]);

  // ------------------ CREATE PASTE ------------------
  const createPaste = async () => {
    setError("");
    setResult(null);

    if (!content.trim()) {
      toast.error("Paste content cannot be empty!");
      return;
    }

    try {
      const res = await API.post("/pastes", {
        title,
        content,
        category,
        password: password || undefined,
        permanent,
        ttl_seconds: permanent ? undefined : ttl ? Number(ttl) : undefined,
        max_views: permanent ? undefined : maxViews ? Number(maxViews) : undefined,
      });

      setResult(res.data);
      toast.success("Paste Created Successfully 🎉");
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to create paste";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div
      className={`relative max-w-6xl mx-auto ${
        theme === "dark" ? "text-gray-200" : "text-gray-900"
      }`}
    >
      {/* HEADER */}
      <div className="text-center py-8">
        <h1 className="page-title">Create New Paste</h1>
        <p className="subtitle">
          Professional • Secure • Pastebin Experience
        </p>
      </div>

      {/* TITLE */}
      <input
        type="text"
        placeholder="Paste Title"
        className="w-full mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* EDITOR */}
      <div className="card editor-box shadow-strong">
        <Editor
          value={content}
          onValueChange={setContent}
          highlight={(code) =>
            Prism.highlight(code, Prism.languages.javascript, "javascript")
          }
          padding={16}
          className={`min-h-[380px] text-sm outline-none rounded-xl ${
            theme === "dark"
              ? "bg-black text-green-300"
              : "bg-purple-100 text-gray-900"
          }`}
          placeholder="// Write your code or text here..."
        />
      </div>

      {/* SETTINGS */}
      <div className="card mt-8 shadow-strong">
        <h3 className="text-xl font-bold mb-3">Paste Settings</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Coding">Coding</option>
            <option value="Notes">Notes</option>
            <option value="Logs">Logs</option>
            <option value="Secrets">Secrets</option>
          </select>

          <input
            type="password"
            placeholder="Password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="number"
            placeholder="TTL (seconds)"
            value={ttl}
            disabled={permanent}
            className={permanent ? "opacity-50 cursor-not-allowed" : ""}
            onChange={(e) => setTtl(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <input
            type="number"
            placeholder="Max Views"
            value={maxViews}
            disabled={permanent}
            className={permanent ? "opacity-50 cursor-not-allowed" : ""}
            onChange={(e) => setMaxViews(e.target.value)}
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={permanent}
              onChange={() => setPermanent(!permanent)}
            />
            Permanent Paste (Never Expires)
          </label>
        </div>

        <button
          onClick={createPaste}
          className="btn btn-primary mt-6 shadow-strong"
        >
          🚀 Create Paste
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <div className="card mt-6 shadow-strong">
          <p className="text-green-500 font-bold">
            🎉 Paste Created Successfully
          </p>

          <p className="font-mono break-all mt-2">
            {window.location.origin}/p/{result.id}
          </p>

          <div className="flex gap-3 mt-3">
            <button
              className="btn btn-green"
              onClick={() =>
                navigator.clipboard.writeText(
                  `${window.location.origin}/p/${result.id}`
                )
              }
            >
              📋 Copy Link
            </button>

            <button
              className="btn btn-primary"
              onClick={() =>
                window.open(
                  `${window.location.origin}/p/${result.id}`,
                  "_blank"
                )
              }
            >
              🔗 Open in New Tab
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
