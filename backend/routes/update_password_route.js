const updatePasswordRouter = require("express").Router();
const updatePasswordValidator = require("../validators/update_password_validator");
const updatePasswordController = require("../controllers/update_password_controller");
const authChecker = require("../middlewares/auth_checker");

updatePasswordRouter.patch("/update-password", authChecker, updatePasswordValidator, updatePasswordController);

module.exports = updatePasswordRouter;