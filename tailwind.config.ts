import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#2D1141',
          'navy-light': '#3B1550',
          gold: '#C9A84C',
          'gold-dark': '#B8943F',
          cream: '#f5f0e8',
          'light-bg': '#faf8f5',
          charcoal: '#2d3748',
          slate: '#4a5568',
          'warm-gray': '#8B7E74',
          white: '#faf8f5',
          purple: '#2D1141',
          'purple-light': '#3B1550',
          'purple-dark': '#1E0A2E',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
