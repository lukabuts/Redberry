import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
const Blog = React.lazy(() => import("./Pages/Blog/Blog"));
const Home = React.lazy(() => import("./Pages/Home/Home"));
const NotFound = React.lazy(() => import("./Pages/NotFound/NotFound"));
const CreatePost = React.lazy(() => import("./Pages/CreatePost/CreatePost"));
import Header from "./Components/Header/Header";
import Loading from "./Components/Loading/Loading";
import Posts from "./Types/posts";

export const Context = React.createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => {}]);

export const PostPageContext = React.createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => false);

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
  const [postPage, setPostPage] = useState(false);
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
          <PostPageContext.Provider value={setPostPage}>
            <Router>
              <Header creatingPost={postPage} />
              <Routes>
                <Route
                  path="/"
                  element={
                    <React.Suspense fallback={<Loading fixed={true} />}>
                      <Home
                        posts={posts}
                        postsLoading={postsLoading}
                        postsError={postsError}
                      />
                    </React.Suspense>
                  }
                />
                {posts.map((post: Posts) => {
                  return (
                    <Route
                      key={post.id}
                      path={`/blog-${post.id}`}
                      element={
                        <React.Suspense fallback={<Loading fixed={true} />}>
                          <Blog id={post.id} posts={posts} />
                        </React.Suspense>
                      }
                    />
                  );
                })}
                <Route
                  path="/post"
                  element={
                    <React.Suspense fallback={<Loading fixed={true} />}>
                      <CreatePost />
                    </React.Suspense>
                  }
                />
                <Route
                  path="*"
                  element={
                    !postsLoading && (
                      <React.Suspense fallback={<Loading fixed={true} />}>
                        <NotFound />
                      </React.Suspense>
                    )
                  }
                />
              </Routes>
            </Router>
          </PostPageContext.Provider>
        </TokenContext.Provider>
      </Context.Provider>
    </>
  );
}

export default App;
