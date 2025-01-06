/** @type {import('tailwindcss').Config} */
export default {
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

