const profileRouter = require("express").Router();
const profileController = require("../controllers/profile_controller");
const authChecker = require("../middlewares/auth_checker");

profileRouter.get("/profile", authChecker, profileController);

module.exports = profileRouter;