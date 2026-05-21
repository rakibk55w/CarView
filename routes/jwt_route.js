const express = require("express");
const jwtRouter = express.Router();
const jwtController = require("../controllers/jwt_controller")

jwtRouter.post("/refresh-token", jwtController);

module.exports = jwtRouter;