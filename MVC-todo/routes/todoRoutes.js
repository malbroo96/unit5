const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  searchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.get("/", getAllTodos);
router.get("/search", searchTodos);
router.post("/", addTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
