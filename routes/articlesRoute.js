const articlesRouter = require("express").Router();
const { getArticles } = require("../controllers/articlesController");
const { methodNotAllowed } = require("../errors/index");

articlesRouter
  .route("/")
  .get(getArticles)
  .all(methodNotAllowed);

module.exports = articlesRouter;
