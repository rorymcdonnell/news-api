const db = require("../db/connection");
const fs = require("fs/promises");
const { postgresNumber } = require("../db/utils/data-manipulation");

exports.selectArticlesById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({
          status: 404,
          msg: "ID does not exist try again bozo!",
        });
      }
      return rows[0];
    });
};

exports.updateArticlesById = (article_id, inc_votes) => {
  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;",
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({
          status: 404,
          msg: "article ID does not exist",
        });
      }
      return rows[0];
    });
};

// GET /api/articles
exports.selectAllArticles = async function (
  sort_by = "created_at",
  order = "DESC",
  topic
) {
  let whereTopic = "";
  if (topic) {
    whereTopic = format("WHERE articles.topic = %L", topic);
  }
  const result = await dbConn.query(
    `SELECT article_id, title, votes, topic, author, created_at, COUNT(comments.comment_id) AS comment_count FROM articles NATURAL LEFT JOIN comments ${whereTopic} GROUP BY article_id ORDER BY ${sort_by} ${order};`
  );
  if (result.rows.length === 0) {
    const validTopic = await dbConn.query(
      `SELECT * FROM topics WHERE slug = '${topic}';`
    );
    if (validTopic.rows.length === 0) {
      return undefined;
    }
  }
  return postgresNumber(result.rows, "comment_count");
};

exports.checkArticleExists = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(([article]) => {
      if (article === undefined) {
        return Promise.reject({ status: 404, msg: "Article Not Found" });
      }
    });
};
