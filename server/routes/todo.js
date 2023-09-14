const express = require("express");
const authenticateJwt = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticateJwt, (req, res) => {
  const userId = req.userId;

  Todo.find({ userId })
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to retrieve todos" });
    });
});

router.post("/", authenticateJwt, (req, res) => {
  const { title, description } = req.body;
  const done = false;

  const newTodo = new Todo({ title, description, done, userId });
  newTodo
    .save()
    .then((savedTodo) => {
      res.status(201).json(savedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to create a new todo" });
    });
});

router.delete("/todos", (req, res) => {});

router.patch("/todos", authenticateJwt, (req, res) => {
  // const { todoId } = req.params;
  const userId = req.userId;
  const todoId = req.todoId;

  Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json(updatedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to update todo" });
    });
});

module.exports = router;
