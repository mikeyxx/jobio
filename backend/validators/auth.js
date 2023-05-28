const { check } = require("express-validator");
const db = require("../db");
const bcrypt = require("bcryptjs");

const name = check("name").notEmpty().withMessage("Please add your name");

const email = check("email")
  .isEmail()
  .notEmpty()
  .normalizeEmail()
  .withMessage("Please enter a valid email address");

const emailExists = check("email").custom(async (value) => {
  const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
    value,
  ]);
  if (rows.length) {
    throw new Error("Email already exists");
  }
});

const password = check("password")
  .notEmpty()
  .isLength({ min: 6 })
  .withMessage("Password cannot be less than six characters");

const loginValidation = check("email").custom(async (value, { req }) => {
  const user = await db.query("select * from users where email = $1", [value]);
  if (!user.rows.length) {
    throw new Error("User is not registered");
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.rows[0].password
  );

  if (!isPasswordValid) {
    throw new Error("Wrong password");
  }

  req.user = user.rows[0];
});

module.exports = {
  registerValidation: [name, email, emailExists, password],
  loginValidation,
};
