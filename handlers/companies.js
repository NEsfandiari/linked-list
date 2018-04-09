const { Company } = require("../models");
const Validator = require("jsonschema").Validator;
const v = new Validator();
const { newCompanySchema } = require("../schemas");

function readCompanys(req, res, next) {
  Company.find({})
    .then(companies => {
      return res.json({ data: companies });
    })
    .catch(err => {
      console.log(err);
    });
}

function createCompany(req, res, next) {
  if (
    req.body.logo === undefined ||
    req.body.logo.match(/\.(jpeg|jpg|gif|png)$/) != null
  ) {
    const result = v.validate(req.body, newCompanySchema);
    if (!result.valid) {
      const errors = result.errors.map(e => e.message).join(", ");
      return next({ message: errors });
    }
    const newCompany = new Company(req.body);
    newCompany
      .save()
      .then(company => {
        return res.json({ data: company });
      })
      .catch(err => {
        console.log(err);
      });
  } else res.send("invalid logo url");
}

function readCompany(req, res, next) {
  Company.findOne({ handle: req.params.handle })
    .populate("employees")
    .populate("jobs")
    .exec()
    .then(company => {
      return res.json({ data: company });
    })
    .catch(err => {
      console.log("Error finding company.", err);
    });
}

function updateCompany(req, res, next) {
  if (
    req.body.logo === undefined ||
    req.body.logo.match(/\.(jpeg|jpg|gif|png)$/) != null
  ) {
    const result = v.validate(req.body, newCompanySchema);
    if (!result.valid) {
      const errors = result.errors.map(e => e.message).join(", ");
      return next({ message: errors });
    }
    Company.findOneAndUpdate({ handle: req.params.handle }, req.body)
      .then(company => {
        return res.redirect(`/companies/${company.handle}`);
      })
      .catch(err => {
        console.log("Error editing company.", err);
      });
  } else res.send("invalid logo url");
}

function deleteCompany(req, res, next) {
  Company.findOneAndRemove({ handle: req.params.handle })
    .then(inst => {
      console.log("Company removed");
      return res.redirect("/companies");
    })
    .catch(err => {
      console.log("Error deleting company", err);
    });
}

module.exports = {
  readCompanys,
  createCompany,
  updateCompany,
  deleteCompany,
  readCompany
};
