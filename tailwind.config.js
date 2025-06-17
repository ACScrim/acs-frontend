/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette spatiale
        space: {
          // Couleurs primaires
          primary: {
            DEFAULT: "#6d28d9", // Violet spatial
            light: "#8b5cf6",
            dark: "#4c1d95",
          },
          // Couleurs secondaires
          secondary: {
            DEFAULT: "#0284c7", // Bleu cosmos
            light: "#38bdf8",
            dark: "#0c4a6e",
          },
          // Couleurs d'accentuation
          accent: {
            DEFAULT: "#fb923c", // Orange stellaire
            light: "#fdba74",
            dark: "#c2410c",
          },
          // Couleurs de fond
          bg: {
            DEFAULT: "#030712", // Noir profond
            dark: "#000000",
            light: "#1e293b",
          },
          // Texte
          text: {
            DEFAULT: "#f1f5f9", // Blanc stellaire
            muted: "#94a3b8",
            dark: "#64748b",
          },
          // États
          success: "#4ade80",
          warning: "#facc15",
          error: "#f87171",
          info: "#60a5fa",
        },
      },
      fontFamily: {
        heading: ["Orbitron", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
        orbit: "orbit 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.3 },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(50px) rotate(0deg)" },
          "100%": {
            transform: "rotate(360deg) translateX(50px) rotate(-360deg)",
          },
        },
      },
      boxShadow: {
        "glow-primary": "0 0 15px 5px rgba(109, 40, 217, 0.4)",
        "glow-secondary": "0 0 15px 5px rgba(2, 132, 199, 0.4)",
        "glow-accent": "0 0 15px 5px rgba(251, 146, 60, 0.4)",
      },
      backgroundImage: {
        stars: "url('/src/assets/images/stars-bg.png')",
        nebula: "url('/src/assets/images/nebula-bg.png')",
        planets: "url('/src/assets/images/planets-bg.png')",
      },
    },
  },
  plugins: [],
};
