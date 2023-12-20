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
  const localValue: any = localStorage.getItem("signedIn");
  const [signedIn, setSignedIn] = useState(JSON.parse(localValue) || false);

  const savedtoken = localStorage.getItem("token") || "";
  const [token, setToken] = useState(savedtoken || "");
  // Getting Token
  useEffect(() => {
    // Getting Token
    if (token) return;
    axios
      .get("https://api.blog.redberryinternship.ge/api/token")
      .then((res) => {
        console.log(res);
        setToken(res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Setting Token To LocalStorage
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  return (
    <>
      <Context.Provider value={[signedIn, setSignedIn]}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
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
