import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blogs from "./pages/Blogs";
import Blogpage from "./pages/Blogpage";
import Create from "./pages/Create";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/get/:id" element={<Blogpage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
