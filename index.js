const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Entry = require('./models/entry');

mongoose
  .connect("mongodb://localhost:27017/farmStand", { useNewUrlParser: true })
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

let currentInfo = [
  {
    id: 1,
    date: "2023/03/18",
    info: "remember to complete CRUD section",
    comments: ["haha lol", "ok mum i will do it graciously", "working on it"],
  },
  {
    id: 2,
    date: "2023/02/28",
    info: "apply to jobs",
    comments: ["oh gawd", `there are no jobs out there`],
  },
  { id: 3, date: "2023/03/25", info: "sign up for midweek", comments: [] },
];

app.get("/", (req, res) => {
  res.render("home", { data: currentInfo });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/new", (req, res) => {
  const { info, date } = req.body;
  const newEntry = {
    info,
    date,
    id: currentInfo.length + 1,
    comments: [],
  };
  currentInfo = [...currentInfo, newEntry];
  //save data to db
  res.redirect("/");
});

app.get("/:id/edit", (req, res) => {
  const { id } = req.params;
  const data = currentInfo.find((info) => info.id === parseInt(id));
  res.render(`edit`, { data });
});

app.put("/:id/edit", (req, res) => {
  const { id } = req.params;
  const { info } = req.body;
  const oldEntry = currentInfo.find((entry) => entry.id === parseInt(id));
  console.log(`old entry is: ${oldEntry}`);
  const newEntry = {
    id: parseInt(id),
    info,
    date: oldEntry.date,
    comments: oldEntry.comments,
  };
  console.log(`new entry is: ${newEntry}`);
  otherInfo = currentInfo.filter((entry) => entry.id !== parseInt(id));
  currentInfo = [...otherInfo, newEntry];

  console.log(`line 81 currentInfo is: ${currentInfo}`);
  res.redirect(`/${id}`);
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  currentInfo.forEach((entry) => console.log(entry.id + " " + typeof entry.id));
  const entry = currentInfo.find((entry) => entry.id === parseInt(id));
  console.log(`found entry is ${entry}`);
  res.render(`view`, { data: entry });
});

app.delete("/:id/edit", (req, res) => {
  const { id } = req.params;
  console.log(id);
  currentInfo = currentInfo.filter((entry) => entry.id !== parseInt(id));
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("listening");
});
