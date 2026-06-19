const express = require("express");
const getCarDetailsController = require("../controllers/get_car_details_controller");

const getCarDetailsRouter = express.Router();

getCarDetailsRouter.get(
    "/cars/:carId",
    getCarDetailsController
);

module.exports = getCarDetailsRouter;