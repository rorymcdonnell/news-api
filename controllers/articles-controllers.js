const {
  selectArticlesById,
  updateArticlesById,
  selectAllArticles,
} = require("../models/articles-models");

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlesById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => next(err));
};

exports.patchArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticlesById(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => next(err));
};

exports.getAllArticles = (req, res, next) => {
  selectAllArticles(req.query)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => next(err));
};
