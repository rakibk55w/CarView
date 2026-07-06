const express = require("express");
const authChecker = require("../middlewares/auth_checker");
const deleteProfileImageController = require("../controllers/delete_profile_image_controller");

const deleteProfileImageRouter = express.Router();

deleteProfileImageRouter.delete(
    "/profile/delete-image",
    authChecker,
    deleteProfileImageController
);

module.exports = deleteProfileImageRouter;