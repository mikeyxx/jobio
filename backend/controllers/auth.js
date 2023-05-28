const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "insert into users(name, email, password) values ($1, $2, $3)",
      [name, email, hashedPassword]
    );
    return res
      .status(201)
      .json({ success: true, msg: "User registeration successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.login = async (req, res) => {
  const user = req.user;
  const payload = {
    id: user.user_uid,
    name: user.name,
    email: user.email,
  };

  try {
    const token = jwt.sign(payload, process.env.SECRET);
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60,
      })
      .json({
        success: true,
        user: { name: payload.name, id: payload.id },
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token", { httpOnly: true })
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};
