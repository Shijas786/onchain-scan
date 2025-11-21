/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        baseBlue: "#0052FF",
        baseSoftBlue: "#E7EEFF",
        baseBg: "#FFFFFF",
        baseText: "#0A0A0A",
        baseMuted: "#6F7C8A"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem"
      },
      boxShadow: {
        card: "0 18px 40px rgba(15, 23, 42, 0.12)"
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #0052FF, #4A8BFF)"
      }
    }
  },
  plugins: []
};

