const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Entry = require("./models/entry");

mongoose
  .connect("mongodb://localhost:27017/info", { useNewUrlParser: true })
  .then(() => {
    console.log("mongo connected");
  })
  .catch((e) => {
    console.log("connection to mongo error");
    console.log(e);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", `ejs`);

app.use(express.urlencoded({ extended: true })); //tells app to expect data coming in from url params
app.use(methodOverride("_method")); //enables PUT and DELETE methods (client does not support by default)

app.get("/", async (req, res) => {
  const info = await Entry.find();
  res.render("home", { data: info });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/new", async (req, res) => {
  const { info, date } = req.body;
  console.log(req.body);
  const newEntry = new Entry({ ...req.body, comments: [] });
  await newEntry.save();
  console.log(newEntry);
  res.redirect("/");
});

app.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const data = await Entry.findById(id);
  res.render(`edit`, { data });
});

app.put("/:id/edit", async (req, res) => {
  const { id } = req.params;
  await Entry.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/${id}`);
});

app.get("/:id/view", async (req, res) => {
  const { id } = req.params;
  const entry = await Entry.findById(id);
  res.render("view", { data: entry });
});

app.post("/:id/view", async (req, res) => {
  const { id } = req.params;
  const newComment = req.body;
  const entry = await Entry.findById(id);
  const comments = [...entry.comments, newComment.newComment];
  await Entry.findByIdAndUpdate(
    id,
    { comments },
    {
      runValidators: true,
      new: true,
    }
  );
  res.redirect(`/${id}/view`);
});

// app.put("/:id/view", async(req, res)=>{
//     const {id}= req.params;
//     const entry = await Entry.findById(id);
//     console.log(req.body);
//     res.render(`view`, {data: entry});
// }) //edit/remove comments

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const entry = await Entry.findById(id);
  res.render(`view`, { data: entry });
});

app.delete("/:id/edit", (req, res) => {
  const { id } = req.params;
  Entry.findByIdAndDelete(id);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("listening");
});
