import mongoose from "mongoose"



  const connectTOmongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
console.log("mongoDB connected Successfully")
    } catch (error) {
        console.log("mongoDB connection Failed! ",error)
    }
  }
  export default connectTOmongoDB