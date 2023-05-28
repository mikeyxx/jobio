const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/auth");
const { registerValidation, loginValidation } = require("../validators/auth");
const {
  validationMiddleware,
} = require("../middlewares/validation-middleware");

router.post("/register", registerValidation, validationMiddleware, register);

router.post("/login", loginValidation, validationMiddleware, login);

router.get("/logout", logout);

module.exports = router;
