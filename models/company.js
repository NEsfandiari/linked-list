const mongoose = require("mongoose");
const immutablePlugin = require("mongoose-immutable");

const bcrypt = require("bcrypt");

const companiesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 1,
      maxlength: 55,
      required: true,
      immutable: true
    },
    email: {
      type: String,
      minlength: 1,
      maxlength: 55,
      required: true
    },
    handle: {
      type: String,
      minlength: 1,
      maxlength: 55,
      required: true
    },
    password: {
      type: String,
      minlength: 1,
      maxlength: 55,
      required: true
    },
    logo: String,
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
      }
    ]
  },
  {
    timestamps: true
  }
);

companiesSchema.methods.comparePassword = function(candidatePassword, next) {
  return bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return next(err);
    }
    return next(null, isMatch);
  });
};

companiesSchema.pre("save", function(next) {
  const company = this;
  return bcrypt
    .hash(company.password, 10)
    .then(hashedPassword => {
      company.password = hashedPassword;
      return next();
    })
    .catch(err => {
      return next(err);
    });
});

companiesSchema.post("findOneAndRemove", company => {
  let User = mongoose.model("User");
  User.updateMany(
    { currentCompany: company._id },
    { currentCompany: null }
  ).then(() => {
    console.log("POST HOOK Users");
  });
  let Job = mongoose.model("Job");
  Job.remove({ company: company._id }).then(() => {
    console.log("POST HOOK Jobs");
  });
});

companiesSchema.plugin(immutablePlugin);

module.exports = mongoose.model("Company", companiesSchema);
