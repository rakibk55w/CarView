const updatePasswordSchema = require("../schemas/update_password_schema");
const runValidator = require("../validators/run_validator");

const updatePasswordValidator = runValidator(updatePasswordSchema);

module.exports = updatePasswordValidator;
