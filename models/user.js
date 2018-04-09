const mongoose = require("mongoose");
const immutablePlugin = require("mongoose-immutable");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: 1,
      maxlength: 55,
      required: true
    },
    lastName: {
      type: String,
      minlength: 1,
      maxlength: 55,
      required: true
    },
    username: {
      type: String,
      minlength: 1,
      maxlength: 55,
      immutable: true
    },
    email: {
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
    currentCompanyName: String,
    currentCompany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company"
    },
    photo: String,
    experience: [
      {
        jobTitle: String,
        companyName: String,
        startDate: Date,
        endDate: Date
      }
    ],
    education: [
      {
        institution: String,
        degree: String,
        endDate: Date
      }
    ],
    skills: []
  },
  {
    timestamps: true
  }
);

userSchema.methods.comparePassword = function(candidatePassword, next) {
  return bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return next(err);
    }
    return next(null, isMatch);
  });
};

userSchema.pre("save", function(next) {
  const user = this;
  return bcrypt
    .hash(user.password, 10)
    .then(hashedPassword => {
      user.password = hashedPassword;
      next();
    })
    .catch(err => {
      return next(err);
    });
});

userSchema.post("save", user => {
  let Company = mongoose.model("Company");
  Company.findOneAndUpdate(user.currentCompany, {
    $addToSet: { employees: user._id }
  }).then(() => {
    console.log("POST HOOK RAN");
  });
});

userSchema.post("findOneAndUpdate", user => {
  let Company = mongoose.model("Company");
  Company.findOneAndUpdate(user.currentCompany, {
    $addToSet: { employees: user._id }
  }).then(() => {
    console.log("POST HOOK RAN");
  });
});

userSchema.post("findOneAndRemove", user => {
  let Company = mongoose.model("Company");
  Company.findOneAndUpdate(user.currentCompany, {
    $pull: { employees: user._id }
  }).then(() => {
    console.log("POST HOOK RAN");
  });
});

module.exports = mongoose.model("User", userSchema);
