import User from "../Models/User.js";
import Blog from "../Models/Blog.js";

// All blogs
export const allBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find({});
    return res.status(200).json({
      success: true,
      allBlogs: allBlogs,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

// Create blog
export const create = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const userId = req.params.id;
    const user = await User.findById(userId);
    const blog = new Blog({
      title,
      content,
      user: user._id,
      username: user.username,
      imageUrl,
    });
    await blog.save();
    user.blogs.push(blog);
    await user.save();
    return res.status(201).json({
      success: true,
      message: "blog Published!",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "internal server error!",
      success: false,
    });
  }
};

// Update blog by id
export const updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body;
    if (title) {
      await Blog.findByIdAndUpdate(id, { title: title });
    }
    if (content) {
      await Blog.findByIdAndUpdate(id, { content: content });
    }
    return res.status(200).json({
      success: true,
      message: "Blog update succesfully!",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

// Delete blog by Id
export const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id).populate("user");
    await blog.user.blogs.pull(id);
    await blog.user.save();
    await Blog.deleteOne(blog);
    res.status(200).json({
      success: true,
      message: "Blog delete successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get user blogs
export const userBlogs = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).populate("blogs");
    return res.status(200).json({
      success: true,
      userBlogs: user.blogs,
      profilePic:user.profilePic,

    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get singal blog to read
export const readBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blogData = await Blog.findById(id);
    return res.status(200).json({
      success: true,
      blogData: blogData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
