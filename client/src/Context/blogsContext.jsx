import React, { createContext, useState } from 'react'

const BlogContext = createContext()

const BlogProvider = ({children}) => {
    const [blogs, setblogs] = useState([])
  return (
    <BlogContext.Provider value={{blogs,setblogs}}>
    {children}
    </BlogContext.Provider>
  )
}

export {BlogContext,BlogProvider}