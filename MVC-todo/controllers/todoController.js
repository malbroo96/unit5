// controllers/todoController.js
const { readTodos, writeTodos } = require("../models/todoModel");

function getAllTodos(req, res) {
  const todos = readTodos();
  res.json(todos);
}

function searchTodos(req, res) {
  const q = req.query.q ? req.query.q.toLowerCase() : "";
  const todos = readTodos();
  const results = todos.filter(todo =>
    todo.title.toLowerCase().includes(q)
  );
  res.json(results);
}

function addTodo(req, res) {
  const todos = readTodos();
  const { title, completed = false } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });

  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    title,
    completed,
  };

  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
}

function updateTodo(req, res) {
  const todos = readTodos();
  const id = +req.params.id;
  const { title, completed } = req.body;
  const todo = todos.find(t => t.id === id);

  if (!todo) return res.status(404).json({ message: "Todo not found" });

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  writeTodos(todos);
  res.json(todo);
}

function deleteTodo(req, res) {
  const todos = readTodos();
  const id = +req.params.id;
  const filtered = todos.filter(t => t.id !== id);

  if (filtered.length === todos.length)
    return res.status(404).json({ message: "Todo not found" });

  writeTodos(filtered);
  res.json({ message: `Todo ${id} deleted` });
}

module.exports = {
  getAllTodos,
  searchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
