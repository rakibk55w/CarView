const jwt = require("jsonwebtoken");
require("dotenv").config();

const authChecker = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const token = authHeader.split(" ")[1];

        const decodedJwt = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET
        );

        req.user = decodedJwt;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = authChecker;