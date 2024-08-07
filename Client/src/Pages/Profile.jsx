import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoIosExit } from "react-icons/io";
import { AuthContext } from "../Context/authContext";
import { MdDeleteOutline, MdOutlinePostAdd } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import BlogCard from "../Components/Blog/BlogCard";
import toast from "react-hot-toast";
import BlogNotFound from "../Components/Blog/BlogNotFound";
import LoadingCircle from "../Components/Loading/LoadingCircle";
import useFetchUserBlogs from "../Hooks/useFetchUserBlogs";

const Profile = () => {
  // get function form context api
  const { userData } = useContext(AuthContext);

  const { data, error, loading } = useFetchUserBlogs(
    `https://blog-master-server.vercel.app/api/blog/user-blogs/${userData.userId}`
  );
  if (loading) {
    return(  
    <div className="h-screen absolute top-0 right-0 w-full">
      <LoadingCircle />;
    </div>)
  }
  if (error) {
    toast.error(error);
  }

  return (
    <>
      <div className="main-profile min-h-screen w-full flex flex-col">
        {/* Profile Details  */}
        <div className="top mb-20 px-10  w-full flex flex-col items-center justify-center gap-4 mt-36">
          {/* Profile image and username */}
          <div className="right-top w-full md:w-[50%] flex-col flex justify-center items-center gap-5">
            {/* User profile pic */}
            <img
              className="w-40 rounded-full border-2 border-primary"
              src={userData.profilePic || "/default-profile.jpg"}
              alt="logo"
            />
            <p className="text-2xl font-semibold">{`@${userData.username}`}</p>
            <p className="text-2xl text-primary gap-2 font-semibold flex items-center">
              <CiMail />{" "}
              <span className="font-normal text-lg text-white">
                {userData.email}
              </span>
            </p>
          </div>

          {/* Button that can user use */}
          <div className="left-top md:w-[50%] flex justify-center gap-4 items-center text-black">
            {/* write blog button */}
            <Link
              to={"/createblog"}
              className="cursor-pointer flex items-center justify-center gap-2 text-xl py-2 px-4 bg-primary rounded-md "
            >
              <MdOutlinePostAdd />
            </Link>

            {/* Delete Btn */}
         

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
                    <Link className="btn text-stone-50 bg-primary hover:bg-white hover:text-black mx-2">
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
        <div className="bottom lg:px-24">
          <div className="blog-section px-5  my-10 ">
            <h1 className="text-4xl lg:text-5xl text-center  font-bold mb-20">
              Your Blogs
            </h1>
            <div className="blogs static flex justify-between items-center flex-wrap mb-20">
              {data.length !== 0 ? (
                data.map((blog) => {
                  return (
                    <BlogCard
                      title={blog.title}
                      content={blog.content}
                      author={blog.username}
                      id={blog._id}
                      image={blog.imageUrl}
                      Delete={true}
                      ProfilePic={userData.profilePic}
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
