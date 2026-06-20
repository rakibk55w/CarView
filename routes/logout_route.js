const logoutRouter = require("express").Router();
const logoutLimiter = require("../middlewares/limiters/logout_limiter");
const authChecker = require("../middlewares/auth_checker");
const logoutController = require("../controllers/logout_controller");

logoutRouter.post("/auth/logout", logoutLimiter, authChecker, logoutController);

module.exports = logoutRouter;
