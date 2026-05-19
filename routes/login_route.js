const express = require("express");
const loginRouter = express.Router();
const loginValidator = require("../validators/login_validator");
const loginController = require("../controllers/login_controller");

loginRouter.post("/login", loginValidator, loginController);

module.exports = loginRouter;