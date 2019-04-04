const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticleById
} = require("../controllers/articlesController");
const { methodNotAllowed } = require("../errors/index");

articlesRouter
  .route("/")
  .get(getArticles)
  .all(methodNotAllowed);

articlesRouter.route("/:article_id").get(getArticleById);

module.exports = articlesRouter;
