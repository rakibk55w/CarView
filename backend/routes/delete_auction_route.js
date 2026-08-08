const express = require("express");
const authChecker = require("../middlewares/auth_checker");
const deleteAuctionController = require("../controllers/delete_auction_controller");

const deleteAuctionRouter = express.Router();

deleteAuctionRouter.delete(
    "/auctions/:auctionId",
    authChecker,
    deleteAuctionController
);

module.exports = deleteAuctionRouter;