/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        brand: ['Calistoga', 'cursive'],
      },
      colors: {
        // Brand colors
        primary: "#9D4EDD",
        "primary-hover": "#8631D9",
        teal: "#20B2AA",
        "teal-hover": "#1A8F89",
        gold: "#E6C200",
        "gold-hover": "#BFA000",
        sage: "#A7C4A0",
        "sage-hover": "#8FB286",
        error: "#E57373",
        // Light mode
        "light-bg": "#F8F8F8",
        "light-surface": "#FFFFFF",
        "light-text": "#121212",
        "light-text-secondary": "#6B7280",
        // Dark mode
        "dark-bg": "#121212",
        "dark-surface": "#1E1E1E",
        "dark-text": "#F8F8F8",
        "dark-text-secondary": "#A0AEC0",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
}