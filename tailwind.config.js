/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "container-box":
          "rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
      },
    },
    colors: {
      primary: "rgb(90, 41, 139)",
      primaryHover: "rgba(90, 41, 139, 0.04)",
      inputLabel: "#5b5b5b",
    },
    screens: {
      mobile: { min: "0px", max: "600px" },
      tablet: { min: "601px", max: "750px" },
      laptop: { min: "751", max: "1024px" },
      desktop: { min: "1025px", max: "1280px" },
    },
  },
  plugins: [],
};
