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
  const { sort_by } = req.query;
  const { order } = req.query;
  const { author } = req.query;
  const { topic } = req.query;
  if (!author && !topic) {
    selectAllArticles(sort_by, order, author, topic)
      .then((articles) => {
        res.status(200).send({ articles });
      })
      .catch(next);
  } else if (!topic) {
    Promise.all([
      selectAllArticles(sort_by, order, author, topic),
      checkUserExists(author),
    ])
      .then(([articles]) => {
        res.status(200).send({ articles });
      })
      .catch(next);
  } else {
    Promise.all([
      selectAllArticles(sort_by, order, author, topic),
      checkTopicExists(topic),
    ])
      .then(([articles]) => {
        res.status(200).send({ articles });
      })
      .catch(next);
  }
};
