/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Yekan: ['Yekan', 'sans-serif'], // Add IranSans to the font family
      },
    },
  },
  plugins: [],
}

