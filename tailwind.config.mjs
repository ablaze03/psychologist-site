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
        peach: '#EAD5C6',
        aquaSoft: '#C7D7C9',
        brand: '#0E7C86',
        'brand-hover': '#0a656d',
        'brand-light': 'rgba(14, 124, 134, 0.1)',
      },
    },
  },
  plugins: [],
}

