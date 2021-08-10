const express = require("express");
const app = express();

const cors = require("cors");

const apiRouter = require("./routers/api.router");

const {
  handle500ServerErrors,
  handlePSQL400Errors,
} = require("./errors/errors");

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);
// app.get("/api/articles/:article_id/comments", getCommentsByArticle);
// app.post("/api/articles/:article_id/comments", postComment);

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

// Error handling
app.use(handlePSQL400Errors);
app.use(handle500ServerErrors);
module.exports = app;
