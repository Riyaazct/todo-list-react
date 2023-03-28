const express = require("express");
const app = express();
const port = process.env.PORT || 3100;

app.use(express.json());

const dummyData = [
  {
    task: "Clean my room",
  },
  {
    task: "Wash the car",
  },
  {
    task: "Study some JavaScript",
  },
  {
    task: "Work on my projects",
  },
  {
    task: "go to gym",
  },
  {
    task: "Go for a run",
  },
  {
    task: "Pray",
  },
];

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.get("/api/data", (req, res) => {
  res.json(dummyData);
});

app.listen(port, () => {
  console.log(
    `App is listening on port ${port} Ready to accept requests`
  );
});
