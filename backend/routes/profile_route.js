const profileRouter = require("express").Router();
const profileLimiter = require("../middlewares/limiters/profile_limiter");
const profileController = require("../controllers/profile_controller");
const authChecker = require("../middlewares/auth_checker");

profileRouter.get("/profile/:userId", profileLimiter, authChecker, profileController);

module.exports = profileRouter;