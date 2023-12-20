import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { useEffect, useState, useContext } from "react";
import Popup from "../Popup/Popup";

import { Context } from "../../App";

function Header() {
  const [signedIn, setSignedIn] = useContext(Context);
  const [activePopup, setActivePopup] = useState(false);

  useEffect(() => {
    const body = document.getElementById("body");
    if (!body) return;
    else if (!activePopup) {
      body.classList.contains("overflow-hidden") &&
        body.classList.remove("overflow-hidden");
    } else if (activePopup) {
      !body.classList.contains("overflow-hidden") &&
        body.classList.add("overflow-hidden");
    }
  }, [activePopup]);

  function handleClick() {
    !signedIn && setActivePopup(true);
  }
  return (
    <>
      {activePopup ? (
        <Popup
          setActivePopup={setActivePopup}
          successText="წარმატებული ავტორიზაცია"
          mainText="შესვლა"
        />
      ) : null}
      <header className="sticky top-0 flex items-center justify-between bg-white h-header px-main z-header">
        <Link to="/">
          <img className="cursor-pointer select-none" src={logo} alt="Logo" />
        </Link>
        <button onClick={handleClick}>
          <Link
            className="text-white bg-header_login px-header_login_x py-header_login_y rounded-header_login"
            to={signedIn && "/post"}
          >
            {signedIn ? "დაამატე ბლოგი" : "შესვლა"}
          </Link>
        </button>
      </header>
    </>
  );
}

export default Header;
