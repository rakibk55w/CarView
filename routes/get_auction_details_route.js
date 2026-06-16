const express = require("express");
const getAuctionDetailsController = require("../controllers/get_auction_details_controller");

const getAuctionDetailsRouter = express.Router();

getAuctionDetailsRouter.get(
    "/auctions/:auctionId",
    getAuctionDetailsController
);

module.exports = getAuctionDetailsRouter;