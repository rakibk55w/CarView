const express = require("express");
const jwtRouter = express.Router();
const jwtController = require("../controllers/jwt_controller")

jwtRouter.post("/auth/refresh-token", jwtController);

module.exports = jwtRouter;