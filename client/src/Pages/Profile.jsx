import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosCreate, IoIosExit } from "react-icons/io";
import { AuthContext } from "../Context/authContext";
import BlogCard from "../Components/BlogCard";
import axios from "axios";
import toast from "react-hot-toast";
import BlogNotFound from "../Components/BlogNotFound";
import LoadingCircle from "../Components/LoadingCircle";
import { BlogContext } from "../Context/blogsContext";

const Profile = () => {

  const [loading, setLoading] = useState(false);
  // User blogs
const { blogs } = useContext(BlogContext)

  // get function form context api
  const { logoutUser, setuserData, userData } = useContext(AuthContext);

  // Use navigate to navigate page
  const navigate = useNavigate();

  // Logout function
  const logOut = async () => {
    setLoading(true)
    // Try to fetch api
    try {
      // make get request using axios
      await axios.get("https://blog-master-server.vercel.app/api/user/logout").then((res) => {
        if (res.data.success) {
          toast.success("Logout successfully!");
          setLoading(false)
        }
        navigate("/");
        setuserData({});
        logoutUser();
      });
    } catch (error) {
      // If there is an error to fetch api
      toast.error(error.message);
    }
  };

  // UseEffect to get all the blogs of user when the component mount
  useEffect(() => {
    // Make a function to fetch all blogs data
    async function getBlogs() {
      // try if api fetch
      try {
        setLoading(true)
        // Make get request to fetch blogs from database
        await axios
          .get(`https://blog-master-server.vercel.app/api/blog/user-blogs/${userData.userId}`)
          .then((res) => {
            if (!res.data.success) {
              toast.error(res.data.message || "server response error!");
              setLoading(false)
            }
            setuserBlogs(res.data.userBlogs);
            setLoading(false)
          });
        // if any error occurs
      } catch (error) {
        toast.error(error.message);
      }
    }
    return () => {
      getBlogs();
    };
  }, []);

  if(loading){
    return  <LoadingCircle />
  }

  return (
    <>
      <div className="main-profile min-h-screen w-full flex flex-col">
        {/* Profile Details  */}
        <div className="top px-10 h-40 w-full flex flex-col md:flex-row items-center md:justify-start justify-center gap-4 mt-32">
          {/* Profile image and username */}
          <div className="right-top w-full md:w-[50%] flex justify-center md:justify-start items-center gap-5">
            {/* User profile pic */}
            <img
              className="w-20 rounded-full border-2 border-primary"
              src={
                `https://ui-avatars.com/api/?name=${userData.fullname}` ||
                "https://avatar.iran.liara.run/public/job/operator/male"
              }
              alt="logo"
            />
            <p className="text-xl font-semibold">{`@${userData.username}`}</p>
          </div>

          {/* Button that can user use */}
          <div className="left-top md:w-[50%] flex justify-end gap-4 items-center text-stone-50">
            {/* write blog button */}
            <Link
              to={"/createblog"}
              className="cursor-pointer flex items-center justify-center gap-2 text-xl py-2 px-4 bg-primary rounded-md "
            >
              <IoIosCreate className="" />
            </Link>

            {/* logout button */}
            <Link
              onClick={() => document.getElementById("my_modal_1").showModal()}
              className="cursor-pointer flex items-center justify-center gap-2 text-xl py-2 px-4 bg-primary rounded-md "
            >
              <IoIosExit className="" />
            </Link>

            {/* Dialog box to ask confirm or not */}
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box bg-black">
                <h3 className="font-bold text-lg text-white">
                  Want to logout?
                </h3>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <Link
                      onClick={logOut}
                      className="btn text-stone-50 bg-primary hover:bg-white hover:text-black mx-2"
                    >
                      Confirm
                    </Link>
                    <button className="btn text-stone-50 bg-primary hover:bg-white hover:text-black">
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>

        {/* Blogs of User */}
        <div className="bottom">
          <div className="blog-section px-5  my-10 ">
            <h1 className="text-4xl lg:text-7xl text-center py-5 font-bold">
              Your Blogs
            </h1>
            <div className="blogs static flex flex-wrap">
              {userBlogs.length !== 0 ? (
                userBlogs.map((blog) => {
                  return (
                    <BlogCard
                      title={blog.title}
                      content={blog.content}
                      author={blog.username}
                      id={blog._id}
                      image={blog.imageUrl}
                      Delete={true}
                    />
                  );
                })
              ) : (
                <BlogNotFound />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
