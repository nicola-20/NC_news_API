exports.up = function(knex, Promise) {
  console.log("creating articles table...");
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable.increments("article_id", 200).primary();
    articlesTable.string("title").notNullable();
    articlesTable.string("topic").references("topics.slug");
    articlesTable.string("author").references("users.username");
    articlesTable.text("body").notNullable();
    articlesTable.timestamp("created_at").defaultTo(knex.fn.now());
    articlesTable.integer("votes").defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  console.log("dropping articles table...");
  return knex.schema.dropTable("articles");
};
