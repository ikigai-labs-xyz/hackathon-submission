/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        30: "30px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "app-bg": "#0F101C",
        "bar-bg": "#07080E",
        "secondary-grey": "#C2C2C2",
        "heading-grey": "#DBDBDB",
      },
    },
  },
  plugins: [],
}
