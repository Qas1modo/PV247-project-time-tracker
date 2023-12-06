import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    // colors: {
    //   primary: "black",
    //   secondary: "#1f2937",
    //   transparent: "transparent",
    //   current: "currentColor",
    //   "volny-cas": "#669900",
    //   prace: "#ff6600",
    //   skola: "#ffcc00",
    //   sport: "#3399cc",
    //   konicky: "#ccee66",
    //   seberealizace: "#990066",
    //   cestovani: "#cc3399",
    //   "domaci-prace": "#ff9900",
    //   povinnosti: "#006699",
    //   spanek: "#99cc33",
    // },
  },
  plugins: [require("daisyui")],
};
export default config;
