import React, { useState } from "react";
import BlogCard from "../Blog/BlogCard";
import BlogNotFound from "../Blog/BlogNotFound";
import toast from "react-hot-toast";
import LoadingCircle from "../Loading/LoadingCircle";
import useFetchBlogs from "../../Hooks/useFetchBlogs";

const AllBlogs = () => {
  const { data, loading, error } = useFetchBlogs(
    "https://blog-master-server.vercel.app/api/blog/allblogs"
  );
  if (loading) return <LoadingCircle />;
  if (error) toast.error(error);
  const displayBlogs = data.slice(0, 6);
  const links = [
    "https://avatar.iran.liara.run/public/25",
    "https://avatar.iran.liara.run/public/43",
    "https://avatar.iran.liara.run/public/2",
    "https://avatar.iran.liara.run/public/46",
    "https://avatar.iran.liara.run/public/45",
    "https://avatar.iran.liara.run/public/12",
    "https://avatar.iran.liara.run/public/42",
    "https://avatar.iran.liara.run/public/49",
  ];

  const getRandomLink = (links) => {
    if (links.length === 0) {
      return null; // Return null if the links array is empty
    }
    const randomIndex = Math.floor(Math.random() * links.length);
    return links[randomIndex];
  };
  return (
    <>
      {/* Blogs that use can read */}
      <div className="blog-section min-h-44 px-5 mt-32 lg:px-24">
      <h2 class="text-gray-800 sm:text-4xl text-2xl font-extrabold text-center mb-16">Latest Posts</h2>
        <div className="blogs w-full h-full flex justify-between items-center flex-wrap my-5 ">
          {data.length !== 0 ? (
            displayBlogs.map((blog, index) => {
              return (
                <BlogCard
                  title={blog.title}
                  content={blog.content}
                  author={blog.username}
                  id={blog._id}
                  image={blog.imageUrl}
                  ProfilePic={getRandomLink(links)}
                />
              );
            })
          ) : (
            <BlogNotFound />
          )}
        </div>
      </div>
    </>
  );
};

export default AllBlogs;
