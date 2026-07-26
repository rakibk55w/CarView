const express = require("express");
const authChecker = require("../middlewares/auth_checker");
const uploadImage = require("../middlewares/image_uploader");
const uploadCarImageController = require("../controllers/upload_car_image_controller");

const uploadCarImageRouter = express.Router();

uploadCarImageRouter.post(
    "/cars/:carId/images",
    authChecker,
    uploadImage.array("images", 5),
    uploadCarImageController
);

module.exports = uploadCarImageRouter;