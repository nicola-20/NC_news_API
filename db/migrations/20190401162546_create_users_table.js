exports.up = function(knex, Promise) {
  console.log("create users table");
  return knex.schema.createTable("users", usersTable => {
    usersTable
      .string("username")
      .primary()
      .unique()
      .notNullable();
    usersTable.string("name");
    usersTable.string("avatar_url");
  });
};

exports.down = function(knex, Promise) {
  console.log("removing users table...");
  return knex.schema.dropTable("users");
};
