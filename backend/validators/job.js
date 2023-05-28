const { check } = require("express-validator");

const company_name = check("company_name")
  .notEmpty()
  .withMessage("Please provide the name of the hiring company");

const job_title = check("job_title")
  .notEmpty()
  .withMessage("Please provide a job title for the role");

const salary = check("salary")
  .isInt()
  .notEmpty()
  .withMessage("Please add a salary for the role");

const job_details = check("job_details")
  .notEmpty()
  .withMessage("You forgot to add more details about the job");

// const status = check("status")
//   .notEmpty()
//   .withMessage("What is the current status of the job?");

module.exports = {
  jobsFieldValidator: [company_name, job_title, salary, job_details],
};
