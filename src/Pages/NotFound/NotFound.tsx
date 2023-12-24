import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { Helmet } from "react-helmet";
import logo from "../../assets/images/logo.svg";

function NotFound() {
  return (
    <>
      <Header creatingPost={false} />
      <Helmet>
        {/* General */}
        <meta
          name="description"
          content="შექმენი და გაუზიარე საინტერესო ამბები ფართო საზოგაადოებას"
        />
        <meta
          name="keywords"
          content="პოსტი, ბლოგი, გაზიარება, ახალი ამბები, საინტერესო, სიახლეები"
        />
        <meta name="author" content="ლუკა ბუცხრიკიძე" />
        <meta name="application-name" content="Redberry" />

        {/* Facebook */}
        <meta property="og:title" content="Redberry" />
        <meta property="og:type" content="Social Media" />
        <meta property="og:image" content={logo} />
        <meta property="og:url" content="https://redberry-kgnw.vercel.app/" />
        <meta
          property="og:description"
          content="შექმენი და გაუზიარე საინტერესო ამბები ფართო საზოგაადოებას"
        />

        {/* Twitter */}
        <meta
          name="twitter:card"
          content="შექმენი და გაუზიარე საინტერესო ამბები ფართო საზოგაადოებას"
        />
        <meta name="twitter:title" content="Redberry" />
        <meta
          name="twitter:description"
          content="აღმოაჩინე და გაუზიარე სიახლეები ფართო საზოგადოებას. შემოგვიერთდი და აღმოაჩინე აქამდე უცნობი"
        />
        <meta name="twitter:image" content={logo} />
        <title>Redberry</title>
      </Helmet>
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
