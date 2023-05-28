/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: [
        "rgb(251 207 232)",
        "rgb(187 247 208)",
        "rgb(191 219 254)",
      ],
      colors: ["rgb(244 114 182)", "rgb(74 222 128)", "rgb(96 165 250)"],
    },
  },
  plugins: [],
};
