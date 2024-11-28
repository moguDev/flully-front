import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxHeight: {
        nearbyinformation: "calc(100vh - 120px)", // 例: 100vhから50px引いた値
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        base: "#fafafa",
        main: "#90acaf",
        black: "#2a2a2a",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
};
export default config;
