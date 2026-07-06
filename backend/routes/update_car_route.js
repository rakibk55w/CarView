const express = require("express");
const authChecker = require("../middlewares/auth_checker");
const createCarValidator = require("../validators/create_car_validator");
const updateCarController = require("../controllers/update_car_controller");

const updateCarRouter = express.Router();

updateCarRouter.put(
    "/:carId",
    authChecker,
    createCarValidator,
    updateCarController
);

module.exports = updateCarRouter;