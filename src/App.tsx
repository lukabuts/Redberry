import Blog from "./Pages/Blog/Blog";
import Home from "./Pages/Home/Home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./Pages/NotFound/NotFound";
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import CreatePost from "./Pages/CreatePost/CreatePost";
import Posts from "./Types/posts";

export const Context = React.createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => {}]);

export const TokenContext = createContext("");

function App() {
  const localValue = localStorage.getItem("signedIn");
  const parsedLocalValue = localValue ? JSON.parse(localValue) : null;
  const [signedIn, setSignedIn] = useState(
    JSON.parse(parsedLocalValue) || false
  );
  const [postsLoading, setPostsLoading] = useState(false);
  const [posts, setPosts] = useState<Posts[]>([]);
  const [postsError, setPostsError] = useState(false);
  const token =
    "2eba6d6b9a9e6ae0b64af1797627303c2ee3c53644525c3f96b6e53b713f9a19";

  // Getting Blogs
  useEffect(() => {
    setPostsLoading(true);
    axios
      .get("https://api.blog.redberryinternship.ge/api/blogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data.data;

        // Filtering Posts by their publish date
        const filteredData = data.filter((post: Posts) => {
          const now = new Date().toISOString().split("T")[0];
          return now >= post.publish_date;
        });

        setPosts(filteredData);
        setPostsError(false);
      })
      .catch((err) => {
        console.log(err);
        setPostsError(true);
      })
      .finally(() => setPostsLoading(false));
  }, [token]);

  return (
    <>
      <Context.Provider value={[signedIn, setSignedIn]}>
        <TokenContext.Provider value={token}>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    posts={posts}
                    postsLoading={postsLoading}
                    postsError={postsError}
                  />
                }
              />
              {posts.map((post: Posts) => {
                return (
                  <Route
                    key={post.id}
                    path={`/blog-${post.id}`}
                    element={<Blog id={post.id} posts={posts} />}
                  />
                );
              })}
              <Route path="/post" element={<CreatePost />} />
              <Route path="*" element={!postsLoading && <NotFound />} />
            </Routes>
          </Router>
        </TokenContext.Provider>
      </Context.Provider>
    </>
  );
}

export default App;
