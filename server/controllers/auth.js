import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    return res
      .status(200)
      .cookie("codeCraft", token, {
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "none",
        httpOnly: true,
        secure: true,
      })
      .json({
        success: true,
        message: "User Created Successfully",
        user,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    return res
      .status(200)
      .cookie("codeCraft", token, {
        maxAge: 24 * 60 * 60 * 1000, 
        sameSite: "none", 
        httpOnly: true, 
        secure: true, 
      })
      .json({
        success: true,
        message: "User Logged in SuccessFully",
        user,
      });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const Logout = async (req, res) => {
  try {
    return res.cookie("codeCraft", "", { maxAge: -1 }).status(200).json({
      success: true,
      message: "User Logged Out Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const setAttempt = async (req, res) => {
  try {
    const { story, problemId, userId } = req.body;
    console.log(story, problemId, userId);
    const user = await User.findById(userId);
    const attemptCount = user.attempts.length;
    user.attempts.push({
      problemId,
      attemptCount: attemptCount + 1,
      attemptTypes: story,
      lastAttempt: Date.now(),
    });
    await user.save();
    console.log(typeof problemId);
    if (story == "Accepted") {
      if (!user.problemSolved.includes(problemId)) {
        user.problemSolved.push(problemId);
        await user.save();
      }
    }
    return res.status(200).json({
      success: true,
      message: "Attempt Set Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const getSubmission = async (req, res) => {
  try {
    const { userId, problemId } = req.params;
    console.log(userId, problemId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    const submission = user.attempts.filter(
      (attempt) => attempt.problemId == problemId
    );

    return res.status(200).json({
      success: true,
      message: "Submission Fetched Successfully",
      submission,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { SignUp, login, setAttempt, getSubmission, Logout };
