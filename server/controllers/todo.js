const Todo = require("../db/Todo");
const catchAsync = require("./../utils/catchAsync.js");

// This returns a function that is called when express wants to hit that route

exports.getAllTodos = catchAsync(async (req, res, next) => {
  const todos = await Todo.find();
  res.status(200).json({
    status: "success",
    results: todos.length,
    data: {
      todos,
    },
  });
});

exports.createTodos = catchAsync(async (req, res, next) => {
  const newTodo = await Todo.create(req.body);

  res
    .status(201)
    .json({ data: { newTodo }, message: "Todo created Successfully" });
});

exports.deleteTodos = catchAsync(async (req, res, next) => {
  await Todo.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.updateTodos = catchAsync(async (req, res, next) => {
  const newTodo = await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    { done: true },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: { todo: newTodo },
  });
});

// Explore the routes
// delete many
// update many
