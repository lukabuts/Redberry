import back_btn from "../../assets/images/back_btn.svg";

function BackBtn() {
  return (
    <div className="fixed hidden cursor-pointer top-back_icon_t left-back_icon_l lg:block">
      <button
        className="flex items-center justify-center rounded-full bg-disabled_btn h-btn w-btn"
        onClick={() => {
          window.open("/", "_self");
        }}
      >
        <img src={back_btn} alt="Go Back" />
      </button>
    </div>
  );
}

export default BackBtn;
