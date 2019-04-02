const {
  articlesData,
  commentsData,
  topicsData,
  usersData
} = require("../data");

const {
  commentOrigin,
  reformDate,
  commentAuthor
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
      const commentOwner = commentOrigin(articlesData);
      const commentCreator = commentAuthor(commentsData, commentOwner);
      knex("comments")
        .insert(commentCreator)
        .returning("*");
    });
};
