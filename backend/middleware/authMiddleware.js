const jwt = require('jsonwebtoken');
const User=require("../models/User")



exports.usercheck = async(req, res, next) => {
  const token =req.cookies.jwt;
  // console.log(token)
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user= await User.findById(decoded.id).select("_id");// extracting the object of user _id 
    req.userId=user._id;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};


// const jwt = require ("jsonwebtoken");
// const User = require("../models/User"); // Make sure you require the User model

// exports.usecheck = async (req, res, next) => {
//   const token = req.cookies.jwt; 

//   if (!token) return res.status(401).json({ error: "Access denied" });

//   try {
//     // Verify JWT token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     // Fetch user from the database and exclude password
//     const user = await User.findById(decoded.id).select("-password"); 
    
//     if (!user) return res.status(404).json({ error: "User not found" });

//     req.user = user; // Attach the user object to the request
//     next(); // Continue to the next middleware or route handler

//   } catch (err) {
//     res.status(400).json({ error: "Invalid token" });
//   }
// };
