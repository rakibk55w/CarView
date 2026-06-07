const express = require("express");
const authChecker = require("../middlewares/auth_checker");
const deleteCarController = require("../controllers/delete_car_controller");

const deleteCarRouter = express.Router();

deleteCarRouter.delete(
    "/:carId",
    authChecker,
    deleteCarController
);

module.exports = deleteCarRouter;