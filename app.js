const express = require("express");
const app = express();
const {
  getTopics,
  getArticlesById,
} = require("./controllers/topics-controllers");

app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticlesById);

module.exports = app;
