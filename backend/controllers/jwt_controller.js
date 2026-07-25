const jwt = require("jsonwebtoken");
const jwtHelper = require("../utils/jwt");
const jwtRepository = require("../repository/jwt_repository");
require("dotenv").config();

const jwtController = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refresh_token;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh token missing"
            });
        }

        const decodedToken = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        const storedToken = await jwtRepository.findRefreshToken(refreshToken);

        if (!storedToken) {
            return res.status(401).json({
                message: "Invalid or expired refresh token"
            });
        }

        await jwtRepository.deleteRefreshToken(
            refreshToken
        );

        const accessToken = jwtHelper.generateAccessToken({
            id: decodedToken.id,
            role: decodedToken.role
        });

        const newRefreshToken = jwtHelper.generateRefreshToken({
            id: decodedToken.id,
            role: decodedToken.role
        });

        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000
        );

        await jwtRepository.saveRefreshToken(
            decodedToken.id,
            newRefreshToken,
            expiresAt
        );

        res.cookie(
            "refresh_token",
            newRefreshToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/api/auth"
            }
        );

        return res.status(200).json({
            "message": "Access token refreshed successfully",
            "access_token": accessToken
        });
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired refresh token",
        });
    }
};

module.exports = jwtController;