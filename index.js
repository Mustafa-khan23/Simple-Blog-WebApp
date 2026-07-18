const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = 3000;
const app = express();
const blogContent = require("./blogs.json");
const name = blogContent[0]?.author || "Blog";

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/images", express.static(path.join(__dirname, "public", "images")));

// routes
app.get("/", (req, res) => {
  res.render("landing", { name });
});

app.get("/blogs", (req, res) => {
  res.render("blogs.ejs", { blogContent, name });
});

app.get("/blogs/:id", (req, res) => {
  const id = Number(req.params.id);
  const blog = blogContent.find((item) => item.id === id);
  if (!blog) {
    return res.redirect("/blogs");
  }
  res.render("details.ejs", { name, id, blogContent, blog });
});

app.get("/create", (req, res) => {
  res.render("createBlog.ejs");
});

app.post("/create", (req, res) => {
  const { username, blogContent: blogText, title } = req.body;
  const newId = Math.max(...blogContent.map((blog) => blog.id)) + 1;
  const newBlog = {
    id: newId,
    title: title,
    author: username,
    content: blogText,
  };
  blogContent.push(newBlog);
  fs.writeFileSync("blogs.json", JSON.stringify(blogContent, null, 2));
  res.redirect("/blogs");
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
