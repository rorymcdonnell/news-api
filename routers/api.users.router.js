const express = require("express");

const {
  getUserByUsername,
  getAllUsers,
} = require("../controllers/users-controllers");

const apiUsersRouter = express.Router();

apiUsersRouter
  .get("/users", getAllUsers)
  .get("/users/:username", getUserByUsername);

module.exports = apiUsersRouter;
