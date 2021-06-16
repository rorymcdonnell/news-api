const db = require("../db/connection");

exports.selectTopics = async () => {
  const topics = await db.query("SELECT * FROM topics;");
  return topics.rows;
};

exports.selectArticlesById = async (article_id) => {
  console.log("IN THE MODEL YEEHAWW!");
  const article = await db.query(
    `SELECT * FROM articles WHERE article_id = $1`,
    [article_id]
  );
  return article.rows[0];
};

// exports.selectParkById = (park_id) => {
//   return db
//     .query("SELECT * FROM parks WHERE park_id = $1;", [park_id])
//     .then((result) => result.rows[0]);
// };
