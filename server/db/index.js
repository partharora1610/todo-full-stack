const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: String,
});

const todoSchema = new mongoose.Schema({
  title: String,
  done: Boolean,
  date: String,
  userId: String,
});

const User = mongoose.model("User", userSchema);
const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
  User,
  Todo,
};
