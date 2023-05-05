const mongoose = require("mongoose");
const Entry = require("./models/entry");

mongoose
  .connect("mongodb://localhost:27017/info", { useNewUrlParser: true })
  .then(() => {
    console.log(`mongo connected`);
  })
  .catch((e) => {
    console.log("connection error");
    console.log(e);
  });
  
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

Entry.insertMany(currentInfo)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
