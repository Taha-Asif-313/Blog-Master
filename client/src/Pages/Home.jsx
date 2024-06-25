import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogCard from "../Components/BlogCard";
import BlogNotFound from "../Components/BlogNotFound";
import { BlogContext } from "../Context/blogsContext";
import toast from "react-hot-toast";
import LoadingCircle from "../Components/LoadingCircle";

const Home = () => {
  // States
  const [loading, setloading] = useState(false);
  const { setblogs, blogs } = useContext(BlogContext);

  // UseEffect to fetch all blogs
  useEffect(() => {
    async function getBlogs() {
      try {
        setloading(true);
        await axios
          .get(`http://localhost:5000/api/blog/allblogs`)
          .then((res) => {
            setblogs(res.data.allBlogs);
            setloading(false);
          });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    return () => {
      getBlogs();
    };
  }, []);

  // To show all blogs


  // If loadig is true then show loading component
  const CheckLoading = () => {
    if (loading) {
      return (
        <div className="h-full w-full">
          <LoadingCircle />
        </div>
      );
    }
  };

  return (
    <>
      <div className="main h-auto">
        {/* Main hero section || hero image and welcome test */}
        <div className="main-hero px-10 h-screen w-full flex justify-between items-center flex-col-reverse mt-14 lg:mt-0 lg:flex-row">
          <div className="hero-right h-full w-full lg:w-[50%] flex flex-col justify-center lg:items-start items-center gap-6 ">
            <h1 className="text-4xl lg:text-8xl font-semibold text-center lg:text-left">
              Welcome to <span className="text-primary">Our Site !</span>
            </h1>
            <p className="text-lg text-center lg:text-left">
              Let's create blogs with your own words. Share your words with
              other.
            </p>
            <Link
              to={"/register"}
              className="bg-primary text-stone-50 font-semibold px-5 py-3 rounded-md"
            >
              Get Started
            </Link>
          </div>
          <div className="hero-left h-full w-full lg:w-[50%] flex justify-end items-center pt-10 lg:pt-0">
            <img
              src="https://d1jj76g3lut4fe.cloudfront.net/uploads/images/637266f2edcfd_946538277402aivshumans.gif"
              alt=""
            />
          </div>
        </div>

        {/* hr for divide with bar*/}
        <hr className="bg-white w-full my-5" />

        {/* Blogs that use can read */}
        <div className="blog-section md:px-10 ">
          <h1 className="text-5xl lg:text-7xl text-center my-10 font-bold">
            Explore
          </h1>
          <div className="blogs h-full flex flex-wrap my-5 mx-2">
            {blogs.length !== 0 ? (
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

        {/* information about this website some features and benifits */}
        <div className="information-section h-auto my-10 lg:my-0 px-10 ">
          <h1 className="text-5xl lg:text-7xl text-center my-10 font-bold">
            Benefits
          </h1>
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            <li>
              <div className="timeline-middle text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="timeline-start md:text-end mb-10">
                <div className="text-lg font-black text-primary">
                  Increase creativity!
                </div>
                Blogging fuels creativity through diverse content creation,
                experimentation, reader interaction, and disciplined reflection.
              </div>

           
            </li>

            <li>
            

              <div className="timeline-middle text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="timeline-end mb-10">
                <div className="text-lg font-black text-primary">
                  Gain knowlegde!
                </div>
                Blogging expands knowledge by researching for content,
                organizing thoughts for clarity, and engaging with readers,
                fostering continuous learning.
              </div>

          
            </li>

            <li>
           

              <div className="timeline-middle text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="timeline-start md:text-end mb-10">
                <div className="text-lg font-black text-primary">
                  Amuse with blogs!
                </div>
                Blogs entertain and inform us with diverse content, from
                personal anecdotes to expert insights. They're like windows into
                different worlds, offering humor, knowledge, and connection in
                just a click.
              </div>

           
            </li>

            <li>
            

              <div className="timeline-middle text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="timeline-end mb-10">
                <div className="text-lg font-black text-primary">
                  Intaract with other words!
                </div>
                Blogs foster interaction through comments, likes, and shares,
                creating vibrant communities. They invite dialogue, allowing
                readers to engage with authors and each other, exchanging ideas,
                perspectives, and sometimes even forming lasting connections.
              </div>

              
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
