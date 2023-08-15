/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5271FF",
        primary_light: "#5271FF",
        secondary: "#ff005b",
      },
      backgroundImage: {
        "gradient-black":
          "linear-gradient(to bottom, transparent 0%, transparent 40%, black 70%, black 100%)",
      },
    },
  },
  plugins: [],
};
