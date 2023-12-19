import { Link } from "react-router-dom";
import redberryLogo from "../../assets/images/logo.svg";
import { useEffect, useState } from "react";
import Popup from "../Popup/Popup";

function Header() {
  const [activePopup, setActivePopup] = useState<boolean>(false);

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
    setActivePopup(true);
  }
  return (
    <>
      {activePopup ? <Popup setActivePopup={setActivePopup} /> : null}
      <header className="sticky top-0 flex items-center justify-between bg-white h-header px-main z-header">
        <Link to="/">
          <img
            className="cursor-pointer select-none"
            src={redberryLogo}
            alt="Logo"
          />
        </Link>
        <button
          onClick={handleClick}
          className="text-white bg-header_login px-header_login_x py-header_login_y rounded-header_login"
        >
          შესვლა
        </button>
      </header>
    </>
  );
}

export default Header;
