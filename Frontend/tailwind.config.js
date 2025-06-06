/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        plex: ['IBM Plex Sans', 'sans-serif'],
        serif2: ["'Source Serif 4'", "Georgia", "Cambria", "'Times New Roman'", "Times", "serif"],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    base: false,
    themes: ["light", "dark"],
  },
}