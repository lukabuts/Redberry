import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { useEffect, useState, useContext } from "react";
import Popup from "../Popup/Popup";

import { Context } from "../../App";

interface HeaderProps {
  creatingPost: boolean;
}

function Header({ creatingPost }: HeaderProps) {
  const [signedIn, _] = useContext(Context);
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
      <header
        className={`sticky top-0 flex items-center bg-white h-header px-main z-header ${
          creatingPost && signedIn ? "justify-center" : "justify-between"
        }`}
      >
        <Link to="/">
          <img
            width={150}
            height={24}
            className="cursor-pointer select-none"
            src={logo}
            alt="Logo"
          />
        </Link>
        {creatingPost && signedIn ? (
          ""
        ) : (
          <button onClick={handleClick}>
            <Link
              className="text-white bg-header_login px-header_login_x py-header_login_y rounded-header_login"
              to={signedIn ? "/post" : ""}
            >
              {signedIn ? "დაამატე ბლოგი" : "შესვლა"}
            </Link>
          </button>
        )}
      </header>
    </>
  );
}

export default Header;
