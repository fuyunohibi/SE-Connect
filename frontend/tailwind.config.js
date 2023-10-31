/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      ringColor: {
        "status-success": "#44B98E",
      },
      colors: {
        primary: {
          DEFAULT: "#d0514a",
          200: "#D81B2D",
          300: "#C41929",
        },
        neutral: {
          DEFAULT: "#FFFFFF",
          gray: "#f7f7f7",
          200: "#F9F9F9",
          300: "#EFEFEF",
          400: "#AAAAAA",
          500: "#707070",
          600: "#303030",
          700: "#010101",
        },

        cream: {
          DEFAULT: "#eeefe3",
          text: "#8c9172",
        },
        // NAVIGATION
        navigation: {
          DEFAULT: "#29CC6A",
          200: "#47CB16",
          300: "#37981D",
        },
        notification: "#FF4343",
        error: "#DB0029",

        // Text
        black: {
          DEFAULT: "#303030",
          weak: "#707070",
          background: "#141415",
        },
        disabled: "#AAAAAA",

        button: {
          black: "#262627",
          hover: "#d0514a",
        },

        card: {
          blue: "#095167",
        },

        // SPECIFIC
        starShop: "#5788E5",
        shop: "#EF8282",
        price: "#F26464",
        warning: "#DC6666",

        // STATUS
        status: {
          cancel: "#E2617F",
          action: "#61A8F3",
          success: "#44B98E",
          waiting: "#FFBA29",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};