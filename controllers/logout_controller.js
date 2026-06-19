const jwtRepository = require("../repository/jwt_repository");

const logoutController = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (refreshToken) {
      await jwtRepository.deleteRefreshToken(
        refreshToken
      );
    }

    res.clearCookie("refresh_token");

    return res.status(200).json({
      message: "Logged out successfully",
    });

  } catch (error) {
    next(error);
  }
};

module.exports = logoutController;