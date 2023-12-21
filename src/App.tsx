import Blog from "./Pages/Blog/Blog";
import Home from "./Pages/Home/Home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import CreatePost from "./Pages/CreatePost/CreatePost";
import NotFound from "./Pages/NotFound/NotFound";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const Context = React.createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => {}]);

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const localValue: any = localStorage.getItem("signedIn");
  const [signedIn, setSignedIn] = useState(JSON.parse(localValue) || false);

  const savedtoken = localStorage.getItem("token") || "";
  const [token, setToken] = useState(savedtoken || "");
  const [postsLoading, setPostsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postsError, setPostsError] = useState(false);

  useEffect(() => {
    // Getting Token
    if (token) return;
    axios
      .get("https://api.blog.redberryinternship.ge/api/token")
      .then((res) => {
        setToken(res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // Getting Posts Data
    if (!token) return;
    setPostsLoading(true);
    axios
      .get("https://api.blog.redberryinternship.ge/api/blogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPosts(res.data.data);
        setPostsError(true);
      })
      .catch((err) => {
        console.log(err);
        setPostsError(true);
      })
      .finally(() => setPostsLoading(false));
  }, [token]);

  // Setting Token To LocalStorage
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  return (
    <>
      <Context.Provider value={[signedIn, setSignedIn]}>
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
            <Route path="/blog" element={<Blog />} />
            <Route path="/post" element={<CreatePost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Context.Provider>
    </>
  );
}

export default App;
