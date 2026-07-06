const express = require("express");
const loginRouter = express.Router();
const loginLimiter = require("../middlewares/limiters/login_limiter");
const loginValidator = require("../validators/login_validator");
const loginController = require("../controllers/login_controller");

loginRouter.post("/login", loginLimiter, loginValidator, loginController);

module.exports = loginRouter;