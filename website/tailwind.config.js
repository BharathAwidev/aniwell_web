/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        /* MAIN BRAND COLOR */
        primary: {
          DEFAULT: "#f97316",   // orange-500
          hover: "#ea580c",
          soft: "#fff7ed"
        },

        /* SECONDARY UI COLOR */
        secondary: {
          DEFAULT: "#6366f1",   // indigo
          hover: "#4f46e5"
        },

        /* ACCENT / HIGHLIGHT */
        accent: {
          DEFAULT: "#10b981",   // emerald
          hover: "#059669"
        },

        /* NEUTRAL UI COLORS */
        neutral: {
          50:"#f9fafb",
          100:"#f3f4f6",
          200:"#e5e7eb",
          300:"#d1d5db",
          400:"#9ca3af",
          500:"#6b7280",
          600:"#4b5563",
          700:"#374151",
          800:"#1f2937",
          900:"#111827"
        }

      }
    },
  },
  plugins: [],
}