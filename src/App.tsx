import Blog from "./Pages/Blog/Blog";
import Home from "./Pages/Home/Home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import CreatePost from "./Pages/CreatePost/CreatePost";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/post" element={<CreatePost />} />
          <Route
            path="*"
            element={
              <div>
                <h1>NO</h1>
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
