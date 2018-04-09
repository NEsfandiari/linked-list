const express = require("express");
const router = express.Router();
const { userHandlers } = require("../handlers");
const { ensureUser, TokenCheck } = require("../handlers/auth");

router
  .route("/")
  .get(ensureUser, userHandlers.readUsers)
  .post(userHandlers.createUser);
router
  .route("/:username")
  .get(ensureUser, userHandlers.readUser)
  .patch(ensureUser, userHandlers.updateUser)
  .delete(ensureUser, userHandlers.deleteUser);

module.exports = router;
