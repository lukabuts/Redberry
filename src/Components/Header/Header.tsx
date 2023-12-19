import { Link } from "react-router-dom";
import redberryLogo from "../../assets/LOGO-02 3.svg";
function Header() {
  return (
    <header className="sticky top-0 flex items-center justify-between bg-white h-header px-main z-header">
      <Link to="/">
        <img
          className="cursor-pointer select-none"
          src={redberryLogo}
          alt="Logo"
        />
      </Link>
      <button className="text-white bg-header_login px-header_login_x py-header_login_y rounded-header_login">
        შესვლა
      </button>
    </header>
  );
}

export default Header;
