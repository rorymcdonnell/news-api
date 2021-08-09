const express = require("express");

const { getTopics } = require("../controllers/topics-controllers");

const apiTopicsRouter = express.Router();

apiTopicsRouter.get("/", getTopics);

module.exports = apiTopicsRouter;
