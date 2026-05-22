const rateLimit = require("express-rate-limit");

const profileLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 20,
  message: {
    message: "Too many attempts. Try again later."
  }
});

module.exports = profileLimiter;