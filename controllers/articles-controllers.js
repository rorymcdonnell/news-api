const {
  selectArticlesById,
  updateArticlesById,
  selectAllArticles,
} = require("../models/articles-models");

// GET an article matching an ID
exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlesById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => next(err));
};

// PATCH an article given an article ID
exports.patchArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticlesById(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => next(err));
};

// GET all articles
exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;

  selectAllArticles(sort_by, order, topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
