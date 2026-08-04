const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require('tailwindcss/colors')
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      white: "#ffffff",
      black: "#000000",
      background: "#F0F2FF",
      primary: "#242F9B",
      secondary: "#797979",
      accent: "#2E0249",
      gray: "#F0F0F0",
      error: "#FF0000",
      success: "#00FF00",
      danger: "#CA0B00",
      slate: require('tailwindcss/colors').slate
    },
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", ...defaultTheme.fontFamily.serif],
        jarkata: ["Plus Jakarta Sans"],
      },
      width: {
        128: "33rem",
        130: "36rem",
        120: "29rem",
      },
    },
  },
  plugins: [],
};
