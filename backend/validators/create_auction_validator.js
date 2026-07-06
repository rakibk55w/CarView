const runValidator = require("./run_validator");
const createAuctionSchema = require("./schemas/create_car_schema");

const createAuctionValidator = runValidator(createAuctionSchema);

module.exports = createAuctionValidator;