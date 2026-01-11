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
        aquaSoft: '#6FA884',
        accent: '#D4A5A5',
        sage: '#8FA898',
        brand: '#6FA884',
        'brand-hover': '#5A9B7D',
        'brand-light': 'rgba(111, 168, 132, 0.1)',
      },
    },
  },
  plugins: [],
}

