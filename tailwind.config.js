/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        header: "80px",
      },
      colors: {
        white: "#fff",
        header_login: "#5D37F3",
      },
      padding: {
        header: "76px",
        header_login_x: "20px",
        header_login_y: "10px",
      },
      borderRadius: {
        header_login: "8px",
      },
    },
  },
  plugins: [],
};
