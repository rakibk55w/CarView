const runValidator = require("./run_validator");
const createCarSchema = require("../schemas/create_car_schema");

const createCarValidator = runValidator(createCarSchema);

module.exports = createCarValidator;
