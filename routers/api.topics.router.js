const { Router } = require("express");

const { getTopics } = require("../controllers/topics-controllers");

const apiTopicsRouter = Router();

apiTopicsRouter.get("/topics", getTopics);

module.exports = apiTopicsRouter;
