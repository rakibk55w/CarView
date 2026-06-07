const express = require("express");
const authChecker = require("../middlewares/auth_checker");
const getCarsController = require("../controllers/get_my_cars_controller");

const getCarsRouter = express.Router();

getCarsRouter.get(
    "/my-cars",
    authChecker,
    getCarsController
);

module.exports = getCarsRouter;