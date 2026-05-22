const express = require("express");
const jwtRouter = express.Router();
const jwtLimiter = require("../middlewares/limiters/jwt_limiter");
const jwtController = require("../controllers/jwt_controller")

jwtRouter.post("/auth/refresh-token", jwtLimiter, jwtController);

module.exports = jwtRouter;