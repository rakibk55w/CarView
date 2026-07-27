const profileImageRepository = require("../repository/profile_image_repository");

const getProfileImageController = async (req, res, next) => {
  try {
    const image = await profileImageRepository.getImageByUserId(
      req.params.userId
    );

    if (!image) {
      return res.status(404).json({
        message: "Profile image not found",
      });
    }

    return res.status(200).json({
      message: "Profile image fetched successfully",
      data: { image_url: image.image_url }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getProfileImageController;
