/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: "#F7C6D9",
        "blush-deep": "#E8779A",
        sunrise: "#FDE8B0",
        "sunrise-deep": "#F6C568",
        plum: "#4A2E3A",
        cream: "#FFF8F3",
        glass: "rgba(255,255,255,0.28)",
        "glass-border": "rgba(255,255,255,0.45)",
        neon: "#FF3D8A",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"],
        hand: ["'Caveat'", "cursive"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        gradientMove: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px) rotate(var(--rot,0deg))" },
          "50%": { transform: "translateY(-10px) rotate(var(--rot,0deg))" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        gradientMove: "gradientMove 12s ease infinite",
        glitch: "glitch 0.25s infinite",
        floaty: "floaty 4s ease-in-out infinite",
        spinSlow: "spinSlow 6s linear infinite",
      },
    },
  },
  plugins: [],
};
