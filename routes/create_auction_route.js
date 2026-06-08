const express = require("express");
const authChecker = require("../middlewares/auth_checker");
const createAuctionValidator = require("../validators/create_auction_validator");
const createAuctionController = require("../controllers/create_auction_controller");

const createAuctionRouter = express.Router();

createAuctionRouter.post(
    "/create-auction",
    authChecker,
    createAuctionValidator,
    createAuctionController
);

module.exports = createAuctionRouter;