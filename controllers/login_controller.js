require("dotenv").config();
const bcrypt = require("bcrypt");
const authRepository = require("../repository/auth_repository");
const jwtHelper = require("../utils/jwt");
const jwtRepository = require("../repository/jwt_repository");

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

    const accessToken = jwtHelper.generateAccessToken(existingUser);
    const refreshToken = jwtHelper.generateRefreshToken(existingUser);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await jwtRepository.saveRefreshToken(
      existingUser.id,
      refreshToken,
      expiresAt,
    );

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //console.log(res.headers.cookies);
    //console.log(res.cookies);

    return res.status(200).json({
      message: "Login successful",
      access_token: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = loginController;
