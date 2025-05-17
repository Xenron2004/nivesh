import { authUser } from "../schema/userAuth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { userAllPlan } from "../schema/Userplan.js";

const SECRET_KEY = "hshs";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await authUser.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist, please sign up first.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    let token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, {
      expiresIn: "7d",
    });

    return res.json({
      success: true,
      token,
      message: "User logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    let existingUser = await authUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 mins from now

    // Send email
    const mailResponse = await sendMail(email, otp);
    if (!mailResponse.success) {
      return res.status(400).json({ success: false, message: mailResponse.message });
    }

    let RegisterUser = new authUser({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      otp,
      otpExpiry,
    });

    await RegisterUser.save();
    return res.status(201).json({ success: true, message: "User registered successfully. Please verify your OTP." });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await authUser.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (new Date() > new Date(user.otpExpiry)) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return res.status(200).json({ success: true, message: "OTP verified successfully" });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const sendMail = async (toEmail, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // e.g., your@gmail.com
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    };

    let info = await transporter.sendMail(mailOptions);

    if (info.rejected.length > 0) {
      return { success: false, message: "Invalid email address" };
    }

    return { success: true };
  } catch (error) {
    return { success: false, message: "Mail sending failed", error };
  }
};
