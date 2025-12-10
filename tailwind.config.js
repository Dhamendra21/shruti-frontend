/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgMain: "#0a0f12",
        bgHeader: "#0e1216",
        bgBox: "#0c1216",
        bgText: "#0c1115",
        textMain: "#e7e7e7",
        border1: "#181e22",
        border2: "#191f24",
        purpleAccent: "#915aff"
      },
      boxShadow: {
        soft: "0 18px 40px rgba(0,0,0,0.6)"
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem"
      }
    },
  },
  plugins: [],
}
