const express = require("express");
const router = express.Router();
const { jobHandlers } = require("../handlers");
const { ensureUser, ensureCompany, TokenCheck } = require("../handlers/auth");

router
  .route("/")
  .get(ensureUser, jobHandlers.readJobs)
  .post(ensureCompany, jobHandlers.createJob);
router
  .route("/:jobId")
  .get(ensureUser, jobHandlers.readJob)
  .patch(ensureCompany, jobHandlers.updateJob)
  .delete(ensureCompany, jobHandlers.deleteJob);

module.exports = router;
