import { useEffect, useState } from "react";
import BackBtn from "../../Components/BackBtn/BackBtn";
import Header from "../../Components/Header/Header";
import Post from "../../Components/Post/Post";
import blogProps from "../../Types/blogProps";

function Blog({ posts, postsLoading, postsError, post }: blogProps) {
  const [noSimilarCategories, setNoSimilarCategories] = useState(false);
  useEffect(() => {
    const filteresPosts = posts
      .filter((item) => {
        return item.categories.some((x) => {
          return post.categories.some((y) => {
            return x.id === y.id;
          });
        });
      })
      .filter((blog) => blog.id !== post.id);
    filteresPosts.length === 0
      ? setNoSimilarCategories(true)
      : setNoSimilarCategories(false);
  }, [posts, post]);
  return (
    <>
      <Header creatingPost={false} />
      <BackBtn />
      <div className="flex flex-col items-center justify-center w-full p-main">
        {/* Error */}
        {postsError ? (
          <h1 className="text-4xl">
            შეიქმნა რაღაც პრობლემა. ბოდიშს გიხდით შეფერხებისთვის
          </h1>
        ) : // Loading
        postsLoading ? (
          <h1 className="text-4xl">იტვირთება პოსტები...</h1>
        ) : (
          // Show Content
          <>
            <div className="flex flex-col gap-blog max-w-whole_post mb-whole_post_b mt-whole_post_t">
              {/* Img */}
              <div className="flex justify-center overflow-hidden bg-gray-500 h-post_img rounded-12">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-contain"
                />
              </div>
              {/* Info */}
              <div className="flex flex-col gap-whole_post_info">
                {/* Author data */}
                <div className="flex flex-col gap-[8px]">
                  <h4 className="text-black_ text-16 font-500">
                    {post.author}
                  </h4>
                  <p className="text-gray_ text-12 font-400">
                    {post.publish_date}
                    {post.email && <span> • {post.email}</span>}
                  </p>
                </div>
                <div>
                  <h2 className="text-black_ text-32 font-700">{post.title}</h2>
                </div>
                {/* Categoories */}
                <div className="flex flex-wrap gap-post_info">
                  {post.categories.map((category) => {
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
                <div>
                  <p className=" text-dark_gray text-16 font-400 leading-post_desc">
                    {post.description}
                  </p>
                </div>
              </div>
            </div>
            {/* Similar Blogs */}
            <div className="flex flex-col w-full max-w gap-blog">
              <h3 className=" text-black_ text-32 font-700">
                მსგავსი სტატიები
              </h3>
              <div className="flex specialScrollbar gap-post_container_x">
                {noSimilarCategories ? (
                  <h1 className="text-2xl italic text-gray_">
                    მსგავსი სტატიები არ მოიძებნა
                  </h1>
                ) : (
                  posts
                    .filter((item) => {
                      return item.categories.some((x) => {
                        return post.categories.some((y) => {
                          return x.id === y.id;
                        });
                      });
                    })
                    .filter((blog) => blog.id !== post.id)
                    .map((z) => {
                      return (
                        <div key={z.id}>
                          <Post
                            img={z.image}
                            author={z.author}
                            date={z.publish_date}
                            id={z.id}
                            title={z.title}
                            desc={z.description}
                            postCategories={z.categories}
                          />
                        </div>
                      );
                    })
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Blog;
