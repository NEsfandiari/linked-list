const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: String,
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company"
    },
    salary: Number,
    equity: Number
  },
  {
    timestamps: true
  }
);

jobSchema.post("save", job => {
  let Company = mongoose.model("Company");
  Company.findOneAndUpdate(job.company, {
    $addToSet: {
      jobs: job._id
    }
  }).then(() => {
    console.log("POST HOOK RAN");
  });
});
jobSchema.post("findByIdAndUpdate", job => {
  let Company = mongoose.model("Company");
  Company.findOneAndUpdate(job.company, {
    $pull: { jobs: job._id }
  }).then(() => {
    console.log("POST HOOK RAN");
  });
});

jobSchema.post("findOneAndRemove", job => {
  let Company = mongoose.model("Company");
  Company.findOneAndUpdate(job.company, {
    $pull: { jobs: job._id }
  }).then(() => {
    console.log("POST HOOK RAN");
  });
});

module.exports = mongoose.model("Job", jobSchema);
