const Todo = require("../db/Todo");
const catchAsync = require("./../utils/catchAsync.js");

exports.getAllTodos = catchAsync(async (req, res, next) => {
  // just need to add id to the req object like req.id => userId instead of the body
  const userId = req.body.id;
  console.log(userId);

  const todos = await Todo.find({ userId });
  res.status(200).json({
    status: "success",
    results: todos.length,
    data: {
      todos,
    },
  });
});

exports.createTodos = catchAsync(async (req, res, next) => {
  const userId = "partharora";
  // just need to add id to req.id object and then extract it here

  const todo = { ...req.body, userId };

  const newTodo = await Todo.create(todo);

  res
    .status(201)
    .json({ data: { newTodo }, message: "Todo created Successfully" });
});

exports.deleteTodos = catchAsync(async (req, res, next) => {
  // just need to check whether the user is authenticated or not to acceess that routes or not
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
