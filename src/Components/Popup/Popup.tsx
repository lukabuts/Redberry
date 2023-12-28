import { useState, useEffect, useContext } from "react";
import axios from "axios";
import x from "../../assets/images/x.svg";
import vector from "../../assets/images/vector.svg";
import error from "../../assets/images/error.svg";
import { Context } from "../../App";
import PopupProps from "../../Types/popupProps";

function Popup({ setActivePopup, mainText, successText }: PopupProps) {
  const [userEmail, setUserEmail] = useState("");
  const [signedIn, setSignedIn] = useContext(Context);
  const [loginError, setLoginError] = useState(false);
  const [longEmail, setLongEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeBtn, setActiveBtn] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (signedIn) return;
    setLoading(true);
    // Login
    axios
      .post("https://api.blog.redberryinternship.ge/api/login", {
        email: userEmail,
      })
      .then(() => {
        setSignedIn(true);
        setLoginError(false);
      })
      .catch((err) => {
        console.log(err);
        setLoginError(true);
      })
      .finally(() => {
        setLoading(false);
      });
    // If user is logged in, Close Popup
    signedIn && closePopup();
  }

  useEffect(() => {
    localStorage.setItem("signedIn", JSON.stringify(signedIn));
  }, [signedIn]);

  function closePopup() {
    if (loading) return;
    setActivePopup(false);
    if (!signedIn) return;
    window.open("/", "_self");
  }

  // Handle input Change
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setUserEmail(value);

    // Check Valid email
    !value.endsWith("@redberry.ge") ? setActiveBtn(false) : setActiveBtn(true);

    // check Email length
    value.trim().split(" ").length !== 1
      ? setLongEmail(true)
      : setLongEmail(false);

    setLoginError(false);
  }

  return (
    <>
      {/* Popup Closer */}
      <div
        onClick={closePopup}
        className="fixed left-0 top-0 w-full h-full cursor-pointer bg-black_ bg-opacity-[0.24] z-popupCloser "
      ></div>
      {/* Popup */}
      <div className="fixed flex items-center justify-center w-full overflow-hidden centeredItem max-w-popup rounded-12 z-popup">
        <div className="relative w-full bg-white px-popup_x py-popup_y">
          {/* X icon */}
          <button
            onClick={closePopup}
            className="absolute p-2 rounded-full top-x_icon right-x_icon hover:bg-x_btn_hoer"
          >
            <img src={x} alt="exit" />
          </button>
          {/* Main content */}
          {!signedIn && (
            <h5 className="text-center text-black_ text-24 font-700 mb-[24px] leading-32">
              {mainText}
            </h5>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col">
            {signedIn ? (
              <>
                <div className="flex items-center self-center justify-center rounded-full w-successImg h-successImg bg-success mb-[21px]">
                  <img src={vector} alt="Success" />
                </div>
                <p className="self-center">{successText}</p>
              </>
            ) : (
              <>
                <label
                  className="text-normal text-black_ font-500 leading-20 mb-[10px]"
                  htmlFor="email"
                >
                  ელ-ფოსტა
                </label>
                <input
                  onChange={handleInputChange}
                  value={userEmail}
                  className={`px-inp_x py-inp_y rounded-12 border-input  focus:outline-none focus:border-active_inp focus:bg-active_inp_bg ${
                    loginError || longEmail
                      ? " border-err bg-err_bg"
                      : "border-input_normal hover:bg-inp_bg_hover"
                  }`}
                  type="email"
                  name="email"
                  placeholder="Example@redberry.ge"
                  id="email"
                  autoComplete="email"
                  required
                />
                {loginError && (
                  <div className="mt-[8px] flex gap-err">
                    <img width={20} src={error} />
                    <span className="text-err text-12 font-400 leading-20">
                      ელ-ფოსტა არ მოიძებნა
                    </span>
                  </div>
                )}
              </>
            )}
            <button
              disabled={loading || !activeBtn || longEmail}
              onClick={() => {
                signedIn && closePopup();
              }}
              className="text-white bg-active_inp px-header_login_x py-header_login_y rounded-header_login mt-[24px] disabled:bg-disabled_btn disabled:text-white  disabled:cursor-not-allowed hover:bg-active_btn_hover"
              type="submit"
            >
              {!signedIn && !loading
                ? "შესვლა"
                : !signedIn && loading
                ? "დაელოდეთ..."
                : "კარგი"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Popup;
