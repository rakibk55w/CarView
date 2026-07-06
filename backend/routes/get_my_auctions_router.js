const express = require("express");
const authChecker = require("../middlewares/auth_checker");
const getMyAuctionsController = require("../controllers/get_my_auctions_controller");

const getMyAuctionsRouter = express.Router();

getMyAuctionsRouter.get(
    "/my-auctions",
    authChecker,
    getMyAuctionsController
);

module.exports = getMyAuctionsRouter;