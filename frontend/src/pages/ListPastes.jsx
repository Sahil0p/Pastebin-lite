

// import { useEffect, useState } from "react";
// import API from "../hooks/useApi";
// import { Link } from "react-router-dom";

// export default function ListPastes() {
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [showTrash, setShowTrash] = useState(false);
//   const [showStar, setShowStar] = useState(false);

//   const load = () => {
//     API.get("/pastes")
//       .then(res => setList(res.data))
//       .catch(() => setList([]))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => { load(); }, []);

//   const restore = async (id) => {
//     await API.patch(`/pastes/${id}/restore`);
//     load();
//   };

//   const trash = async (id) => {
//     await API.delete(`/pastes/${id}`);
//     load();
//   };

//   const deleteForever = async (id) => {
//     if (!confirm("Delete permanently?")) return;
//     await API.delete(`/pastes/${id}/permanent`);
//     load();
//   };

//   const toggleStar = async (id) => {
//     await API.patch(`/pastes/${id}/star`);
//     load();
//   };

//   let filtered = list.filter(p =>
//     p.title.toLowerCase().includes(search.toLowerCase())
//   );

//   if (category !== "All") filtered = filtered.filter(p => p.category === category);
//   if (showTrash) filtered = filtered.filter(p => p.isDeleted);
//   if (showStar) filtered = filtered.filter(p => p.isStarred);

//   if (loading)
//     return (
//       <div className="max-w-5xl mx-auto animate-pulse">
//         <div className="h-6 w-56 bg-gray-700 rounded mb-3"></div>
//         <div className="h-52 bg-gray-800 rounded-lg"></div>
//       </div>
//     );

//   return (
//     <div className="card">

//       <h1 className="text-3xl font-bold mb-4">📜 Manage Pastes</h1>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-3 mb-4">

//         <input
//           type="text"
//           placeholder="Search by title..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select value={category} onChange={(e) => setCategory(e.target.value)}>
//           <option>All</option>
//           <option>Coding</option>
//           <option>Notes</option>
//           <option>Logs</option>
//           <option>Secrets</option>
//         </select>

//         <label>
//           <input type="checkbox" className="mr-1"
//             checked={showStar}
//             onChange={() => setShowStar(!showStar)}
//           /> ⭐ Starred
//         </label>

//         <label>
//           <input type="checkbox" className="mr-1"
//             checked={showTrash}
//             onChange={() => setShowTrash(!showTrash)}
//           /> 🗑 Trash
//         </label>
//       </div>

//       {/* List */}
//       {filtered.length === 0 && (
//         <p className="text-gray-400">No matching pastes.</p>
//       )}

//       <div className="space-y-3">
//         {filtered.map((p) => (
//           <div key={p.id} className="card p-4">

//             <div className="flex justify-between flex-wrap">
//               <Link className="font-bold text-xl" to={`/p/${p.id}`}>
//                 {p.title} {p.isStarred && "⭐"}
//               </Link>

//               <div className="flex gap-2">

//                 <button onClick={() => toggleStar(p.id)} className="btn btn-primary">
//                   ⭐
//                 </button>

//                 {!p.isDeleted && (
//                   <button onClick={() => trash(p.id)} className="btn btn-danger">
//                     Trash
//                   </button>
//                 )}

//                 {p.isDeleted && (
//                   <>
//                     <button onClick={() => restore(p.id)} className="btn btn-green">
//                       Restore
//                     </button>

//                     <button onClick={() => deleteForever(p.id)} className="btn btn-danger">
//                       Delete
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>

//             <div className="text-sm opacity-80">
//               Category: {p.category}
//             </div>

//             <div className="text-sm opacity-70">
//               Views Left: {p.remaining_views ?? "∞"}
//             </div>

