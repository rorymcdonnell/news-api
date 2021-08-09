const { Router } = require("express");
const { getEndpoints } = require("../controllers/api.controllers");

const apiArticlesRouter = require("./api.articles.router");
const apiTopicsRouter = require("./api.topics.router");
const apiUsersRouter = require("./api.users.router");

const apiRouter = Router();

apiRouter.get("/", getEndpoints);

apiRouter.use("/articles", apiArticlesRouter);
apiRouter.use("/topics", apiTopicsRouter);
apiRouter.use("/users", apiUsersRouter);

module.exports = apiRouter;
