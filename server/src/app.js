const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

const isDevelopment = process.env.NODE_ENV === "development";

// Require Routes
const index = require("./routes/index");
const tasksRoute = require("./routes/tasks.routes");
const authRoute = require("./routes/auth.routes");
const userRoute = require("./routes/user.routes");

app.use(express.json());

app.use(
  cors({
    origin: isDevelopment
      ? "http://localhost:3000"
      : "https://todo-list-react-two-black.vercel.app",
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

// Require Routes
app.use("/api", index);
app.use("/api/auth", authRoute);
app.use("/api", userRoute);
app.use("/api/tasks", tasksRoute);

module.exports = app;
