import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "name is required!"],
    },
    username: {
      type: String,
      required: [true, "username is required!"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required!"],
    },
    gender: {
      type: String,
      required: [true, "gender is required!"],
    },
    profilePic: {
      type: String,
      required: true,
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blogs",
        Default: []
      }
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
