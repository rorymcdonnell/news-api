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

// GET /api/articles
exports.getAllArticles = function (req, res, next) {
  console.log("controller line 28");
  const { sort_by, order, topic } = req.query;
  // check for valid sort_by
  const validSortBy = [
    "article_id",
    "title",
    "votes",
    "author",
    "created_at",
    "comment_count",
    undefined,
  ];
  if (!validSortBy.includes(sort_by)) {
    console.log("on line 40");
    next({ status: 400, msg: "Invalid sort_by" });
  }
  // check for valid order
  const validOrder = ["asc", "desc", "ASC", "DESC", undefined];
  if (!validOrder.includes(order)) {
    console.log("controller line 47");

    next({ status: 400, msg: "Invalid order query" });
  }
  selectAllArticles(sort_by, order, topic)
    .then((articles) => {
      console.log(articles);
      if (!articles) {
        console.log("controller line 55");
        return Promise.reject({ status: 404, msg: "Invalid Topic" });
      }
      res.status(200);
      res.send({ articles });
    })
    .catch(next);
};
