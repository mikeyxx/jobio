const express = require("express");
const router = express.Router();
const { createApplicant } = require("../controllers/applicant");

router.post("/:id", createApplicant);

module.exports = router;
