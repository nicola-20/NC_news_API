const { selectArticles } = require("../models/articlesModels");

exports.getArticles = (req, res, next) => {
  console.log(req.query, "query");
  selectArticles(req.query).then(articles => {
    res.status(200).json({ articles });
  });
};
