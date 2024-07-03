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

// app.use(
//   cors({
//     origin: isDevelopment
//       ? "http://localhost:3000"
//       : "https://todo-list-react-two-black.vercel.app",
//     credentials: true,
//   })
// );

const allowedOrigins = [
  "http://localhost:3000",
  "https://todo-list-react-two-black.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // This is important to allow cookies to be sent
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
