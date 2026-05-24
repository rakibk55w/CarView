const updateProfileSchema = require("../validators/schemas/update_profile_schema");
const runValidator = require("../validators/run_validator");

const updateProfileValidator = runValidator(updateProfileSchema);

module.exports = updateProfileValidator;