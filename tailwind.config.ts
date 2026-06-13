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
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      colors: {
        primary: "#06b6d4",
        "primary-dark": "#0891b2",
      },
      animation: {
        "blob-1": "blobMove1 12s ease-in-out infinite",
        "blob-2": "blobMove2 15s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
