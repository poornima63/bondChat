
import jwt from "jsonwebtoken";



// export const isVerifyUser = async (req, res,next)=>{
   
//         let token = req.header('auth-token');
//         console.log(token)
//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: 'Please authenticate',
//     });
//   }

//   try {
//     const tokenUser = jwt.verify(token, secretKey);
//     req.user = tokenUser.id;
//     next();
//   } catch (error) {
//     // console.log(secretKey)
//     res.status(401).json({
//       success: false,
//       message: 'Invalid token',
//     });
//   }
         
// }


export const isVerifyUser = async (req, res, next) => {
  const token = req.header('auth-token'); // Header key must match

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Please authenticate',
    });
  }

  try {
    // console.log(secretKey)
    const tokenUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = tokenUser.id;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
};

