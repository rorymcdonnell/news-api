const express = require("express");

const {
  getArticlesById,
  patchArticlesById,
  getAllArticles,
} = require("../controllers/articles-controllers");

const apiArticlesRouter = express.Router();

apiArticlesRouter.route("/").get(getAllArticles);

apiArticlesRouter
  .route("/:article_id")
  .get(getArticlesById)
  .patch(patchArticlesById);

module.exports = apiArticlesRouter;
