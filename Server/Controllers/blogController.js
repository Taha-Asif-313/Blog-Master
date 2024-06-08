import User from '../Models/User.js'
import Blog from '../Models/Blog.js'

// All blogs
export const allBlogs = async(req,res)=>{
  const allBlogs = await Blog.find({})
  return res.json({
    blogs:allBlogs
  })
}
// Create blog
export const create = async (req, res) => {
  try {
    const { title, description , imageUrl } = req.body;
    const userId = req.params.id;
    const user = await User.findById(userId);
    const blog = new Blog({
      title,
      description,
      auther,
      user: user._id,
    });
    await blog.save();
    user.blogs.push(blog);
    await user.save();
    return res.json({
      success:true,
      message:"blog Created",
      username:user.username
    })
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "internal server error!",
      success: false,
    });
  }
};

// Get blogs
export const userBlogs = async (req, res) => {
  const id = req.params.id;
  const userBlogs = await Blog.find({ user: id });
 return res.json({
  userBlogs:userBlogs,
 });
};

export const updateBlog = async (req, res) => {
  const id = req.params.id;
  const { title, description, auther } = req.body;
  update = await Blog.findByIdAndUpdate({user:id},{
    title: title,
    description: description,
    auther: auther,
  });
};

export const deleteBlog = async(req,res)=>{
  const id = req.params.id
  const deleteBlog = await Blog.findByIdAndDelete(id).populate("user")
  await deleteBlog.user.blogs.pull(id)
  await deleteBlog.user.save()
  // const user = User.findOne({_id:deleteBlog.user})
  res.json(deleteBlog.user.blogs)
  // await deleteBlog.user.blogs.pull(deleteBlog)
}


