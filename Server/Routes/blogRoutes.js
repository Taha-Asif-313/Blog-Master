import express from 'express'
import { create, userBlogs, updateBlog, deleteBlog, allBlogs, readBlog } from "../Controllers/blogController.js"
import isLogin from '../Middlewares/isLogin.js';

// Router
const router = express.Router();

// Create Blog route as POST request
router.post("/create/:id",isLogin , create )

//Get all blogs
router.get("/allblogs" , allBlogs)

// Get User Blogs route as GET request
router.get("/user-blogs/:id",isLogin , userBlogs )

// Get the blog data to read the blog 
router.get("/read/:id" , readBlog)

// Update Blog route as PUT request
router.put("/update/:id" ,updateBlog)

// Delete Blog route as DELETE request
router.delete("/delete/:id",isLogin , deleteBlog )


export default router