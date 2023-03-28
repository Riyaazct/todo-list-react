const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3100;

app.use(express.json());
app.use(cors());

let tasks = [
  {
    id: 1,
    task: "Clean my room",
  },
  {
    id: 2,
    task: "Wash the car",
  },
  {
    id: 3,
    task: "Study some JavaScript",
  },
  {
    id: 4,
    task: "Work on my projects",
  },
  {
    id: 5,
    task: "go to gym",
  },
  {
    id: 6,
    task: "Go for a run",
  },
  {
    id: 7,
    task: "Pray",
  },
  {
    id: 8,
    task: "read",
  },
  {
    id: 9,
    task: "walk",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});
//GET ALL DATA
app.get("/api/data", (req, res) => {
  res.json(tasks);
});

// GET BY ID
app.get("/api/data/:id", (req, res) => {
  let taskId = parseInt(req.params.id);
  res.send(tasks.find((elem) => elem.id === taskId));
});

// //DELETE
app.delete("/api/data/:id", (req, res) => {
  let taskId = parseInt(req.params.id);
  let found = tasks.some((task) => task.id === taskId);
  if (found) {
    res.json((tasks = tasks.filter((item) => item.id !== taskId)));
  } else {
    res.status(404).json({ msg: `No task with id ${taskId} found` });
  }
});

app.listen(port, () => {
  console.log(
    `App is listening on port ${port} Ready to accept requests`
  );
});
