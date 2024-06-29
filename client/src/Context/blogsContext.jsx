import React, { createContext, useState } from 'react'

const BlogContext = createContext()

const BlogProvider = ({children}) => {
    const [blogs, setblogs] = useState([]);
    const [userBlogs, setuserBlogs] = useState([]);
  return (
    <BlogContext.Provider value={{blogs,setblogs,userBlogs,setuserBlogs}}>
    {children}
    </BlogContext.Provider>
  )
}

export {BlogContext,BlogProvider}
