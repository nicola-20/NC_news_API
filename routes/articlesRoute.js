const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticleById,
  patchArticle
} = require("../controllers/articlesController");
const { methodNotAllowed } = require("../errors/index");

articlesRouter
  .route("/")
  .get(getArticles)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticle);

module.exports = articlesRouter;
