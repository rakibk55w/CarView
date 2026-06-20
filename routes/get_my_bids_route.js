const express = require("express");
const authChecker = require("../middlewares/auth_checker");
const getMyBidsController = require("../controllers/get_my_bids_controller");

const getMyBidsRouter = express.Router();

getMyBidsRouter.get(
    "/my-bids",
    authChecker,
    getMyBidsController
);

module.exports = getMyBidsRouter;