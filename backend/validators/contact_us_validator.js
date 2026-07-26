const runValidator = require("./run_validator");
const contactUsSchema = require("../schemas/contact_us_schema");

const contactUsValidator = runValidator(contactUsSchema);

module.exports = contactUsValidator;
