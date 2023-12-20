import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div className="absolute top-0 flex flex-col items-center justify-center w-full h-full gap-post">
        <h1 className="text-4xl">გვერდი ვერ მოიძებნა</h1>
        <Link to="/">
          <button className="text-white bg-header_login px-header_login_x py-header_login_y rounded-header_login">
            დამაბრუნე მთავარ გვერდზე
          </button>
        </Link>
      </div>
    </>
  );
}

export default NotFound;
