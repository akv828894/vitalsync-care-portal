const jwt = require("jsonwebtoken");
const env = require("../config/env");

const generateToken = (user) => {
  if (!env.jwtSecret) {
    throw new Error("JWT_SECRET is missing. Add it to server/.env before logging in.");
  }

  return jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role,
    },
    env.jwtSecret,
    {
      expiresIn: "7d",
    },
  );
};

module.exports = generateToken;
