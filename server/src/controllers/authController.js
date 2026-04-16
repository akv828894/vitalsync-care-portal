const User = require("../models/User");
const env = require("../config/env");
const formatUser = require("../utils/formatUser");
const generateToken = require("../utils/generateToken");
const {
  createMemoryUser,
  findMemoryUserByEmail,
  compareMemoryPassword,
} = require("../lib/inMemoryUserStore");

const registerUser = async (req, res, next) => {
  try {
    const { fullName, email, password, role = "patient" } = req.body;

    if (!fullName || !email || !password) {
      res.status(400);
      throw new Error("Full name, email, and password are required.");
    }

    if (password.length < 6) {
      res.status(400);
      throw new Error("Password must be at least 6 characters long.");
    }

    const normalizedEmail = email.trim().toLowerCase();
    const trimmedName = fullName.trim();

    const existingUser = env.demoMode
      ? findMemoryUserByEmail(normalizedEmail)
      : await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      res.status(409);
      throw new Error("An account with this email already exists.");
    }

    const user = env.demoMode
      ? await createMemoryUser({
          fullName: trimmedName,
          email: normalizedEmail,
          password,
          role,
        })
      : await User.create({
          fullName: trimmedName,
          email: normalizedEmail,
          password,
          role,
        });

    res.status(201).json({
      message: "Account created successfully.",
      token: generateToken(user),
      user: formatUser(user),
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required.");
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = env.demoMode
      ? findMemoryUserByEmail(normalizedEmail)
      : await User.findOne({ email: normalizedEmail }).select("+password");

    if (!user) {
      res.status(401);
      throw new Error("Invalid email or password.");
    }

    const isPasswordCorrect = env.demoMode
      ? await compareMemoryPassword(user, password)
      : await user.comparePassword(password);

    if (!isPasswordCorrect) {
      res.status(401);
      throw new Error("Invalid email or password.");
    }

    res.json({
      message: "Login successful.",
      token: generateToken(user),
      user: formatUser(user),
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res) => {
  res.json({
    user: formatUser(req.user),
  });
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};
