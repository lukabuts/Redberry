import { useState } from "react";
import xImg from "../../assets/x.svg";
import vectorImg from "../../assets/Vector.svg";

function Popup({ setActivePopup, successText }: { successText: string }) {
  const [success, setSuccess] = useState<boolean>(false);

  function closePopup() {
    setActivePopup(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSuccess(true);
  }

  function handleBtnClick() {
    success && closePopup();
  }

  return (
    <div
      //   onClick={closePopup}
      className="fixed  top-0 flex items-center justify-center w-full h-full cursor-pointer bg-black_ bg-opacity-[0.24] z-popup "
    >
      <div className="relative block w-full bg-white px-popup_x py-popup_y rounded-12 max-w-popup">
        {/* X icon */}
        <button
          onClick={closePopup}
          className="absolute top-x_icon right-x_icon"
        >
          <img src={xImg} alt="exit" />
        </button>
        {/* Main content */}
        {success ? (
          ""
        ) : (
          <h5 className="text-center text-black_ text-24 font-700 mb-[24px] leading-32">
            შესვლა
          </h5>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col">
          {!success ? (
            <>
              <label
                className="text-normal text-black_ font-500 leading-20 mb-[10px]"
                htmlFor="email"
              >
                ელ-ფოსტა
              </label>
              <input
                className="px-login_inp_x py-login_inp_y rounded-12 border-input border-input_normal focus:outline-none"
                type="email"
                name="email"
                placeholder="Example@redberry.ge"
                required
              />
            </>
          ) : (
            <>
              <div className="flex items-center self-center justify-center rounded-full w-successImg h-successImg bg-successImg mb-[21px]">
                <img src={vectorImg} alt="Success" />
              </div>
              <p className="self-center">
                {!successText ? "წარმატებული ავტორიზაცია" : successText}
              </p>
            </>
          )}
          <button
            onClick={handleBtnClick}
            className="text-white bg-header_login px-header_login_x py-header_login_y rounded-header_login mt-[24px]"
            type="submit"
          >
            {success ? "კარგი" : "შესვლა"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Popup;
