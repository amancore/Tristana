const jwt = require("jsonwebtoken");
const User = require("../Models/User");

exports.protect = async (req, res, next) => {
    const token = req.cookies.jwt;
    // console.log(token)
    if (!token) {
        return res.status(401).json({ message: "Unauthorized, no token found" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        req.userId=user._id;
        // console.log(user)
        req.role=user.role;
        // console.log(req.userId)
        next();
    } catch (error) {
        res.status(500).json({ msg: "error from server" ,message : error.message});
    }
};




