import { useEffect, useState } from "react";
import BackBtn from "../../Components/BackBtn/BackBtn";
import Header from "../../Components/Header/Header";
import Post from "../../Components/Post/Post";
import blogProps from "../../Types/blogProps";
import axios from "axios";
import Posts from "../../Types/posts";
import SwiperBtns from "../../Components/SwiperBtns/SwiperBtns";
import { Helmet } from "react-helmet";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function Blog({ id, posts }: blogProps) {
  const [noSimilarCategories, setNoSimilarCategories] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState(false);
  const [post, setPost] = useState<Posts>();
  const [similarPosts, setSimilarPosts] = useState<Posts[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Getting Post Data
    if (!token) return;
    setPostLoading(true);
    axios
      .get(`https://api.blog.redberryinternship.ge/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPost(res.data);
        setPostError(false);
      })
      .catch((err) => {
        console.log(err);
        setPostError(true);
      })
      .finally(() => setPostLoading(false));
  }, [token, id]);

  // Getting similar categries
  useEffect(() => {
    const x = posts
      .filter((item) => {
        return item.categories?.some((x) => {
          return post?.categories?.some((y) => {
            return x.id === y.id;
          });
        });
      })
      .filter((blog) => {
        return blog.id !== post?.id;
      });

    if (x.length === 0) {
      setNoSimilarCategories(true);
      return;
    } else {
      setNoSimilarCategories(false);
    }
    setSimilarPosts(x);
  }, [posts, post?.id, post?.categories]);

  return (
    <>
      <Header creatingPost={false} />
      <Helmet>
        <title>{post?.title}</title>
        <meta property="og:title" content={post?.title} />
        <meta property="og:image" content={post?.image} />
        <meta
          property="og:url"
          content={`https://redberry-kgnw.vercel.app/blog-${post?.id}`}
        />
        <meta property="og:description" content={post?.description} />
        {/* Twitter */}
        <meta name="twitter:title" content={post?.title} />
        <meta name="twitter:description" content={post?.description} />
        <meta name="twitter:image" content={post?.image} />
      </Helmet>
      <BackBtn />
      <div className="flex flex-col items-center justify-center w-full pt-0 p-main">
        {/* Error */}
        {postError ? (
          <h1 className="text-4xl">
            შეიქმნა რაღაც პრობლემა. ბოდიშს გიხდით შეფერხებისთვის
          </h1>
        ) : // Loading
        postLoading ? (
          <h1 className="text-4xl">იტვირთება პოსტი...</h1>
        ) : (
          // Show Content
          <>
            <div className="flex flex-col w-full gap-blog max-w-whole_post mb-whole_post_b mt-whole_post_t">
              {/* Img */}
              <div className="flex justify-center overflow-hidden bg-imgUpload h-post_img rounded-12">
                <img
                  src={post?.image}
                  alt={post?.title}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Info */}
              <div className="flex flex-col gap-whole_post_info">
                {/* Author data */}
                <div className="flex flex-col gap-[8px]">
                  <h4 className="text-black_ text-16 font-500">
                    {post?.author}
                  </h4>
                  <p className="text-gray_ text-12 font-400">
                    {post?.publish_date.split("-").reverse().join(".")}
                    {post?.email && <span> • {post?.email}</span>}
                  </p>
                </div>
                <div>
                  <h2 className="text-black_ text-32 font-700">
                    {post?.title}
                  </h2>
                </div>
                {/* Categoories */}
                <div className="flex flex-wrap gap-post_info">
                  {post?.categories?.map((category) => {
                    return (
                      <div
                        className="cursor-pointer rounded-component_item px-small_component_x py-small_component_y -500"
                        key={category.id}
                        style={{ background: category.background_color }}
                      >
                        <p
                          className="text-12 "
                          style={{ color: category.text_color }}
                        >
                          {category.title}
                        </p>
                      </div>
                    );
                  })}
                </div>
                {/* Description */}
                <div className="mt-[16px]">
                  <p className=" text-dark_gray text-16 font-400 leading-post_desc">
                    {post?.description}
                  </p>
                </div>
              </div>
            </div>
            {/* Similar Blogs */}
            {noSimilarCategories ? (
              <h1 className="text-2xl italic text-gray_">
                მსგავსი სტატიები არ მოიძებნა
              </h1>
            ) : (
              // Swiper
              <div className="w-full">
                <Swiper
                  modules={[Navigation, Pagination, A11y]}
                  spaceBetween={32}
                  slidesPerView={"auto"}
                  className="flex flex-col-reverse gap-blog"
                >
                  <div className="flex items-center justify-between">
                    <h3 className=" text-black_ text-32 font-700">
                      მსგავსი სტატიები
                    </h3>
                    <SwiperBtns />
                  </div>
                  {similarPosts.map((z) => {
                    return (
                      <SwiperSlide className="max-w-post" key={z.id}>
                        <Post
                          img={z.image}
                          author={z.author}
                          date={z.publish_date}
                          id={z.id}
                          title={z.title}
                          desc={z.description}
                          postCategories={z.categories}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Blog;
