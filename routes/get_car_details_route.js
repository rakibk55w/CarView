const express = require("express");
const authChecker = require("../middlewares/auth_checker");
const getCarDetailsController = require("../controllers/get_car_details_controller");

const getCarDetailsRouter = express.Router();

getCarDetailsRouter.get(
    "/:carId",
    authChecker,
    getCarDetailsController
);

module.exports = getCarDetailsRouter;