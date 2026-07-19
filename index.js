const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const fs = require("fs");
const PORT = 3000;
const app = express();
let blogContent = require("./data/blogs.json");
const name = blogContent[0]?.author || "Blog";

// middlewares
app.use(methodOverride("_method"));
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
    return res.redirect("./data/blogs.json");
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
  fs.writeFileSync("./data/blogs.json", JSON.stringify(blogContent, null, 2));
  res.redirect("/blogs");
});

app.get("/blogs/:id/edit", (req, res) => {
  const id = Number(req.params.id);
  const blog = blogContent.find((item) => item.id === id);
  if (!blog) {
    return res.redirect("/blogs");
  }
  res.render("edit.ejs", { blogContent, blog });
});

app.patch("/blogs/:id", (req, res) => {
  const id = Number(req.params.id);
  const blog = blogContent.find((item) => item.id === id);
  blog.title = req.body.title;
  blog.author = req.body.author;
  blog.content = req.body.content;
  fs.writeFileSync(
    path.join("./data/blogs.json"),
    JSON.stringify(blogContent, null, 2),
  );
  res.redirect("/blogs");
});

app.delete("/blogs/:id", (req, res) => {
  const id = Number(req.params.id);
  const blog = blogContent.find((item) => item.id === id);
  blogContent = blogContent.filter((blog) => {
    return blog.id !== id;
  });
  fs.writeFileSync("./data/blogs.json", JSON.stringify(blogContent, null, 2));
  res.redirect("/blogs");
});

app.get("/blogs/:id/update", (req, res) => {
  const id = Number(req.params.id);
  const blog = blogContent.find((item) => item.id === id);
  res.render("update.ejs", { blog });
});
app.put("/blogs/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = blogContent.find((item) => item.id === id);

  if (index === -1) {
    return res.redirect("/blogs/:id");
  }

  const updatedBlog = {
    id: id,
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
  };

  blogContent[index] = updatedBlog;
  fs.writeFileSync("./data/blogs.json", JSON.stringify(blogContent, null, 2));
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