//             <div className="text-sm opacity-70">
//               Expires:{" "}
//               {p.expires_at
//                 ? new Date(p.expires_at).toLocaleString("en-IN", {
//                     timeZone: "Asia/Kolkata",
//                   })
//                 : "Never"}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import API from "../hooks/useApi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function ListPastes() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showTrash, setShowTrash] = useState(false);
  const [showStar, setShowStar] = useState(false);

  const load = () => {
    API.get("/pastes")
      .then(res => setList(res.data))
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const restore = async (id) => {
    await API.patch(`/pastes/${id}/restore`);
    toast.success("Restored Successfully");
    load();
  };

  const trash = async (id) => {
    await API.delete(`/pastes/${id}`);
    toast.success("Moved to Trash");
    load();
  };

  const deleteForever = async (id) => {
    if (!confirm("Delete permanently?")) return;
    await API.delete(`/pastes/${id}/permanent`);
    toast.success("Deleted Permanently");
    load();
  };

  const toggleStar = async (id) => {
    await API.patch(`/pastes/${id}/star`);
    toast.success("Star Updated ⭐");
    load();
  };

  let filtered = list.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (category !== "All") filtered = filtered.filter(p => p.category === category);
  if (showTrash)   filtered = filtered.filter(p => p.isDeleted);
  if (showStar)    filtered = filtered.filter(p => p.isStarred);

  if (loading)
    return (
      <div className="max-w-5xl mx-auto animate-pulse">
        <div className="h-6 w-56 bg-gray-700 rounded mb-3"></div>
        <div className="h-52 bg-gray-800 rounded-lg"></div>
      </div>
    );

  return (
    <div className="relative card shadow-strong">

      {/* Animated dashboard background */}
      <div className="absolute inset-0 -z-10 opacity-60">
        <div className="animate-pulse blur-3xl bg-[radial-gradient(circle_at_top,rgba(120,64,255,0.5),transparent_60%)] h-[40rem]" />
        <div className="animate-pulse delay-2000 blur-3xl bg-[radial-gradient(circle_at_bottom,rgba(60,220,255,0.6),transparent_60%)] h-[40rem]" />
      </div>

      <h1 className="text-4xl font-extrabold mb-6">
        📊 Your Pastes Dashboard
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">

        <input
          type="text"
          placeholder="Search by title..."
          className="card px-3 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="card px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Coding</option>
          <option>Notes</option>
          <option>Logs</option>
          <option>Secrets</option>
        </select>

        <label className="card px-3 py-2 cursor-pointer">
          <input
            type="checkbox"
            className="mr-1"
            checked={showStar}
            onChange={() => setShowStar(!showStar)}
          /> ⭐ Starred
        </label>

        <label className="card px-3 py-2 cursor-pointer">
          <input
            type="checkbox"
            className="mr-1"
            checked={showTrash}
            onChange={() => setShowTrash(!showTrash)}
          /> 🗑 Trash
        </label>
      </div>

      {/* Empty */}
      {filtered.length === 0 && (
        <p className="text-gray-400">No matching pastes found.</p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="card p-4 shadow-strong relative"
          >
            {/* Star badge */}
            {p.isStarred && (
              <span className="absolute right-3 top-3 text-yellow-400 text-xl">⭐</span>
            )}

            {/* Title */}
            <Link
              to={`/p/${p.id}`}
              className="font-bold text-xl hover:text-blue-400 transition"
            >
              {p.title || "Untitled Paste"}
            </Link>

            {/* Category chip */}
            <div className="mt-1">
              <span
                className={`px-3 py-1 rounded text-sm ${
                  p.category === "Coding"
                    ? "bg-blue-600/70"
                    : p.category === "Notes"
                    ? "bg-green-600/70"
                    : p.category === "Logs"
                    ? "bg-yellow-600/70"
                    : "bg-red-600/70"
                }`}
              >
                {p.category}
              </span>
            </div>

            {/* Info */}
            <div className="mt-2 text-sm opacity-80">
              Views Left: {p.remaining_views ?? "∞"}
            </div>

            <div className="text-sm opacity-70">
              Expires:
              {" "}
              {p.expires_at
                ? new Date(p.expires_at).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  })
                : "Never"}
            </div>

            {/* Buttons */}
            <div className="mt-3 flex gap-2 flex-wrap">

              <button
                onClick={() => toggleStar(p.id)}
                className="btn btn-primary"
              >
                ⭐ Star
              </button>

              {!p.isDeleted && (
                <button
                  onClick={() => trash(p.id)}
                  className="btn btn-danger"
                >
                  Trash
                </button>
              )}

              {p.isDeleted && (
                <>
                  <button
                    onClick={() => restore(p.id)}
                    className="btn btn-green"
                  >
                    Restore
                  </button>

                  <button
                    onClick={() => deleteForever(p.id)}
                    className="btn btn-danger"
                  >
                    Delete Forever
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
