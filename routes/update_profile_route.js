const updateProfileRouter = require("express").Router();
const updateProfileValidator = require("../validators/update_profile_validator");
const updateProfileController = require("../controllers/update_profile_controller");
const authChecker = require("../middlewares/auth_checker");

updateProfileRouter.put("/update-profile", authChecker, updateProfileValidator, updateProfileController);

module.exports = updateProfileRouter;