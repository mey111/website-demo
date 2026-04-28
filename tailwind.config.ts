import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        latte: '#f7ede2',
        mocha: '#6f4e37',
        crema: '#ffd166',
        bean: '#3d2b1f'
      },
      boxShadow: {
        sticker: '0 10px 30px -10px rgba(111, 78, 55, 0.55)'
      }
    }
  },
  plugins: []
};

export default config;
