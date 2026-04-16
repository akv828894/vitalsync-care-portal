const env = require("../config/env");

const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
};

const errorHandler = (error, req, res, next) => {
  void req;
  void next;

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: error.message || "Internal server error.",
    stack: env.nodeEnv === "production" ? undefined : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
