const { Router } = require("express");
const { getEndpoints } = require("../controllers/api.controllers");

const apiArticlesRouter = require("./api.articles.router");

const apiRouter = Router();

apiRouter.get("/", getEndpoints);

apiRouter.use("/articles", apiArticlesRouter);

module.exports = apiRouter;
