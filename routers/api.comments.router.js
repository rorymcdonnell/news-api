const express = require("express");

const {
  getCommentsByArticle,
  postComment,
} = require("../controllers/comments-controllers");

const apiCommentsRouter = express.Router();

apiCommentsRouter
  .get("/api/:article_id/comments", getCommentsByArticle)
  .post("/api/:article_id/comments", postComment);

module.exports = apiCommentsRouter;
