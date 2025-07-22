
import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs"
 import { generateToken } from "../lib/jwt.utils.js";
 import cloudinary from "../lib/cloudinary.js";


 //signup
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
 
//login
export const login = async (req,res)=>{
  const {email,password}  = req.body
  try {
    
  const user = await userModel.findOne({email})
   if(!user) {
      return res.status(400).json({ message: "invalid email or password" });
   }
   const isPasswordCorrect =  await bcrypt.compare(password,user.password)
    
   if(!isPasswordCorrect){
     return res.status(400).json({ message: "invalid email or password" });
   }
     
 const token = generateToken( user._id );

    // ✅ You can either send token in cookie or response. Here's simple response:
    res.status(200).json({
      message: "Login successful",
      token, // send token
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("error ijn logic controller",error)
    res.status(500).json({message:"internal server error"})  
  }    
}

//logout
 export const logout = (req,res)=>{
    try {
        return res.status(200).json({ message: "Logout successful. Please remove token from client." });
    } catch (error) {
      console.log("logout failed", error)
    }  
}

// update profile


export const updateProfile = async (req, res) => {
  const { fullName, email } = req.body;
  let updateData = { fullName, email };

  try {
    // Check if file is coming
    if (req.files && req.files.dp) {
      const file = req.files.dp;

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(file.tempFilePath || file.data, {
        folder: "chat-profile",
      });

      // Add to updateData
      updateData.dp = result.secure_url;
    }

    // Update user
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user,
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Profile update failed", error });
  }
};
