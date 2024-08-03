import React from "react";
import AllBlogs from "../Components/Home/AllBlogs";

const Blogs = () => {

  return (
    <>
      <div className="main flex-col min-h-screen mt-24 flex">
        <h1 className="mx-auto text-stone-50 text-center text-4xl lg:text-6xl my-10 font-bold">
          Blogs !
        </h1>
       <AllBlogs/>
      </div>
    </>
  );
};

export default Blogs;
