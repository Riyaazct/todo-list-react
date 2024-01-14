const express = require("express");

const app = express();

// Require Routes
const index = require("./routes/index");
const tasksRoute = require("./routes/tasks");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", index);
app.use("api/tasks", tasksRoute);
