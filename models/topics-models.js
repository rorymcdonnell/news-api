const db = require("../db/connection");

exports.selectTopics = async () => {
  const topics = await db.query("SELECT * FROM topics;");
  return topics.rows;
};

exports.selectArticlesById = (article_id) => {
  console.log("IN THE MODEL YEEHAWW!");
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      console.log(rows);
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
  console.log("IN THE MODEL YEEHAWW!");
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

exports.selectAllArticles = ({
  sort_by = "created_at",
  order = "DESC",
  topic,
}) => {
  let queryStr = `SELECT articles.*, COUNT(comment_id) AS number_of_comments
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order};`;
  return db.query(queryStr).then((response) => {
    return response.rows;
  });
};
