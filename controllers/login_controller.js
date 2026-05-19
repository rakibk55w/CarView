const bcrypt = require("bcrypt");
const authRepository = require("../repository/auth_repository");
const jwt = require("../utils/jwt");

const loginController = async (req, res, next) => {
  try {
    const existingUser = await authRepository.findUserByEmail(req.body.email);
    if (!existingUser) {
      return res.status(401).json({
        message: "Invalid email",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      existingUser.password,
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    const accessToken = jwt.generateAccessToken(existingUser);
    const refreshToken = jwt.generateRefreshToken(existingUser);

    res.cookie(
      "refresh_token",
      refreshToken,
      {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      }
    );

    return res.status(200).json({
      message: "Login successful",
      access_token: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = loginController;
