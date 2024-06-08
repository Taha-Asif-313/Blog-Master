import express from 'express'
import { create, userBlogs, updateBlog, deleteBlog, allBlogs } from "../Controllers/blogController.js"
// const isLogin = require("../MiddleWares/isLogin")
// Router
const router = express.Router();

// Create Blog route as POST request
router.post("/create/:id" , create )

//Get all blogs
router.get("/allblogs" , allBlogs)

// Get User Blogs route as GET request
router.get("/user-blogs/:id" , userBlogs )

// Update Blog route as PUT request
router.put("/update/:id" , updateBlog)

// Delete Blog route as DELETE request
router.delete("/delete/:id" , deleteBlog )


export default router