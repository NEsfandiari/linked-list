const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { User, Company } = require("./models");
const { usersRouter, jobsRouter, companiesRouter } = require("./routers");
const bodyParser = require("body-parser");

const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
const password = process.env.Password;

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "*/*" }));

mongoose.Promise = Promise;
mongoose.set("debug", true);
mongoose
  .connect(
    "mongodb://heroku_7vlg5cpt:iajpmpopnlm8l6movsr17j4h21@ds241059.mlab.com:41059/heroku_7vlg5cpt" ||
      "mongodb://localhost/Linked-List",
    {
      useMongoClient: true
    }
  )
  .then(() => {
    console.log("Connected to db");
  })
  .catch(err => {
    console.log(err);
  });

app.use;

app.use("/users", usersRouter);
app.use("/jobs", jobsRouter);
app.use("/companies", companiesRouter);

app.get("/", (req, res, next) => {
  return res.send("start by posting to /users to get authed");
});

app.post("/:x/login", function Authenticate(req, res, next) {
  if (req.params.x === "users") {
    User.findOne({ username: req.body.username }).then(user => {
      if (!user) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }
      user.comparePassword(req.body.password, function next(err, isMatch) {
        if (isMatch) {
          const token = jwt.sign({ username: user.username }, password, {
            expiresIn: 60 * 60
          });
          return res.json({
            message: "Authenticated!",
            token
          });
        } else {
          return res.json("invalid credentials");
        }
      });
    });
  }
  if (req.params.x === "companies") {
    Company.findOne({ handle: req.body.handle }).then(company => {
      if (!company) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }
      company.comparePassword(req.body.password, function next(err, isMatch) {
        if (isMatch) {
          const token = jwt.sign({ handle: company.handle }, password, {
            expiresIn: 60 * 60
          });
          return res.json({
            message: "Authenticated!",
            token
          });
        } else {
          return res.json("invalid credentials");
        }
      });
    });
  }
});

app.use((err, req, res, next) =>
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  })
);

const PORT = process.env.PORT || 7777;

app.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});
