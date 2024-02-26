const express = require("express");
const router = express.Router();

const Todo = require("../models/todo");

// GET all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.getAllTodos();
    res.send(todos);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).send({ error: "Error fetching todos" });
  }
});

// GET todo based on ID
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.getTodoById(req.params.id);
    if (!todo) {
      res.status(404).send({ error: "Todo not found" });
    } else {
      res.send(todo);
    }
  } catch (err) {
    console.error("Error fetching todo:", err);
    res.status(500).send({ error: "Error fetching todo" });
  }
});

// POST create new todo
router.post("/", async (req, res) => {
  try {
    const todo = {
      title: req.body.title,
      description: req.body.description,
      is_complete: req.body.is_complete || false,
      due_date: req.body.due_date || new Date(),
    };
    const newTodo = await Todo.createTodo(todo);
    res.status(201).send(newTodo);
  } catch (err) {
    console.error("Error creating todo:", err);
    res.status(500).send({ error: "Error creating todo" });
  }
});

// UPDATE todo
router.patch("/:id", async (req, res) => {
  try {
    const updatedTodo = {};
    if (req.body.title) updatedTodo.title = req.body.title;
    if (req.body.description) updatedTodo.description = req.body.description;
    if (req.body.is_complete !== undefined)
      updatedTodo.is_complete = req.body.is_complete;
    if (req.body.due_date) updatedTodo.due_date = req.body.due_date;

    const todo = await Todo.updateTodo(req.params.id, updatedTodo);
    if (!todo) {
      res.status(404).send({ error: "Todo not found" });
    } else {
      res.send(todo);
    }
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).send({ error: "Error updating todo" });
  }
});

// DELETE todo
router.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.deleteTodo(req.params.id);
    if (!deletedTodo) {
      res.status(404).send({ error: "Todo not found" });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).send({ error: "Error deleting todo" });
  }
});

module.exports = router;
