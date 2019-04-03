const express = require("express");
const apiRouter = require("./routes/api");
const { routeNotFound, handle500 } = require("./errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", routeNotFound);

app.use(handle500);

module.exports = app;

/**
GET /api/articles

GET /api/articles/:article_id
PATCH /api/articles/:article_id */
