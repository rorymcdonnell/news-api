const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics-controllers");
const {
  postComment,
  getCommentsByArticle,
} = require("./controllers/comments-controllers");
const cors = require("cors");

const {
  getArticlesById,
  patchArticlesById,
  getAllArticles,
} = require("./controllers/articles-controllers");

const {
  getUserByUsername,
  getAllUsers,
} = require("./controllers/users-controllers");

app.use(cors());

app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticlesById);
app.patch("/api/articles/:article_id", patchArticlesById);
app.get("/api/articles", getAllArticles);

app.get("/api/:article_id/comments", getCommentsByArticle);
app.post("/api/:article_id/comments", postComment);

app.get("/api/users", getAllUsers);
app.get("/api/:username", getUserByUsername);

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
