/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      colors: {
        base: '#FBFAF7',
        nimbus: '#D9D9D9',
        ink: '#111827',
        lemon: '#F5E8A6',
        ice: '#D7E7F6',
        peach: '#E8C4B0',
        aquaSoft: '#C7D7C9',
        accent: '#D4A5A5',
        sage: '#8FA898',
        brand: '#5A9B7D',
        'brand-hover': '#4A8A6D',
        'brand-light': 'rgba(90, 155, 125, 0.1)',
      },
    },
  },
  plugins: [],
}

