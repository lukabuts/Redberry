import { useState, useEffect, useContext } from "react";
import axios from "axios";
import x from "../../assets/images/x.svg";
import vector from "../../assets/images/vector.svg";
import error from "../../assets/images/error.svg";
import { Context } from "../../App";

interface PopupProps {
  successText: string;
  mainText: string;
  setActivePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

function Popup({ setActivePopup, mainText, successText }: PopupProps) {
  const [userEmail, setUserEmail] = useState("");
  const savedtoken = localStorage.getItem("token") || "";

  const [token, setToken] = useState(savedtoken || "");
  const [signedIn, setSignedIn] = useContext(Context);
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Logging in
    if (token && signedIn) return;
    setLoading(true);
    axios
      .get("https://api.blog.redberryinternship.ge/api/token")
      .then((res) => {
        console.log(res);
        setToken(res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
    // Login
    axios
      .post("https://api.blog.redberryinternship.ge/api/login", {
        email: userEmail,
      })
      .then((res) => {
        console.log(res);
        setSignedIn(true);
        setLoginError(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoginError(true);
        setLoading(false);
      });
    // If user is logged in, Close Popup
    signedIn && closePopup();
  }

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("signedIn", JSON.stringify(signedIn));
  }, [token, signedIn]);

  function closePopup() {
    setActivePopup(false);
  }

  // Handle input Change
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserEmail(e.target.value);
    setLoginError(false);
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
              <div className="flex items-center self-center justify-center rounded-full w-successImg h-successImg bg-successImg mb-[21px]">
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
                className={`px-login_inp_x py-login_inp_y rounded-12 border-input  focus:outline-none ${
                  loginError ? " border-err bg-err_bg" : "border-input_normal"
                }`}
                type="email"
                name="email"
                placeholder="Example@redberry.ge"
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
            disabled={loading}
            onClick={() => {
              signedIn && closePopup();
            }}
            className={`text-white bg-header_login px-header_login_x py-header_login_y rounded-header_login mt-[24px] ${
              loading && "bg-opacity-[0.8] cursor-not-allowed"
            }`}
            type="submit"
          >
            {signedIn ? "კარგი" : "შესვლა"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Popup;
