const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticleById,
  patchArticle,
  deleteArticle,
  getArticleComments
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

articlesRouter.route("/:article_id/comments").get(getArticleComments);

module.exports = articlesRouter;
