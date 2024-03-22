/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pri: "#2563eb",
        sec: "",
        dark: "#111827",
        light: "#f4f4f5",
      },
      fontFamily: {
        disp: ["Raleway", " sans-serif"],
      },
      boxShadow: {
        bshad: "0px 0px 6px 2px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
