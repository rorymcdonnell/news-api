const { Router } = require("express");

const {
  getArticlesById,
  patchArticlesById,
  getAllArticles,
} = require("./controllers/articles-controllers");

const apiArticlesRouter = Router();

apiArticlesRouter
  .get("/articles", getAllArticles)
  .get("/articles/:article_id", getArticlesById)
  .patch("/articles/:article_id", patchArticlesById);

module.exports = apiArticlesRouter;
