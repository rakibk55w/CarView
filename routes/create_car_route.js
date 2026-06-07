const express = require("express");
const createCarValidator = require("../validators/create_car_validator");
const createCarController = require("../controllers/create_car_controller")
const authChecker = require("../middlewares/auth_checker");

const createCarRouter = express.Router();

createCarRouter.post("/create-car", authChecker, createCarValidator, createCarController);

module.exports = createCarRouter;