const express = require("express");
const getBidHistoryController = require("../controllers/get_bid_history_controller");

const getBidHistoryRouter = express.Router();

getBidHistoryRouter.get(
    "/auctions/:auctionId/bids",
    getBidHistoryController
);

module.exports = getBidHistoryRouter;