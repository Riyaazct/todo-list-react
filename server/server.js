const express = require("express");
const app = express();
const port = process.env.PORT || 3100;

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(
    `App is listening on port ${port} Ready to accept requests`
  );
});
