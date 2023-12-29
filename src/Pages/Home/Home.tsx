import { useState, useContext, useEffect } from "react";
import Categories from "../../Components/Categories/Categories";
import blogbg from "../../assets/images/blogbg.svg";
import Post from "../../Components/Post/Post";
import HomeProps from "../../Types/homeProps";
import { Helmet } from "react-helmet";
import logo from "../../assets/images/logo.svg";
import Loading from "../../Components/Loading/Loading";
import { PostPageContext } from "../../App";

function Home({ posts, postsLoading, postsError }: HomeProps) {
  const filters = localStorage.getItem("filters");
  const parsedFilters = filters ? JSON.parse(filters) : null;
  const [selectedFilters, setSelectedFilters] = useState(parsedFilters || []);

  const setPostPage = useContext(PostPageContext);
  // Setting Postpage false

  useEffect(() => {
    setPostPage(false);
  }, [setPostPage]);

  return (
    <>
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
      {/* Content Container */}
      <div className=" px-main mt-home_container_t py-content_y">
        {/* ბლოგი სათაური */}
        <div className="flex items-center justify-between mb-[64px] overflow-hidden">
          <h1 className="text-black_ text-64 font-700 leading-72 ml-[13px]">
            ბლოგი
          </h1>
          <img src={blogbg} width={624} height={200} alt="Blog Background" />
        </div>
        {/* Categories */}
        <div className="specialScroll mb-home_container_t ">
          <div className="flex items-center py-1 mx-auto w-fit gap-components">
            <Categories
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
          </div>
        </div>

        {/* Posts */}
        {!postsLoading && !postsError ? (
          <div className="special-grid">
            {posts
              .filter((post) => {
                if (selectedFilters.length === 0) {
                  return post;
                }
                return post.categories.some((x) => {
                  return selectedFilters.includes(x.id);
                });
              })
              .map((post) => (
                <Post
                  key={post.id}
                  img={post.image}
                  author={post.author}
                  date={post.publish_date}
                  id={post.id}
                  title={post.title}
                  desc={post.description}
                  postCategories={post.categories}
                />
              ))}
          </div>
        ) : postsLoading ? (
          <Loading fixed={false} />
        ) : (
          postsError && (
            <h1 className="text-center text-err text-24">
              რაღაც პრობლემა შეიქმნა, ბოდიშს გიხდით
            </h1>
          )
        )}
      </div>
    </>
  );
}

export default Home;
