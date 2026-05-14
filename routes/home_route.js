const express = require("express");
const homeController = require("../controllers/home_controller");
const homeRouter = express.Router();

homeRouter.get("/", homeController)

module.exports = homeRouter;