import { authUser } from "../schema/userAuth";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

let SECRET_KEY = "hshs";

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      let user = await authUser.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ success: false, message: " user is not exits please signup first " });
      }
  
      // Compare the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }
  
      // Generate JWT token (7 days expiry)
      let token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, { expiresIn: "7d" });
  
      return res.json({ success: true, token, message: "User logged in successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

export const signup = async (req, res) => {
    try {
      const { name, email, phone, password } = req.body;
  
      // Check if user already exists
      let existingUser = await authUser.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "User already exists" });
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      let RegisterUser = new authUser({
        name,
        email,
        phone,
        password: hashedPassword, // Store the hashed password
      });
  
      await RegisterUser.save();
  
      return res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error"});
    }
  };
  


