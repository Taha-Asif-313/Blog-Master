import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import LoadingCircle from "../Loading/LoadingCircle";

const BlogCard = ({ title, content, author, id, image, Delete, ProfilePic }) => {
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
      <div className="mt-10 bg-black h-screen w-full absolute top-0 left-0">
        <LoadingCircle />
      </div>
    );
  }

  return (
    // BlogCard Component
    <>
   <div class="bg-white mb-2 w-full lg:w-[45%] h-[250px] cursor-pointer rounded-lg overflow-hidden group relative before:absolute before:inset-0 before:z-10 before:bg-black before:opacity-80">
            <img src={image || "/default-thum.jpg"} alt="Blog Post 1" class="w-full h-full object-fill object-center group-hover:scale-110 transition-all duration-300" />
            <div class="p-6 absolute bottom-0 left-0 right-0 z-20">
       
              <h3 class="text-xl font-bold text-primary">  {title.length < 60
            ? title[0].toUpperCase() + title.slice(1, 60)
            : title[0].toUpperCase() + title.slice(1, 60) + "..."}</h3>
              <div class="mt-2">
                <p class="text-gray-200 lg:text-sm text-[13px] ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.</p>
              </div>
              <div className="flex items-center mt-2 z-10">
          {/* User logo */}
          <img
            className="w-6 rounded-full"
            src={ProfilePic || "/default-profile.jpg"}
          />

          {/* User id or Username */}
          <span className="inline-block rounded-full px-3 py-1 text-[12px] text-stone-50 mr-2 ">
            {author}
          </span>
          {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{date}</span> */}
        </div>
            </div>
          </div>

    </>
  );
};

export default BlogCard;

