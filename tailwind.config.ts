import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      }, 
      spacing: {
          "calc-h-full-50": "calc(100% - 50px)",
          "calc-h-full-75": "calc(100% - 75px)",
          "calc-h-full-100": "calc(100% - 100px)",
          "calc-h-full-150": "calc(100% - 150px)",
      },
    },
  },
  plugins: [],
};
export default config;
