const { selectArticles, updateArticles } = require("../models/articlesModels");

exports.getArticles = (req, res, next) => {
  selectArticles(req.query).then(articles => {
    res.status(200).json({ articles });
  });
};

exports.getArticleById = (req, res, next) => {
  selectArticles(req.params).then(articles => {
    res.status(200).json({ articles });
  });
};

exports.patchArticle = (req, res, next) => {
  updateArticles(req.params, req.body).then(articles => {
    res.status(200).json({ articles });
  });
};
