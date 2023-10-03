const express = require("express");
const authenticateJwt = require("../middleware/auth");
const {
  createTodos,
  getAllTodos,
  deleteTodos,
  updateTodos,
} = require("../controllers/todo");

const router = express.Router();

router.get("/", getAllTodos);
router.post("/", createTodos);
router.delete("/:id", deleteTodos);
router.patch("/:id", updateTodos);

module.exports = router;
