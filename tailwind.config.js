/** @type {import('tailwindcss').Config} */
export default {
  purge: {
    // other purge options
    options: {
      safelist: ['text-blue-600', 'text-blue-400', 'font-bold'], // keep this class in the final build
    },
  },
  important: true,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
        height: 'hight',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        reddit: ['Reddit Sans Condensed', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
