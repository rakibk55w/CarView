const express = require("express");
const authChecker = require("../middlewares/auth_checker");
const getMyCarsController = require("../controllers/get_my_cars_controller");

const getMyCarsRouter = express.Router();

getMyCarsRouter.get(
    "/my-cars",
    authChecker,
    getMyCarsController
);

module.exports = getMyCarsRouter;