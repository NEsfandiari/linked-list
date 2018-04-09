const express = require("express");
const router = express.Router();
const { companyHandlers } = require("../handlers");
const { ensureCompany, ensureUser, TokenCheck } = require("../handlers/auth");

router
  .route("/")
  .get(TokenCheck, companyHandlers.readCompanys)
  .post(companyHandlers.createCompany);

router
  .route("/:handle")
  .get(ensureUser, companyHandlers.readCompany)
  .patch(ensureCompany, companyHandlers.updateCompany)
  .delete(ensureCompany, companyHandlers.deleteCompany);

module.exports = router;
