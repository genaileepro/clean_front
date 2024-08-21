/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Jua"', 'sans-serif'], // 주아 폰트
        ridibatang: ['"RIDIBatang"', 'serif'], // 리디바탕 폰트
        gangwon: ['"GangwonEduPowerExtraBoldA"', 'sans-serif'], // 강원튼튼체 폰트
        sbaggroThin: ['"SBAggroThin"', 'sans-serif'], // 100 굵기
        sbaggroLight: ['"SBAggroLight"', 'sans-serif'], // 300 굵기
        sbaggroNormal: ['"SBAggroNormal"', 'sans-serif'], // 500 굵기
        sbaggroBold: ['"SBAggroBold"', 'sans-serif'], // 700 굵기
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
