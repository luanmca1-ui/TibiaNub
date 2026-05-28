import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ember: "#d9822b",
        parchment: "#e9dcc3",
        obsidian: "#11100f",
        iron: "#2b3036",
        moss: "#5e7f4f",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(217,130,43,0.2), 0 20px 60px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
