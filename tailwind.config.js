/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{htm,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'custom-gradient-left': 'linear-gradient(to right, #ad0f148c,  #ad0f140e)',
        'custom-gradient-right': 'linear-gradient(to left, #ad0f148c, #ad0f140e)',
      },
    },
  },
  plugins: [],
}

