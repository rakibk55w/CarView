const profileRepository = require("../repository/profile_repository");

const profileController = async (req, res, next) => {
  try {
    const profile = await profileRepository.getProfile(req.user.id);

    if (!profile) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile fetched successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = profileController;
