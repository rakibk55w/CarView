const express = require("express");
const registerValidator = require("../validators/register_validator");
const registerSchema = require("../validators/schemas/register_schema");
const registerController = require("../controllers/register_controller")

const registerRouter = express.Router();

registerRouter.post("/register", registerValidator, registerController);

module.exports = registerRouter;
