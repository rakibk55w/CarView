const runValidator = require("./run_validator");
const createBidSchema = require("../schemas/create_bid_schema");

const createBidValidator = runValidator(createBidSchema);

module.exports = createBidValidator;