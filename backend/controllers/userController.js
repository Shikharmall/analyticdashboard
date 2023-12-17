// authController.js

const bcrypt = require('bcrypt'); // Install bcrypt package if not already installed
const User = require('../models/userModel');

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // TODO: Implement token generation for successful login (JWT, for example)

    res.json({ message: 'Login successful' });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  // Add other controller methods here
};
