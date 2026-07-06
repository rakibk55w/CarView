const updatePasswordSchema = require("../validators/schemas/update_Password_schema");
const runValidator = require("../validators/run_validator");

const updatePasswordValidator = runValidator(updatePasswordSchema);

module.exports = updatePasswordValidator;