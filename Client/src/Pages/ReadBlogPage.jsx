import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReadBlog from "../Components/Blog/ReadBlog";
import axios from "axios";
import toast from "react-hot-toast";

const ReadBlogPage = () => {
  const [blogData, setblogData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    // Fetch data function
    const fetchData = async () => {
      await axios
        .get(`https://blog-master-server.vercel.app/api/blog/read/${id}`)
        .then((res) => {
          if (!res.data.success) {
            toast.error(res.data.message || 'server response error!');
          }
          setblogData(res.data.blogData);
        });
    };

    return () => {
      fetchData();
    };
  }, []);

  return (
    <>
      <ReadBlog
        title={blogData.title}
        content={blogData.content}
        username={blogData.username}
        ProfilePic={blogData.ProfilePic}
        UserId={blogData.userId}
      />
    </>
  );
};

export default ReadBlogPage;
