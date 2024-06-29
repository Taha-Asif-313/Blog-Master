import React, { useEffect, useState } from "react";
import BlogCard from "../Components/BlogCard";
import axios from "axios";
import BlogNotFound from "../Components/BlogNotFound";
import toast from "react-hot-toast";
import { useContext } from "react";
import { BlogContext } from "../Context/blogsContext";
import LoadingCircle from "../Components/LoadingCircle";

const Blogs = () => {
  const [loading, setloading] = useState(false);

  const { setblogs, blogs } = useContext(BlogContext);

  useEffect(() => {
    async function getBlogs() {
      setloading(true);
      try {
        await axios
          .get(`https://blog-master-backend.vercel.app/api/blog/allblogs`)
          .then((res) => {
            if(res.success){
            setblogs(res.data.allBlogs);
            setloading(false);
            }
          });
      } catch (error) {
        toast.error(error.message);
        setblogs([]);
      }
    }

    return async () => {
      await getBlogs();
    };
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <>
      <div className="main flex-col min-h-screen mt-14 flex">
        <h1 className="mx-auto text-primary text-center text-5xl my-10 font-bold">
          Blogs !
        </h1>
        <div className="blogs h-full w-[90%] mx-auto flex lg:flex-row flex-col flex-wrap">
          {blogs.length !== 0 ? (
            Array.isArray(blogs) &&
            blogs.map((blog) => {
              return (
                <BlogCard
                  title={blog.title}
                  content={blog.content}
                  author={blog.username}
                  id={blog._id}
                  image={blog.imageUrl}
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

export default Blogs;
