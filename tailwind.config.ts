import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ember: "#D86C4A",
        "ember-dim": "#A8512F",
        "ember-glow": "#F2B07B",
        bg: "#0F0906",
        "bg-mid": "#1A120F",
        "bg-surface": "#251810",
        "bg-border": "#2E1D14",
        "text-primary": "#F5EDE6",
        "text-secondary": "#B8957E",
        "text-dim": "#6B4A36",
        manha: "#FBF6EE",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Inter Tight", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        aurora: "aurora 12s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        aurora: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
