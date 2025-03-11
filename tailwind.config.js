/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        SfLight:"SF-Light",
        SfRegular:"SF-Regular",
        SfSemiBold:"SF-Semibold",
        SfBold:"SF-bold",
        pop: "Poppins",
        raleway: "Raleway",
        raleway_SF: "RalewaySF"
      },
      lineClamp:{
        8:'8',
      }
    },
  },
  plugins: [],
}

