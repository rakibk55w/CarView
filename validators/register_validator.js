const Joi = require("joi");
const runValidator = require("./run_validator");
const registerSchema = require("./schemas/register_schema");

const registerValidator = runValidator(registerSchema);

module.exports = registerValidator;
