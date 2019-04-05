const {
  selectArticles,
  updateArticles,
  removeArticles,
  fetchArticleComments
} = require("../models/articlesModels");

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
  updateArticles(req.body, req.params).then(articles => {
    res.status(200).json({ articles });
  });
};

exports.deleteArticle = (req, res, next) => {
  removeArticles(req.params).then(() => {
    res.status(204).json();
  });
};

exports.getArticleComments = (req, res, next) => {
  fetchArticleComments(req.params).then(articles => {
    res.status(200).json({ articles });
  });
};
