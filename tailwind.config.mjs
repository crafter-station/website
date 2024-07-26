import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        brick: ["NT Brick Sans", ...defaultTheme.fontFamily.sans],
        space: ["Space Mono", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        night: "#1F1F1F",
        pineapple: "#FFDF6B",
        sky: "#AAFCBE",
        bone: "#FFFCEB",
        strawberry: "#F6AFFB",
        berries: "#FF704B",
        grape: "#2F1B6D",
        wine: "#5A2B6A",
      },
    },
  },
  plugins: [],
};
