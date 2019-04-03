const { selectArticles } = require("../models/articlesModels");

exports.getArticles = (req, res, next) => {
  selectArticles().then(articles => {
    res.status(200).json({ articles });
  });
};
