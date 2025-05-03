const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const sendTokenResponse = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 
  });

  // ✅ Now token is included in response JSON
  res.json({ 
      message: "successful", 
      token,  // ✅ Send token in response
      user: { id: user._id, name: user.name, email: user.email } 
  });
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username)
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const user = new User({ username, email, password });

    await user.save();
    sendTokenResponse(user, res);
    // res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: "error from the server", error: err.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    sendTokenResponse(user,res);
    // res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
