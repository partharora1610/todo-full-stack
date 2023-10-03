const Todo = require("../db/Todo");

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({
      status: "success",
      data: {
        todos,
      },
    });
  } catch (err) {
    res.status(500).json({ err, message: "Failed to retrieve todos" });
  }
};

exports.createTodos = async (req, res) => {
  const todoData = req.body;

  const newTodo = new Todo(todoData);
  newTodo
    .save()
    .then((todo) => {
      res.status(201).json({ todo, message: "A new todo created" });
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to create a new todo" });
    });
};

exports.deleteTodos = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ status: "Failed", message: "Cant delete the todo with that ID" });
  }
};

exports.updateTodos = async (req, res) => {
  try {
    const newTodo = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      { done: true },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: { todo: newTodo },
    });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ status: "Failed", message: "Cant update the todo with that ID" });
  }
};
