const express = require("express");
const authChecker = require("../middlewares/auth_checker");
const createBidController = require("../controllers/create_bid_controller");
const createBidValidator = require("../validators/create_bid_validator");

const createBidRouter = express.Router();

createBidRouter.post(
    "/create-bid",
    authChecker,
    createBidValidator,
    createBidController
);

module.exports = createBidRouter;