


import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -35, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50"
    >
      <div className="
        mx-auto container px-6 py-4 mt-3
        rounded-2xl shadow-glass
        bg-white/70 dark:bg-gray-900/70
        backdrop-blur-xl border border-white/20
        flex justify-between items-center">
        
        {/* LOGO */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tight
          bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
        >
          Pastebin Lite
        </Link>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/"
            className="px-4 py-2 rounded-xl font-medium
            bg-gradient-to-r from-blue-500 to-purple-500
            hover:opacity-90 shadow-lg text-white"
          >
            Create Paste
          </Link>

          <Link
            to="/list"
            className="px-4 py-2 rounded-xl font-medium
            bg-gray-800 hover:bg-gray-700 text-white shadow"
          >
            View Pastes
          </Link>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300
            dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition shadow"
          >
            {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-xl px-4 py-2 rounded-lg bg-gray-800 text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="mx-auto container mt-2 p-4 rounded-2xl
            bg-white/80 dark:bg-gray-900/80 border border-white/20 shadow-xl backdrop-blur-xl
            md:hidden"
          >
            <div className="flex flex-col gap-3">

              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl text-center font-semibold
                bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow"
              >
                Create Paste
              </Link>

              <Link
                to="/list"
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl text-center
                bg-gray-800 hover:bg-gray-700 text-white shadow"
              >
                View Pastes
              </Link>

              <button
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                  setOpen(false);
                }}
                className="px-4 py-3 rounded-xl
                bg-gray-200 hover:bg-gray-300
                dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white shadow"
              >
                {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
