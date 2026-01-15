/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f5f5f7'
        },
        border: {
          subtle: '#e5e7eb'
        },
        accent: {
          DEFAULT: '#0f766e'
        }
      }
    }
  },
  plugins: []
}

