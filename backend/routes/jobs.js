const express = require("express");
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");
const { jobsFieldValidator } = require("../validators/job");
const {
  validationMiddleware,
} = require("../middlewares/validation-middleware");

const { userAuth } = require("../middlewares/auth-middleware");

router.post(
  "/create",
  userAuth,
  jobsFieldValidator,
  validationMiddleware,
  createJob
);
router.get("/", getAllJobs);
router.get("/:id", getSingleJob);
router.patch(
  "/update/:id",
  userAuth,
  jobsFieldValidator,
  validationMiddleware,
  updateJob
);
router.delete("/:id", userAuth, deleteJob);

module.exports = router;
