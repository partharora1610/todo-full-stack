const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  // todos: [],
  // here we will use the populate method to get the strings
});

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  done: Boolean,
  userId: String,
});

const User = mongoose.model("User", userSchema);
const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
  User,
  Todo,
};
