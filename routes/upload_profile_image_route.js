const express = require("express");
const authChecker = require("../middlewares/auth_checker");
const uploadImage = require("../middlewares/image_uploader");
const uploadProfileImageController = require("../controllers/upload_profile_image_controller");

const uploadProfileImageRouter = express.Router();

uploadCarImageRouter.post(
    "/profile/upload-images",
    authChecker,
    uploadImage.single("image"),
    uploadProfileImageController
);

module.exports = uploadProfileImageRouter;