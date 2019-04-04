const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticleById,
  patchArticle,
  deleteArticle
} = require("../controllers/articlesController");
const { methodNotAllowed } = require("../errors/index");

articlesRouter
  .route("/")
  .get(getArticles)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticle)
  .delete(deleteArticle);

module.exports = articlesRouter;
