const newsArticle = require("../models/newsArticleModel");

const getanalyticsdata = async (req, res) => {
  try {
    const examples = await newsArticle.find();
    res.json(examples);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getanalyticsdata,
};
