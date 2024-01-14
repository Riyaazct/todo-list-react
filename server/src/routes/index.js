const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({
    success: "true",
    message:
      "Welcome to the the todoList API with NodeJs + PostgreSQL and React.Js!",
    version: "1.0.0",
  });
});

module.exports = router;
