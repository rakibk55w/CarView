const express = require("express");
const registerLimiter = require("../middlewares/limiters/register_limiter");
const registerValidator = require("../validators/register_validator");
const registerController = require("../controllers/register_controller")

const registerRouter = express.Router();

registerRouter.post("/register", registerLimiter, registerValidator, registerController);

module.exports = registerRouter;
