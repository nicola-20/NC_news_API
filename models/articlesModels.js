const connection = require("../db/connection");

exports.selectArticles = () => {
  return connection
    .select(
      "articles.article_id",
      "articles.title",
      "articles.topic",
      "articles.author",
      "articles.body",
      "articles.created_at",
      "articles.votes"
    )
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .count("articles.article_id as comment_count")
    .groupBy("articles.article_id");
};
