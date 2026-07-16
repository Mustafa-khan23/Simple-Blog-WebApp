const express = require("express");
const path = require("path");
const PORT = 3000;
const app = express();
let blogContent = require("./blogs.json");
let name;
for (let blogs of blogContent) {
  name = blogs.author;
}

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/images", express.static(path.join(__dirname, "public", "images")));
  //routes

  app.get("/", (req, res) => {
    res.render("landing", { name });
  });

app.post("/", (req, res) => {
  console.log(req.body);
});

app.get("/blogs", (req, res) => {
  res.render("blogs.ejs", { blogContent });
});

//server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
