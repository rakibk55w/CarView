const express = require("express");
const registerValidator = require("../validators/register_validator");
const registerController = require("../controllers/register_controller")

const registerRouter = express.Router();

registerRouter.post("/register", registerValidator, registerController);

module.exports = registerRouter;
