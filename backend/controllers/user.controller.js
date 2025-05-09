import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils.js/datauri.js";
import cloudinary from "../utils.js/cloudinary.js";

// Register a new user
export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;

    // Check if all required fields are provided
    if (!fullName || !email || !phoneNumber || !password || !role)
      return res.status(400).json({
        message: "Please fill all the fields.",
        success: false,
      });

    let imageURL = null;

    // Get uploaded image from request - user profile picture
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const myCloud = await cloudinary.uploader.upload(fileUri.content, {
        folder: "Skill-Sphere/ProfileImage",
        resource_type: "image",
      });
      imageURL = myCloud.secure_url;
    }
    // Check if user already exists
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({
        message: "User already exists with this email ID",
        success: false,
      });

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePicture: imageURL, //Save the URL of the uploaded file
      },
    });

    return res.status(201).json({
      message: "User Created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Login existing user
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if all required fields are provided
    if (!email || !password || !role)
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        message: "User Not Found",
        success: false,
      });

    // Validate password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res.status(400).json({
        message: "Invalid Credentials",
        success: false,
      });

    // Validate role
    if (role != user.role)
      return res.status(400).json({
        message: "Account doesn't exist with this role.",
        success: false,
      });

    // Create JWT token
    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Return user data without password
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome Back ${user.fullName}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Logout user by clearing the token cookie
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged Out Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User Not Found.",
        success: false,
      });
    }

    // Update fields if provided
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",");

    // Upload resume if file is provided
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      if (cloudResponse) {
        user.profile.resume = cloudResponse.secure_url;
        user.profile.resumeOriginalName = file.originalname;
      }
    }

    await user.save();

    // Sanitize response
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile Updated Successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
