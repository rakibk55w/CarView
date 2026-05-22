const rateLimit = require("express-rate-limit");

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 1000,
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = globalLimiter;