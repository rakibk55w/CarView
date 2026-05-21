const logoutRouter = require("express").Router();
const logoutController = require("../controllers/logout_controller");

logoutRouter.post("/logout", logoutController);

module.exports = logoutRouter;
