const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
const password = process.env.Password;

function ensureUser(req, res, next) {
  const headerToken =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  const token = headerToken;
  if (!token) return false;
  else if (jwt.decode(token).username) {
    return TokenCheck(req, res, next);
  } else {
    res.send("sign in as a User, not a Company");
  }
}

function ensureCompany(req, res, next) {
  const headerToken =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  const token = headerToken;
  if (!token) return false;
  else if (jwt.decode(token)) {
    return TokenCheck(req, res, next);
  } else {
    res.send("sign in as a company, not a user");
  }
}

function TokenCheck(req, res, next) {
  const headerToken =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  const token = headerToken;
  if (token) {
    jwt.verify(token, password, (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid Token" });
      } else {
        req.decoded = decoded;
        if (req.params.username) {
          if (req.decoded.username === req.params.username) {
            return next();
          } else {
            res.send("Incorrect User");
          }
        } else if (req.params.handle) {
          if (req.decoded.handle === req.params.handle) {
            return next();
          } else {
            res.send("Incorrect Company");
          }
        }
        return next();
      }
    });
  } else {
    return res.status(401).json({ message: "No token provided." });
  }
}

exports.ensureUser = ensureUser;
exports.ensureCompany = ensureCompany;
exports.TokenCheck = TokenCheck;

// gets token from header
// jwt.verify
// if required_part, checks for decoded[required_part]
// calls next or next-for-error

// call like :
// authenticate(..., ["handle"])
// authenticate(..., ["username"])
// authenticate(..., ["handle", "usename"])         // don't check either
//
