module.exports = {
  important: true,
  // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  // mode: 'jit',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          150: 'rgba(170, 126, 80, 0.1)',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
