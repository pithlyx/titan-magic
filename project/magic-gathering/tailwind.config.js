/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    debugScreens: {
      position: ["bottom", "left"],
    },
    colors: {
      black: "#000",
      bg: "#333443",
      menu: "#333443",
      container: "#5D5E74",
      primary: "#70B6CE",
      secondary: "#5EADC8",
      txt: "#c8d5e6",
    },
  },

  plugins: [],
}
