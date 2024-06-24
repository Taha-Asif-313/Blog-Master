import React from "react";

const ReadBlog = ({ title, content, username }) => {

  return (
    <>
      <div className="container w-full h-screen overflow-y-scroll mt-20 lg:mx-10 p-4">
        <h1 className="text-5xl py-3 font-bold text-primary">
         {title}
        </h1>
        <div className="text-lg py-10">
          Auther : <span className="font-bold text-primary">{username}</span>
        </div>
        <p className="">
        <div dangerouslySetInnerHTML={{ __html: content }} />
        </p>
      </div>
    </>
  );
};

export default ReadBlog;
