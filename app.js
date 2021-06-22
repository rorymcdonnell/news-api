const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics-controllers");

const {
  getArticlesById,
  patchArticlesById,
  getAllArticles,
} = require("./controllers/articles-controllers");

app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticlesById);
app.patch("/api/articles/:article_id", patchArticlesById);
app.get("/api/articles", getAllArticles);

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "invalid ID, sort it out!" });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  res.status(500).send({ msg: "internal server error!" });
});
module.exports = app;
