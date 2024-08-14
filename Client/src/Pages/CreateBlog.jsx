import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../Context/authContext";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/lara-light-cyan/theme.css";

const CreateBlog = () => {
  // UseNavigate
  const navigate = useNavigate();

  // states
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [imageUrl, setimageUrl] = useState("");

  // User data
  const { userData } = useContext(AuthContext);

  // publish blog
  const publishBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://blog-master-server.vercel.app/api/blog/create/${userData.userId}`,
        { title, content, imageUrl },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/profile");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="main min-h-screen my-[100px] w-full flex items-center justify-between lg:px-10">
        <div className="left h-full w-full md:w-[100%] flex justify-center items-center">
          <form
            onSubmit={publishBlog}
            className="w-full md:w-[70%] py-2 px-4 lg:border border-primary rounded-sm flex flex-col justify-between items-center gap-2"
          >
            <h1 className="text-center text-4xl text-primary font-bold py-3 ">
              Create Blog!
            </h1>
            <input
              className="px-2 py-2  bg-transparent outline-none border-b border-primary w-full"
              type="text"
              placeholder="Title"
              name="title"
              onChange={(e) => {
                settitle(e.target.value);
              }}
              value={title}
            />

            <Editor
              className="w-full bg-white"
              value={content}
              onTextChange={(e) => {
                setcontent(e.htmlValue);
              }}
              style={{ height: "320px", background: "#fff", color: "#000" }}
            />
            <input
              className="px-2 py-2  bg-transparent outline-none border border-primary rounded-sm w-full"
              placeholder="Enter bg url"
              type="text"
              value={imageUrl}
              onChange={(e) => {
                setimageUrl(e.target.value);
              }}
            />

            <p className="w-full">
              Go to profile{" "}
              <Link to={"/profile"} className="text-primary">
                Profile
              </Link>
            </p>
            <button className="w-full text-zinc-900 bg-gradient-to-tr from-cyan-600 to-primary  font-semibold py-2 px-4 rounded-md">
              Publish Blog
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
