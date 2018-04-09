const { User } = require("../models");
const jwt = require("jsonwebtoken");
const SECRET = process.env.Password;
const Validator = require("jsonschema").Validator;
const v = new Validator();
const { newUserSchema } = require("../schemas");

const { authenticate, TokenCheck } = require("./auth");

function readUsers(req, res, next) {
  User.find({})
    .then(users => {
      return res.json({ data: users });
    })
    .catch(err => {
      console.log(err);
    });
}

function createUser(req, res, next) {
  if (
    req.body.photo === undefined ||
    req.body.photo.match(/\.(jpeg|jpg|gif|png)$/) != null
  ) {
    const result = v.validate(req.body, newUserSchema);
    if (!result.valid) {
      const errors = result.errors.map(e => e.message).join(", ");
      return next({ message: errors });
    }
    const newUser = new User(req.body);
    newUser
      .save()
      .then(user => {
        return res.json({ data: user });
      })
      .catch(err => {
        console.log(err);
      });
  } else res.send("invalid photo url");
}

function readUser(req, res, next) {
  if (req.params.username === "login") {
    return next();
  }
  User.findOne({ username: req.params.username })
    .then(user => {
      return res.json({ data: user });
    })
    .catch(err => {
      console.log("Error finding user.", err);
    });
}

function updateUser(req, res, next) {
  if (
    req.body.photo === undefined ||
    req.body.photo.match(/\.(jpeg|jpg|gif|png)$/) != null
  ) {
    const result = v.validate(req.body, newUserSchema);
    if (!result.valid) {
      const errors = result.errors.map(e => e.message).join(", ");
      return next({ message: errors });
    }
    User.findOneAndUpdate({ username: req.params.username }, req.body)
      .then(user => {
        return res.redirect(`/users/${req.params.username}`);
      })
      .catch(err => {
        console.log("Error editing user.", err);
      });
  } else res.send("invalid photo url");
}

function deleteUser(req, res, next) {
  User.findOneAndRemove({ username: req.params.username })
    .then(inst => {
      console.log("User removed");
      return res.redirect("/users");
    })
    .catch(err => {
      console.log("Error deleting user", err);
    });
}

module.exports = {
  readUsers,
  createUser,
  updateUser,
  deleteUser,
  readUser
};
