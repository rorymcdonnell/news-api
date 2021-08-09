const express = require("express");

const {
  getUserByUsername,
  getAllUsers,
} = require("../controllers/users-controllers");

const apiUsersRouter = express.Router();

apiUsersRouter.get("/", getAllUsers).get("/:username", getUserByUsername);

module.exports = apiUsersRouter;
