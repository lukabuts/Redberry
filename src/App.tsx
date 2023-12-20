import Blog from "./Pages/Blog/Blog";
import Home from "./Pages/Home/Home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import CreatePost from "./Pages/CreatePost/CreatePost";
import NotFound from "./Pages/NotFound/NotFound";
import Header from "./Components/Header/Header";
import React, { useState } from "react";

export const Context = React.createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => {}]);

function App() {
  const localValue: any = localStorage.getItem("signedIn");
  const [signedIn, setSignedIn] = useState(JSON.parse(localValue) || false);
  return (
    <>
      <Context.Provider value={[signedIn, setSignedIn]}>
        <Router>
          <Header />
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
