/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        header: "80px",
        post_img: "328px",
        successImg: "53px",
      },
      width: {
        successImg: "53px",
      },
      maxWidth: {
        post: "408px",
        popup: "480px",
      },
      colors: {
        white: "#fff",
        black_: "#1A1A1F",
        gray_: "#85858D",
        dark_gray: "#404049",
        header_login: "#5D37F3",
        see_more: "#5D37F3",
        successImg: "#14D81C",
      },
      padding: {
        main: "76px",
        content_y: "66px",
        header_login_x: "20px",
        header_login_y: "10px",
        component_item_x: "16px",
        component_item_y: "8px",
        popup_x: "20px",
        popup_y: "40px",
        login_inp_x: "16px",
        login_inp_y: "12px",
        small_component_x: "10px",
        small_component_y: "6px",
      },
      margin: {
        home_container_t: "64px",
      },
      borderRadius: {
        header_login: "8px",
        component_item: "30px",
        12: "12px",
      },
      zIndex: {
        header: 99,
        popup: 999,
      },
      fontSize: {
        normal: "14px",
        64: "64px",
        16: "16px",
        12: "12px",
        20: "20px",
        24: "24px",
      },
      fontWeight: {
        700: 700,
        500: 500,
        400: 400,
      },
      lineHeight: {
        72: "72px",
        post_desc: "28px",
        32: "32px",
        20: "20px",
      },
      gap: {
        components: "24px",
        post_info: "16px",
        post: "24px",
        post_container_x: "32px",
        post_container_y: "56px",
      },
      borderColor: {
        input_normal: "#E4E3EB",
      },
      borderWidth: {
        input: "1px",
      },
      spacing: {
        x_icon: "20px",
      },
    },
  },
  plugins: [],
};
