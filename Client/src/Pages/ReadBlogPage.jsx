import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReadBlog from "../Components/Blog/ReadBlog";
import axios from "axios";
import toast from "react-hot-toast";
import useReadBlog from "../Hooks/useReadBlog";
import LoadingCircle from "../Components/Loading/LoadingCircle";

const ReadBlogPage = () => {
  const [blogData, setblogData] = useState({});

  const { id } = useParams();

  const { data, error, loading } = useReadBlog(
    `https://blog-master-server.vercel.app/api/blog/read/${id}`
  );
  console.log(data);
  
  if(loading) return <div className="top-0 fixed w-full h-screen left-0">
    <LoadingCircle/>
  </div>

  return (
    <>
      <ReadBlog
        title={data.title}
        content={data.content}
       
      />
    </>
  );
};

export default ReadBlogPage;
