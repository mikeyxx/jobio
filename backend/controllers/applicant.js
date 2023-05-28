const db = require("../db");

exports.createApplicant = async (req, res) => {
  const {
    params: { id: job_uid },
    body: { name, email, resume_link, cover_letter },
  } = req;
  try {
    await db.query(
      "INSERT INTO applicant (name, email, resume_link, cover_letter, job_uid) VALUES ($1, $2, $3, $4, $5)",
      [name, email, resume_link, cover_letter, job_uid]
    );

    return res.status(201).json({
      success: true,
      msg: "Your application has been successfully submitted!",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, msg: "Your application was not submitted" });
  }
};
