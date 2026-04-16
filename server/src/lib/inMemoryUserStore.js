const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const users = [];

const createMemoryUser = async ({ fullName, email, password, role }) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const now = new Date();

  const user = {
    _id: crypto.randomUUID(),
    fullName,
    email,
    password: hashedPassword,
    role: role || "patient",
    createdAt: now,
    updatedAt: now,
  };

  users.push(user);
  return user;
};

const findMemoryUserByEmail = (email) =>
  users.find((user) => user.email === email) || null;

const findMemoryUserById = (id) =>
  users.find((user) => user._id.toString() === id.toString()) || null;

const compareMemoryPassword = (user, candidatePassword) =>
  bcrypt.compare(candidatePassword, user.password);

module.exports = {
  createMemoryUser,
  findMemoryUserByEmail,
  findMemoryUserById,
  compareMemoryPassword,
};
