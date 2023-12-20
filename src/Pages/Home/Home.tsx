/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
// import axios from "axios";
import Categories from "../../Components/Categories/Categories";
import blogbg from "../../assets/images/blogbg.svg";
import Post from "../../Components/Post/Post";
import Header from "../../Components/Header/Header";
import Posts from "../../Types/Posts";

interface HomeProps {
  posts: Posts[];
  postsLoading: boolean;
  postsError: boolean;
}

function Home({ posts, postsLoading, postsError }: HomeProps) {
  const filters: any = localStorage.getItem("filters");
  const [selectedFilters, setSelectedFilters] = useState(
    JSON.parse(filters) || []
  );

  return (
    <>
      <Header creatingPost={false} />
      {/* Content Container */}
      <div className=" px-main mt-home_container_t py-content_y">
        {/* ბლოგი სათაური */}
        <div className="flex items-center justify-between mb-[64px] overflow-hidden">
          <h1 className="text-black_ text-64 font-700 leading-72 ml-[13px]">
            ბლოგი
          </h1>
          <img src={blogbg} alt="" />
        </div>
        {/* Categories */}
        <div className="flex flex-wrap content-center justify-center gap-components mb-home_container_t">
          <Categories
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>

        {/* Posts */}
        {!postsLoading ? (
          <div className="flex flex-wrap items-center justify-center gap-x-post_container_x gap-y-post_container_y">
            {posts
              .filter((post) => selectedFilters.includes(post.categories.id))
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
          <h1 className="text-center text-24">იტვირთება პოსტები...</h1>
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
