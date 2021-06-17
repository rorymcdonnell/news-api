const express = require("express");
const app = express();
const {
  getTopics,
  getArticlesById,
  patchArticlesById,
} = require("./controllers/topics-controllers");

app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticlesById);
app.patch("/api/articles/:article_id", patchArticlesById);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
});

module.exports = app;
