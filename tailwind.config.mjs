/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        calistoga: ['var(--font-calistoga)'],
        poppins: ['var(--font-poppins)'],
        inter: ['var(--font-inter)'],
      },
      colors: {
        mousa: '#0D5EAF',
        dark: {
          main: '#0A0A0B',    // Main background (darkest)
          sidebar: '#0F0F11', // Sidebar background (darker)
          header: '#121214',  // Header background (lighter)
          player: '#18181B',  // Player background (lightest)
        }
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark", "light"],
  },
}

export default config