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

exports.selectAllArticles = () => {
  return db.query(`SELECT * FROM articles;`).then((response) => {
    console.log(response.rows);
    return response.rows;
  });
};
