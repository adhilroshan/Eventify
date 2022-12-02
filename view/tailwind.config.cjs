/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "map-sidebar": "rgba(35, 55, 75, 0.9)",
      },
    },
  },
  plugins: [],
};
