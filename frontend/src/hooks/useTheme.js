// import { useEffect, useState } from "react";

// export default function useTheme() {
//   const getInitialTheme = () => {
//     const saved = localStorage.getItem("theme");
//     return saved ? saved : "dark";   // DEFAULT DARK
//   };

//   const [theme, setTheme] = useState(getInitialTheme);

//   useEffect(() => {
//     const root = document.documentElement;

//     if (theme === "dark") root.classList.add("dark");
//     else root.classList.remove("dark");

//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   return { theme, setTheme };
// }

import { useEffect, useState } from "react";

export default function useTheme() {
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");

    if (saved) return saved;

    // default to dark if nothing saved
    return "dark";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
