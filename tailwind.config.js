/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'nyxxus-black': '#000000',
        'nyxxus-white': '#ffffff',
        'nyxxus-gray': '#1a1a1a',
        'nyxxus-blue': '#3b82f6',
        'nyxxus-green': '#10b981',
      },
    },
  },
  plugins: [],
}