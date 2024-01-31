/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/layouts/*.{handlebars,html,js}',
    './views/*.{handlebars,html,js}',
    './views/partials/*.{handlebars,html,js}',
  ],
  theme: {
    extend: {
      height: {
        custom: '93%',
      }
    },
    colors: {
      darkblue: '#2F4056',
      teal: '#44848F',
      green: '#A4E034',
      lavender: '#BCA4DB',
      paleGreen: '#c8fadc',
      ghostWhite: '#E6E7EF',
      // Dark mode colors
      darkGray: '#202225',
      navyBlue: '#222730',
      offBlack: '#100f14',
      slateGray: '#222730',
      lightpink: '#f0776c',
    },
  },
  plugins: [require('daisyui')],
};
