const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer")

const sendTokenResponse = (user, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email } });
};

exports.registerUser = async (req, res) => {
    const { name, email, password ,role} = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "Email already registered" });
    }

    try {
        const user = new User({ name, email, password, role });
        console.log("🔹 Before saving:", user); 
        await user.save(); 


      res.status(200).json({msg:"signup successful "})
    } catch (error) {
        console.error("❌ Error creating user:", error);
        res.status(500).json({ msg:"Server error, could not create user", message:error.message });
    }
};


exports.loginUser = async (req, res) => {
    try{
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
        return res.status(404).json({ message: "Invalid email or password" });
    }
    sendTokenResponse(user, res);
  }catch(error){
    res.statu(500).json({msg:"error login to account",error})
  }
};



exports.sendResetEmail  = async(req, res) => {
    try {
      const { email } = req.body;
      console.log(email);
  
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Email is not registered" });
      }
  
      console.log(user);
  
   
      const resetToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  
      user.resetPasswordToken = hashedToken;
      user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
      await user.save();
  
      console.log(resetToken);
  
      const resetURL = `http://localhost:5173/resetpass/${resetToken}`;
  
      const message = `
        <h1>Password Reset Request</h1>
        <p>You requested a password reset. Click the link below to reset your password. This link is valid for 15 minutes.</p>
        <a href="${resetURL}">Reset Password</a>
      `;
  
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Password Reset Request",
        html: message,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: "Mail sent" });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }


  exports.newPassword = async (req, res) => {
    try {
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ msg: "Enter new password" });
        }

        const { resetToken } = req.params;
        if (!resetToken) {
            return res.status(400).json({ message: "Reset token is required" });
        }

        const hashedToken = crypto.createHash("sha256").update(String(resetToken)).digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });

    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ msg: "error from the server", error });
    }
};

