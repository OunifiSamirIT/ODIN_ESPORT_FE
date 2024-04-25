/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
      },
      colors : {
        'orange' : {
          new : '#FF7F00'
        } 
      },
      
    },
  },
  plugins: [],
}
