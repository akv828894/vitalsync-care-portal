const jwt = require("jsonwebtoken");
const env = require("../config/env");
const User = require("../models/User");
const { findMemoryUserById } = require("../lib/inMemoryUserStore");

const protect = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization || "";

    if (!authorizationHeader.startsWith("Bearer ")) {
      res.status(401);
      throw new Error("Not authorized. Bearer token is missing.");
    }

    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, env.jwtSecret);
    const user = env.demoMode
      ? findMemoryUserById(decodedToken.userId)
      : await User.findById(decodedToken.userId);

    if (!user) {
      res.status(401);
      throw new Error("Not authorized. User no longer exists.");
    }

    req.user = user;
    next();
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(401);
    }

    next(error);
  }
};

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403);
      next(new Error("Forbidden. You do not have access to this resource."));
      return;
    }

    next();
  };
};

module.exports = {
  protect,
  authorizeRoles,
};
