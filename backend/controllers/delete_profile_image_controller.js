const profileImageRepository = require("../repository/profile_image_repository");
const cloudinaryService = require("../services/cloudinary_service");

const deleteProfileImageController = async (req, res, next) => {
    try {
        const image = await profileImageRepository.getImageByUserId(req.user.id);

        if (!image) {
            return res.status(404).json({
                message: "Image not found"
            });
        }

        const deletedImage = await profileImageRepository.deleteImageByUserId(
            req.user.id
        );

        if (!deletedImage) {
            return res.status(404).json({
                message: "Image not found"
            });
        }

        await cloudinaryService.deleteImage(
            image.cloudinary_public_id
        );

        return res.status(200).json({
            message: "Image deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteProfileImageController;