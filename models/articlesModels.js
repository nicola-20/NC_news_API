const connection = require("../db/connection");

exports.selectArticles = ({ author, article_id }) => {
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
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .count({ comment_count: "comment_id" })
    .where(builder => {
      if (author !== undefined) builder.where({ "articles.author": author });
      if (article_id !== undefined)
        builder.where({
          "articles.article_id": article_id
        });
    });
};
