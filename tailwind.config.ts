import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-space)", "Space Grotesk", "sans-serif"],
      },
      colors: {
        primary: "#06b6d4",
        "primary-dark": "#0891b2",
      },
    },
  },
  plugins: [],
};

export default config;
