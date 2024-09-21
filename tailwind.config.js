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
      textShadow: {
        'sm': '1px 1px 2px rgba(0, 0, 0, 0.5)',
        'md': '2px 2px 4px rgba(0, 0, 0, 0.7)',
        'lg': '3px 3px 6px rgba(0, 0, 0, 0.9)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spin-fast': 'spin 0.5s linear infinite',
      },
    },
    
  },
  plugins: [
    require('tailwindcss-textshadow'),
  ],
}

