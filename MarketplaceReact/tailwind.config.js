/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        blue: "rgba(var(--blue))",
        'banner-button': "rgba(var(--banner-button))",
        'banner-text': "rgba(var(--banner-text))",
        text: "rgba(var(--text))",
        'price-text': "rgba(var(--price-text))",
        background: "rgba(var(--background))",
      },
    },
  },
  plugins: [],
}