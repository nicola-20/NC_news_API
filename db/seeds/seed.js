const {
  articlesData,
  commentsData,
  topicsData,
  usersData
} = require("../data");

const {
  articleOrigin,
  reformDate,
  reformComment
} = require("../utils/assistanceFunctions");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() =>
      knex("topics")
        .insert(topicsData)
        .returning("*")
    )
    .then(() =>
      knex("users")
        .insert(usersData)
        .returning("*")
    )
    .then(() => {
      const reformedDate = reformDate(articlesData);
      knex("articles")
        .insert(reformedDate)
        .returning("*");
    })
    .then(() => {
      const commentOwner = articleOrigin(articlesData);
      const commentCreator = reformComment(commentsData, commentOwner);
      knex("comments")
        .insert(commentCreator)
        .returning("*");
    });
};
