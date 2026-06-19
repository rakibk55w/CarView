const express = require("express");
const getCarImagesController = require("../controllers/get_car_images_controller");

const getCarImagesRouter = express.Router();

getCarImagesRouter.get(
    "/cars/:carId/images",
    getCarImagesController
);

module.exports = getCarImagesRouter;