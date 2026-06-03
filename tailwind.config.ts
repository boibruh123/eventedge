import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        night: "#0B1120",
        primary: "#00D4FF",
        secondary: "#7C3AED",
        accent: "#FF6B00"
      },
      boxShadow: {
        glow: "0 0 40px rgba(0, 212, 255, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
