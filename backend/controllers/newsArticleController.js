const newsArticle = require("../models/newsArticleModel");
const User = require("../models/userModel");

const getanalyticsdata = async (req, res) => {
  try {
    const examples = await newsArticle.find();
    res.json(examples);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCredentials = async (req, res) => {
  try {
    const examples = await User.find();
    res.json(examples);
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
      return res.status(404).json({ error: "User not found" });
    }

    // Check the password
    const user1 = await User.findOne({ password });

    if (!user1) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getanalyticsdata,
  getCredentials,
  loginUser
};
