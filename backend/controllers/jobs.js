const db = require("../db");

exports.createJob = async (req, res) => {
  const {
    company_name,
    job_title,
    job_details,
    job_location,
    salary,
    job_type,
    status,
  } = req.body;
  const userId = req.user.id;
  try {
    await db.query(
      "INSERT INTO job (company_name, job_title, job_details, job_location, salary, job_type, status, user_uid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        company_name,
        job_title,
        job_details,
        job_location,
        salary,
        job_type,
        status,
        userId,
      ]
    );
    return res.status(201).json({ success: true, msg: "Job created" });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, error: error.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const { rows } = await db.query("select * from job");
    return res.status(200).json({ jobs: rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.getSingleJob = async (req, res) => {
  const { id: job_uid } = req.params;
  try {
    const { rows } = await db.query("select * from job where job_uid = $1", [
      job_uid,
    ]);
    return res.status(200).json({ job: rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateJob = async (req, res) => {
  const {
    body: {
      company_name,
      job_title,
      job_details,
      job_location,
      salary,
      job_type,
      status,
    },
    user: { id: userId },
    params: { id: job_uid },
  } = req;
  try {
    await db.query(
      "UPDATE job SET company_name = $1, job_title = $2, job_details = $3, job_location = $4, salary = $5, job_type = $6, status = $7 WHERE user_uid = $8 AND job_uid = $9",
      [
        company_name,
        job_title,
        job_details,
        job_location,
        salary,
        job_type,
        status,
        userId,
        job_uid,
      ]
    );
    return res.status(200).json({
      success: true,
      msg: `Job with id ${job_uid} was updated successfully`,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ success: false, msg: `Job with id ${job_uid} was not updated` });
  }
};

exports.deleteJob = async (req, res) => {
  const {
    user: { id: userId },
    params: { id: job_uid },
  } = req;
  try {
    await db.query("DELETE FROM job WHERE user_uid = $1 AND job_uid = $2", [
      userId,
      job_uid,
    ]);

    return res.status(200).json({
      success: true,
      msg: `Job with id ${job_uid} was deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ success: false, msg: `Job with id ${job_uid} was not deleted` });
  }
};
