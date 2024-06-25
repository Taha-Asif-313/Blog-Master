import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import LoadingCircle from "./LoadingCircle";

const BlogCard = ({ title, author, id, image, Delete }) => {
  // States
  const [loading, setloading] = useState(false);

  // Preview blog content
  const Title = title[0].toUpperCase() + title.slice(1);

  const deleteBlog = async () => {
    setloading(true);
    try {
      await axios
        .delete(`http://localhost:5000/api/blog/delete/${id}`)
        .then((res) => {
          toast.success(res.data.message);
          setloading(false);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="mt-10">
        <LoadingCircle />
      </div>
    );
  }

  return (
    // BlogCard Component
    <div
      className={`w-full lg:w-[30%] h-[200px] relative rounded overflow-hidden shadow-gray-950 shadow-lg my-2 lg:m-4 bg-black`}
    >
      {/* Background image for blog */}
      <img
        className="w-full z-0 absolute opacity-15"
        src={image}
        alt="Blog post"
      />

      {/* Title of blog */}
      <div className="px-6 flex flex-col gap-3 py-4 h-[60%] ">
        <Link
          to={`/read/${id}`}
          className="font-black text-2xl text-stone-50 mb-2 z-10 mt-4"
        >
          {Title}
        </Link>
      </div>

      {/* User id and readmore button and edit or delete buttons */}
      <div className="px-6 py-4 h-[40%] flex justify-between items-center">
        <div className="flex items-center z-10">
          {/* User logo */}
          <img
            className="w-10 rounded-full"
            src={"https://avatar.iran.liara.run/public" || ""}
            alt=""
          />

          {/* User id or Username */}
          <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-stone-50 mr-2 ">
            {author}
          </span>
          {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{date}</span> */}
        </div>

        {/* ReadMore buttons and edit and delete button  */}
        <div className="flex justify-center items-center gap-2 z-10">
          <Link
            to={`/read/${id}`}
            className="font-bold py-2 px-2 rounded-lg text-sm text-stone-50 bg-primary"
          >
            Read More
          </Link>
          <Link
            onClick={deleteBlog}
            className={`${
              Delete ? "block" : "hidden"
            } font-bold py-2 px-2 rounded-lg text-sm text-stone-50 bg-primary`}
          >
            <MdDelete />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
