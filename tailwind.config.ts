import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#37133b',    // Violet
        'primary-light': '#410e46', // Lighter Violet
        secondary: '#B25F6E',  // Pastel Burgundy
        accent: '#FAF0E6',     // Cream
        dark: '#37133b',       // Violet (Page Background)
        'dark-light': '#410e46', // Lighter Violet (Header Background)
        light: '#FAF0E6',      // Cream
      },
      fontFamily: {
        heading: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        body: ['var(--font-sora)', 'Sora', 'sans-serif'],
        sans: ['var(--font-sora)', 'Sora', 'sans-serif'],
        serif: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config 