const runValidator = require("./run_validator");
const createAuctionSchema = require("../schemas/create_auction_schema");

const createAuctionValidator = runValidator(createAuctionSchema);

module.exports = createAuctionValidator;