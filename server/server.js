const port = process.env.PORT || 3100;

const app = require("./src/app");

app.get("/", (req, res) => {
  res.send("API running on port: " + port);
});

app.listen(port, () =>
  console.log(
    `Server is listening on port ${port}, ready to accept requests!`
  )
);
