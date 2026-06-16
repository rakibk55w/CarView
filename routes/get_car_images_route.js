const express = require("express");
const getCarImagesController = require("../controllers/get_car_images_controller");
const authChecker = require("../middlewares/auth_checker");

const getCarImagesRouter = express.Router();

getCarImagesRouter.get(
    "/cars/:carId/images",
    authChecker,
    getCarImagesController
);

module.exports = getCarImagesRouter;