
import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs"
 import { generateToken } from "../lib/jwt.utils.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const userExist = await userModel.findOne({ email });
    if (userExist) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // ✅ No token generated here
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Signup failed", error });
  }
};
 

export const login = (req,res)=>{
    res.send("login route")


    
}
 export const logout = (req,res)=>{
    res.send("logout route")


    
}
