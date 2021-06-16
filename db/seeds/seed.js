const db = require("../connection");
const format = require("pg-format");
const {
  formatTopicsData,
  formatUsersData,
  formatArticlesData,
  formatCommentsData,
  createArticleRef,
  newKeys,
} = require("../../db/utils/data-manipulation");
const {
  articleData,
  commentData,
  topicData,
  userData,
} = require("../data/development-data/index.js");

const seed = async ({ articleData, commentData, topicData, userData }) => {
  // 1. create tables
  await db.query(`DROP TABLE IF EXISTS comments;`);
  await db.query(`DROP TABLE IF EXISTS articles;`);
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS topics;`);

  await db.query(`
  CREATE TABLE topics (
    slug VARCHAR (500) PRIMARY KEY UNIQUE,
    description VARCHAR (1000)
    )`);

  await db.query(`
  CREATE TABLE users (
    username VARCHAR (500) PRIMARY KEY UNIQUE,
    avatar_url VARCHAR (1000),
    name VARCHAR (200)
    )`);

  await db.query(`
  CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    title VARCHAR (1000),
    body VARCHAR (100000),
    votes INT DEFAULT 0,
    topic VARCHAR (100) REFERENCES topics(slug),
    author VARCHAR (100) REFERENCES users(username),
    created_at TIMESTAMP DEFAULT NOW()
    )`);

  await db
    .query(
      `
    CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR (100) REFERENCES users(username),
      article_id INT REFERENCES articles(article_id),
      votes INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW(),
      body VARCHAR (100000)
    )
    `
    )
    .then(() => {
      const insertTopicsData = format(
        "INSERT INTO topics (slug, description) VALUES %L RETURNING *;",
        formatTopicsData(topicData)
      );
      return db.query(insertTopicsData);
    })
    .then(() => {
      const insertUsersData = format(
        "INSERT INTO users (username, avatar_url, name) VALUES %L RETURNING *;",
        formatUsersData(userData)
      );
      return db.query(insertUsersData);
    })
    .then(() => {
      const insertArticlesData = format(
        "INSERT INTO articles (title, body, votes, topic, author, created_at) VALUES %L RETURNING *;",
        formatArticlesData(articleData)
      );
      return db.query(insertArticlesData);
    })
    .then(({ rows }) => {
      const articleRef = createArticleRef(rows, "title", "article_id");
      const newCommentData = newKeys(commentData, "created_by", "author");

      const insertCommentsData = format(
        "INSERT INTO comments (author, article_id, votes, created_at, body) VALUES %L RETURNING *;",
        formatCommentsData(newCommentData, articleRef)
      );
      return db.query(insertCommentsData);
    });
};
module.exports = seed;
