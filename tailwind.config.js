/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#519674",
        secondary: {
          100: "#EDE7E0",
          500: "#CDCDC3",
          900: "#8DAC99"
        },
      },
      fontFamily:{
        'ubuntu': ['Ubuntu', 'sans-serif'],
      },
    },
    
  },
  plugins: [],
}

