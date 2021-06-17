const {
  selectTopics,
  selectArticlesById,
  updateArticlesById,
} = require("../models/topics-models");

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  console.log("IN THE CONTROLLER WOOHOO!");
  selectArticlesById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => next(err));
};

exports.patchArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes: newVote } = req.body;
  console.log("IN THE CONTROLLER WOOHOO!");
  selectArticlesById(article_id)
    .then((article) => {
      console.log(article);
    })
    .catch((err) => err.next);
};
