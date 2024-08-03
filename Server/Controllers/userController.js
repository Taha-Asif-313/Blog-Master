import User from "../Models/User.js";
import Blog from "../Models/Blog.js";
import bcrypt from "bcrypt";
import { generateToken } from "../Utils/tokenGenerator.js";
import { tokenRemover } from "../Utils/tokenRemover.js";

// Register User
export const register = async (req, res) => {
  try {
    // Get data from user
    const { fullname, username, email, password, confirmPassword, gender } =
      req.body;

    // Check if username exist or not
    const isUsername = await User.findOne({ username: username });
    if (isUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists!",
      });
    }

    // Check if email exist or not
    const isEmail = await User.findOne({ email: email });
    if (isEmail) {
      return res.status(400).json({
        success: false,
        message: "Try another email!",
      });
    }

    // Check password and confirmPassword same or different
    if (password !== confirmPassword) {
      return res.status(404).json({
        success: false,
        message: "Password did not matched!",
      });
    }

    // Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save User
    const user = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
      gender,
      profilePic:
        gender === "male"
          ? "https://avatar.iran.liara.run/public/boy"
          : "https://avatar.iran.liara.run/public/girl",
    });
    await user.save();

    // JWT Token
    generateToken(user._id, res);

    // Response
    return res.status(201).json({
      success: true,
      message: "Registered Successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    // Get data
    const { username, email, password } = req.body;

    // // Confirm that both password are same or not
    // if (password !== confirmPassword) {
    //   return res.json({
    //     success: false,
    //     message: "Password not match!",
    //   });
    // }

    // Find User by email or username
    const user = username
      ? await User.findOne({ username: username })
      : await User.findOne({ email: email });

    // Email matching
    if (!user) {
      return res.json({
        success: false,
        message: "invalid candidate!",
      });
    }

    // Password Matching
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "invalid candidate!",
      });
    }

    // JWT Token
    generateToken(user._id, res);

    // Responce
    return res.status(200).json({
      success: true,
      message: "Login Successfully!",
      userId: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "internal server error !",
    });
  }
};

// Logout User
export const logout = async (req, res) => {
  try {
    await tokenRemover(res);
    return res.status(200).json({
      success: true,
      message: "Logout successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update User
export const update = async (req, res) => {
  try {
    // Get id from params
    const userId = req.params.id;

    // Get data for update user
    const { email, username } = req.body;

    // Check if username exist or not

    const isUsername = await User.findOne({ username: username });
    if (isUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists!",
      });
    }

    // Check if email exist or not
    const isEmail = await User.findOne({ email: email });
    if (isEmail) {
      return res.status(400).json({
        success: false,
        message: "Try different email!",
      });
    }

    // Find user by id and update the data
    if (username) {
      const user = await User.findByIdAndUpdate(userId, { username: username });
      await user.save();
    }

    if (email) {
      const user = await User.findByIdAndUpdate(userId, { email: email });
      await user.save();
    }

    // Response
    return res.status(201).json({
      success: true,
      message: "Update successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "internal server error",
    });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    // Get id from params
    const userId = req.params.id;

    // Find user for delete by id
    const deletedUser = await User.findById(userId);

    // Delete the user blogs
    await Blog.deleteMany(deleteUser.blogs);

    // Delete the user
    await User.deleteOne(deletedUser);

    // Response
    return res.status(201).json({
      success: true,
      message: "deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "internal server error",
    });
  }
};
