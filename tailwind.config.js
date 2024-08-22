/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans KR"'], // 기본 폰트 설정
        jalnan: ['"JalnanGothic"', 'sans-serif'], // 포인트 폰트 설정
      },
      colors: {
        brand: {
          DEFAULT: '#0BB8F9',
          light: '#3CC7FA',
          dark: '#0A9ED9',
        },
      },
    },
  },
  plugins: [],
};
