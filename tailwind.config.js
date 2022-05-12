const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["futura-pt", "sans-serif"],
      grad: ["Grad"],
    },

    extend: {
      colors: {
        pastelBlue: {
          100: "#8eccff",
          200: "#5fb8fe",
          300: "#35c8f2",
          400: "#009aff",
          500: "#008bf0",
        },
        pastelGreen: {
          100: "#bcf9d9",
          200: "#8af5c2",
          300: "#4cf0a9",
          400: "#00e896",
          500: "#00e184",
          600: "#00d174",
        },
        pastelRed: {
          100: "#ffced3",
          200: "#fa9a9a",
          300: "#f47372",
          400: "#ff4f4d",
          500: "#ff3d30",
        },
        pastelPurple: {
          100: "#a1a0f8",
          200: "#777af6",
          300: "#5759f3",
          400: "#3437ed",
          500: "#302de1",
        },
      },
    },
  },
  plugins: [],
};
