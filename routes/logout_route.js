const logoutRouter = require("express").Router();
const logoutLimiter = require("../middlewares/limiters/logout_limiter");
const logoutController = require("../controllers/logout_controller");

logoutRouter.post("/auth/logout", logoutLimiter, logoutController);

module.exports = logoutRouter;
