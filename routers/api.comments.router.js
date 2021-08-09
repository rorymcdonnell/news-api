const { Router } = require("express");

const {
  getCommentsByArticle,
  postComment,
} = require("../controllers/comments-controllers");

const apiCommentsRouter = Router();

apiCommentsRouter
  .get("/api/:article_id/comments", getCommentsByArticle)
  .post("/api/:article_id/comments", postComment);

module.exports = apiCommentsRouter;
