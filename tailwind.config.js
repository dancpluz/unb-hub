/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        text: {
          0: "#FFFFFF",
          1: "#EBEBF5",
          2: "#010618"
        },
        background: {
          0: "#010618",
          1: "#141927",
          2: "#21283F",
          3: "#EBEBF5",
          4: "#FFFFFF"
        },
        border: {
          0: "#FFFFFF",
          1: "#EBEBF5",
          2: "#21283F"
        },
        semantic: {
          action: {
            0: "#80B3FF",
            1: "#C6DDFF"
          },
          success: {
            0: "#4AD2C9",
            1: "#CCEFEF"
          },
          warning: {
            0: "#FFC374",
            1: "#FFF0DD"
          },
          error: {
            0: "#F66B6B",
            1: "#F9CCCC"
          },
        }
      },
      fontFamily: {
        iblack: ["Inter-Black", "sans-serif"],
        ibold: ["Inter-Bold", "sans-serif"],
        iextrabold: ["Inter-ExtraBold", "sans-serif"],
        iextralight: ["Inter-ExtraLight", "sans-serif"],
        ilight: ["Inter-Light", "sans-serif"],
        imedium: ["Inter-Medium", "sans-serif"],
        iregular: ["Inter-Regular", "sans-serif"],
        isemibold: ["Inter-SemiBold", "sans-serif"],
        ithin: ["Inter-Thin", "sans-serif"],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
