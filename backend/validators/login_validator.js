const loginSchema = require("../schemas/login_schema");
const runValidator = require("../validators/run_validator");

const loginValidator = runValidator(loginSchema);

module.exports = loginValidator;
