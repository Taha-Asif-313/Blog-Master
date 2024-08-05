import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import LoadingCircle from "../Loading/LoadingCircle";

const BlogCard = ({ title, author, id, image, Delete, ProfilePic }) => {
  // States
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const deleteBlog = async () => {
    setloading(true);
    try {
      await axios
        .delete(`https://blog-master-server.vercel.app/api/blog/delete/${id}`)
        .then((res) => {
          toast.success(res.data.message);
          navigate("/");
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
      <div className="mt-10 h-screen w-full absolute top-0 left-0">
        <LoadingCircle />
      </div>
    );
  }

  return (
    // BlogCard Component
    <div
      className={`w-full mx-2 lg:mx-2 lg:w-[45%] h-[180px] lg:h-[220px] bg-cyan-950 relative rounded-xl overflow-hidden shadow-gray-950 shadow-lg my-2 lg:m-4`}
    >
      {/* Background image for blog */}
      <img
        className="w-full h-full object-cover z-0 absolute opacity-85"
        src={image || "/default-thum.jpg"}
        alt="Blog post"
      />

      {/* Title of blog */}
      <div className="px-6 flex flex-col gap-3 py-4 h-[60%] ">
        <Link
          to={`/read/${id}`}
          className="font-black text-xl lg:text-3xl text-stone-50 mb-2 z-10 mt-2 drop-shadow-[2px_2px_4px_black] shadow-black hover:text-primary"
        >
          {title.length < 60
            ? title[0].toUpperCase() + title.slice(1, 60)
            : title[0].toUpperCase() + title.slice(1, 60) + "..."}
        </Link>
      </div>

      {/* User id and readmore button and edit or delete buttons */}
      <div className="px-6 py-4 h-[40%] flex justify-between items-center">
        <div className="flex items-center z-10">
          {/* User logo */}
          <img
            className="w-10 rounded-full"
            src={ProfilePic || "/default-profile.jpg"}
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
            className="font-bold py-2 px-2 rounded-md text-sm text-zinc-900 bg-gradient-to-tr from-cyan-600 to-primary "
          >
            Read More
          </Link>
          <Link
            onClick={deleteBlog}
            className={`${
              Delete ? "block" : "hidden"
            } font-bold py-2 px-2 rounded-lg text-lg text-black lg:static absolute top-0 right-0 bg-primary`}
          >
            <MdDelete />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
