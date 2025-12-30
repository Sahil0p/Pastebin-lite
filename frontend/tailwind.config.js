// export default {
//   darkMode: 'class',
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#7C3AED",
          blue: "#3B82F6",
          darkbg: "#0B1220",
        },
      },

      backgroundImage: {
        "pro-gradient":
          "linear-gradient(135deg, #1c1f2b 0%, #0B1220 40%, #111827 100%)",
        "light-gradient":
          "linear-gradient(135deg, #EEF2FF 0%, #E0EAFF 50%, #F9FAFB 100%)",
      },

      boxShadow: {
        glass: "0 20px 60px rgba(0,0,0,.45)",
      },

      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
