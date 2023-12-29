import React, { useContext, useEffect, useState } from "react";
import BackBtn from "../../Components/BackBtn/BackBtn";
import Header from "../../Components/Header/Header";
const Post = React.lazy(() => import("../../Components/Post/Post"));
import blogProps from "../../Types/blogProps";
import axios from "axios";
import Posts from "../../Types/posts";
import SwiperBtns from "../../Components/SwiperBtns/SwiperBtns";
import { TokenContext } from "../../App";
import { Helmet } from "react-helmet";
import Loading from "../../Components/Loading/Loading";

function Blog({ id, posts }: blogProps) {
  const [noSimilarCategories, setNoSimilarCategories] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState(false);
  const [post, setPost] = useState<Posts>();
  const [similarPosts, setSimilarPosts] = useState<Posts[]>([]);
  const token = useContext(TokenContext);

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
          <Loading fixed={true} />
        ) : (
          // Show Content
          <>
            <div className="flex flex-col w-full gap-blog max-w-whole_post mb-whole_post_b mt-whole_post_t">
              {/* Img */}
              <div className="flex justify-center overflow-hidden bg-imgUpload h-post_img rounded-12">
                <img
                  src={post?.image}
                  loading="lazy"
                  alt={post?.title}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Info */}
              <div className="flex flex-col gap-whole_post_info">
                {/* Author data */}
                <div className="flex flex-col gap-[8px]">
                  <h2 className="text-black_ text-16 font-500">
                    {post?.author}
                  </h2>
                  <p className="text-gray_ text-12 font-400">
                    {post?.publish_date.split("-").reverse().join(".")}
                    {post?.email && <span> • {post?.email}</span>}
                  </p>
                </div>
                <div>
                  <h1 className="text-black_ text-32 font-700">
                    {post?.title}
                  </h1>
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
              <div className="flex flex-col w-full gap-blog">
                <div className="flex items-center justify-between">
                  <h3 className=" text-black_ text-32 font-700">
                    მსგავსი სტატიები
                  </h3>
                  <SwiperBtns />
                </div>
                <div
                  className="flex overflow-hidden gap-post_container_x"
                  id="swiperDiv"
                >
                  {similarPosts.map((post) => {
                    return (
                      <div key={post.id} className="w-full">
                        <Post
                          img={post.image}
                          author={post.author}
                          date={post.publish_date}
                          id={post.id}
                          title={post.title}
                          desc={post.description}
                          postCategories={post.categories}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Blog;
