import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import Blogs from "./Pages/Blogs";
import About from "./Pages/About";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import CreateBlog from "./Pages/CreateBlog";
import Protected from "./Components/Protected";
import ReadBlogPage from "./Pages/ReadBlogPage";
import Nav from "./Components/Header_Footer/Header";

const App = () => {
  return (
    <>
      <div className="">
        <Nav/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/read/:id" element={<ReadBlogPage />} />
          <Route path="/profile" element={<Protected Component={Profile} />} />
          <Route
            path="/createblog"
            element={<Protected Component={CreateBlog} />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
};

export default App;
