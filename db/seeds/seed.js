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
      return knex("articles")
        .insert(reformedDate)
        .returning("*");
    })
    .then(articlesRows => {
      const commentOwner = articleOrigin(articlesRows);
      const commentCreator = reformComment(commentsData, commentOwner);
      return knex("comments")
        .insert(commentCreator)
        .returning("*");
    });
};
