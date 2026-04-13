import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-main": "#000000",
        "bg-surface": "#0b0b0b",
        "accent-green": "#00FF88",
      },
      boxShadow: {
        "glow": "0 0 20px rgba(0, 255, 136, 0.3)",
      },
       animation: {
        "glow": "glow 3s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(0, 255, 136, 0.2)" },
          "50%": { boxShadow: "0 0 20px rgba(0, 255, 136, 0.4)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
