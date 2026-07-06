const rateLimit = require("express-rate-limit");

const jwtLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 20,
  message: {
    message: "Too many attempts. Try again later."
  }
});

module.exports = jwtLimiter;