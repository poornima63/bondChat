import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
 email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
  type:String,
  required:true,
  minlength:6,
  },
  dp: {
    type: String, // optional: can be image URL
    default: "",
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
