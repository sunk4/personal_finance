module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        "soft-sky-blue": "#B7C4CF",
        "ivory-sand": "#EEE3CB",
        "warm-beige": "#D7C0AE",
        "earthy-olive": "#967E76",
        "dark-chocolate": "#3E2E2C",
        "dark-slate-blue": "#2D3142",
      },
      fontSize: {
        sm: "0.8rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
    },
  },
  plugins: [],
};
