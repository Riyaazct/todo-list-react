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

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "Todos-session",
    keys: [process.env.COOKIE_SECRET],
    httpOnly: true,
  })
);

app.use("/api", index);
app.use("/api/tasks", tasksRoute);
app.use("/api/auth", authRoute);
