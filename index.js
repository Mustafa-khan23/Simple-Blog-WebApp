const express = require("express");
const path = require("path");
const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/post", (req, res) => {
  console.log(req.body);

  res.send(`Welcome ${req.body.username}`);
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
