const handlePSQL400Errors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "invalid ID, sort it out!" });
  } else {
    next(err);
  }
};

const handle500ServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "internal server error!" });
};

module.exports = {
  handle500ServerErrors,
  handlePSQL400Errors,
};
