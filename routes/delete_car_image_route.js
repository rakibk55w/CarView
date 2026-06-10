const express = require("express");
const authChecker = require("../middlewares/auth_checker");
const deleteCarImageController = require("../controllers/delete_car_image_controller");

const deleteCarImageRouter = express.Router();

deleteCarImageRouter.delete(
    "/car-images/:imageId",
    authChecker,
    deleteCarImageController
);

module.exports = deleteCarImageRouter;