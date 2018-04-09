const { Job, Company } = require("../models");

function readJobs(req, res, next) {
  Job.find({})
    .then(jobs => {
      return res.json({ data: jobs });
    })
    .catch(err => {
      console.log(err);
    });
}

function createJob(req, res, next) {
  const newJob = new Job(req.body);
  Company.find({ _id: newJob.company }, function(err, docs) {
    if (!docs.length) {
      return next("Company doesn't exist");
    } else {
      newJob
        .save()
        .then(job => {
          return res.json({ data: job });
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
}

function readJob(req, res, next) {
  Job.findById(req.params.jobId)
    .then(job => {
      return res.json({ data: job });
    })
    .catch(err => {
      console.log("Error finding job.", err);
    });
}

function updateJob(req, res, next) {
  Job.findByIdAndUpdate(req.params.jobId, req.body)
    .then(job => {
      return res.redirect(`/jobs/${req.params.jobId}`);
    })
    .catch(err => {
      console.log("Error editing job.", err);
    });
}

function deleteJob(req, res, next) {
  Job.findByIdAndRemove(req.params.jobId)
    .then(inst => {
      console.log("Job removed");
      return res.redirect("/jobs");
    })
    .catch(err => {
      console.log("Error deleting job", err);
    });
}

module.exports = {
  readJobs,
  createJob,
  updateJob,
  deleteJob,
  readJob
};
