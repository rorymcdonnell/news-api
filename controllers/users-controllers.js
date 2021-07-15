const {
  selectUserByUsername,
  selectAllUsers,
} = require("../models/users-models");

function getUserByUsername(req, res, next) {
  const { username } = req.params;

  selectUserByUsername(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
}

function getAllUsers(req, res, next) {
  selectAllUsers()
    .then((users) => {
      console.log(users, "line 19");
      res.status(200).send({ users });
      console.log(users, "line 21");
    })
    .catch(next);
}

module.exports = { getUserByUsername, getAllUsers };
