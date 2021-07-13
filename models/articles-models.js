const db = require("../db/connection");

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

// exports.selectAllArticles = ({
//   sort_by = "created_at",
//   order = "DESC",
//   topic,
// }) => {
//   const validColumns = [
//     "created_at",
//     "author",
//     "votes",
//     "title",
//     "article_id",
//     "topic",
//     "number_of_comments",
//   ];

//   if (!validColumns.includes(sort_by)) {
//     return Promise.reject({ status: 400, msg: "invalid sort_by column" });
//   }

//   let queryStr = `SELECT articles.*, COUNT(comment_id) AS number_of_comments
//     FROM articles
//     LEFT JOIN comments ON articles.article_id = comments.article_id
//     GROUP BY articles.article_id `;

//   queryStr += `ORDER BY ${sort_by} ${order};`;
//   console.log(queryStr);
//   return db.query(queryStr).then((response) => {
//     return response.rows;
//   });
// };
exports.selectAllArticles = async (sort_by, order, topic) => {
  let query_values = [];
  let queryStr = `SELECT articles.*, COUNT (comment_id)::INT AS number_of_comments
  FROM articles
  LEFT JOIN comments ON articles.article_id = comments.article_id
  `;

  if (topic) {
    queryStr += ` WHERE topic = $1`;
    query_values.push(topic);
  }

  queryStr += ` GROUP BY articles.article_id`;

  if (
    sort_by &&
    ![
      "author",
      "title",
      "article_id",
      "topic",
      "created_at",
      "votes",
      "number_of_comments",
    ].includes(sort_by)
  ) {
    return Promise.reject({
      status: 400,
      msg: "Invalid sort query: column doesn't exist",
    });
  }

  if (order && !["asc", "desc"].includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order query" });
  }

  if (sort_by) {
    queryStr += ` ORDER BY ${sort_by} `;
  } else {
    queryStr += ` ORDER BY articles.created_at `;
  }

  if (order) {
    queryStr += ` ${order} `;
  } else {
    queryStr += ` DESC`;
  }

  queryStr += `;`;

  const allArticles = await db.query(queryStr, query_values);

  if (topic && allArticles.rows.length === 0) {
    const topicResult = await db.query(`SELECT * FROM topics WHERE slug = $1`, [
      topic,
    ]);
    if (topicResult.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Topic not found" });
    }
  }

  return allArticles.rows;
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
