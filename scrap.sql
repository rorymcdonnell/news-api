\c nc_news_test

SELECT articles.*, COUNT(comment_id) AS number_of_comments
FROM articles
LEFT JOIN comments ON articles.article_id = comments.article_id
GROUP BY articles.article_id;

-- exports.viewAnArticleObjectById = ({ article_id }) => {
--   return connection
--     .select("articles.*")
--     .from("articles")
--     .count({ comment_count: "comment_id" })
--     .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
--     .where("articles.article_id", "=", article_id)
--     .groupBy("articles.article_id")
--     .then(article => {
--       const parsedArticle = article.map(articleData => {
--         const { comment_count, ...restOfData } = articleData;
--         return { ...restOfData, comment_count: Number(comment_count) };
--       });
--       if (!parsedArticle.length) {
--         return Promise.reject({ status: 404, msg: "article not found" });
--       } else {
--         return parsedArticle;
--       }
--     });
-- };