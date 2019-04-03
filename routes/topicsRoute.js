const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/topicsController");
const { methodNotAllowed } = require("../errors/index");

topicsRouter
  .route("/")
  .get(getTopics)
  .all(methodNotAllowed);
console.log(getTopics, "getTopics");

module.exports = topicsRouter;
