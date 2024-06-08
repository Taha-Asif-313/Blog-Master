import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "title is required!"],
    },
    description: {
      type: String,
      required: [true, "description is required!"],
    },
    imageUrl: {
      type: String,
   
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
