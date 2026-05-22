const rateLimit = require("express-rate-limit");

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 3,
  message: {
    message: "Too many attempts. Try again later."
  }
});

module.exports = registerLimiter;