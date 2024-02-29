/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "login-box":
          "rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
      },
    },
    colors: {
      primary: "rgb(90, 41, 139)",
      primaryHover: "rgba(90, 41, 139, 0.04)",
    },
    screens: {
      mobile: { min: "0px", max: "370px" },
      tablet: { min: "371px", max: "640px" },
      laptop: { min: "641px", max: "1024px" },
      desktop: { min: "1025px", max: "1280px" },
    },
  },
  plugins: [],
};
