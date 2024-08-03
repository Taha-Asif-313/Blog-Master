/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#00e3ae",
        "blog-title":""
      }
    },
  },
  plugins: [require('daisyui')],
}

