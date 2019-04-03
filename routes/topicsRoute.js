const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/topicsController");

topicsRouter.route("/").get(getTopics);
console.log(getTopics, "getTopics");

module.exports = topicsRouter;
