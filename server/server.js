const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3100;
const { v4: uuidv4 } = require("uuid");

app.use(express.json());
app.use(cors());

let tasks = require("./data/tasks.json");

app.get("/", (req, res) => {
  res.send("Hello World");
});
//GET ALL DATA FOR DATA STORED IN MEMORY ON API
app.get("/api/data", (req, res) => {
  res.json(tasks);
});

// GET  TASK BY ID FOR DATA STORED IN MEMORY ON API
app.get("/api/data/:id", (req, res) => {
  let taskId = parseInt(req.params.id);
  const found = tasks.find((task) => task.id === taskId);
  if (found) {
    res.send(tasks.filter((item) => item.id === taskId));
  } else {
    res.status(404).json({ msg: `No task with id ${taskId} found` });
  }
});

// //DELETE FOR DATA STORED IN MEMORY ON API
app.delete("/api/data/:id", (req, res) => {
  let taskId = parseInt(req.params.id);
  let found = tasks.some((task) => task.id === taskId);
  if (found) {
    res.json((tasks = tasks.filter((item) => item.id !== taskId)));
  } else {
    res.status(404).json({ msg: `No task with id ${taskId} found` });
  }
});

//CREATE NEW TODO FOR DATA STORED IN MEMORY ON API
app.post("/api/data", (req, res) => {
  const id = tasks.length - 1;
  const task = req.body.task;
  const newTask = { id, task };

  if (task === "") {
    return res.status(400).send("Task could not be saved");
  } else {
    tasks.push(newTask);
    res.send(tasks);
    console.log(
      `Task "${newTask.task}" with id:${newTask.id} created successfully!`
    );
  }
});

// EDIT A TODO FOR DATA STORED IN MEMORY ON API
app.put("/api/data/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    const updatedTask = {
      id: taskId,
      task: req.body.task,
    };
    tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
  } else {
    res.status(404).json({ msg: `No task with id ${taskId} found` });
  }
});

app.listen(port, () => {
  console.log(
    `App is listening on port ${port} Ready to accept requests`
  );
});
