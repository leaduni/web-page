/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // escanea todos los componentes
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['League Spartan', 'system-ui', 'sans-serif'],
        spartan: ['League Spartan', 'sans-serif'],
        teachers: ['Teachers', 'serif'],
        yrsa: ['Yrsa', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
