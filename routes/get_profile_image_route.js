const express = require("express");
const getProfileImageController = require("../controllers/get_profile_image_controller");
const authChecker = require("../middlewares/auth_checker");

const getProfileImageRouter = express.Router();

getProfileImageRouter.get(
    "/profile/image/:userId",
    authChecker,
    getProfileImageController
);

module.exports = getProfileImageRouter;