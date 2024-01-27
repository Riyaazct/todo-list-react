const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Require Routes
const index = require("./routes/index");
const tasksRoute = require("./routes/tasks");
const authRoute = require("./routes/");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", index);
app.use("api/tasks", tasksRoute);
