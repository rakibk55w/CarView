const UploadProfileImageResponseDto = require("../dtos/upload_profile_image_response_dto");
const profileImageRepository = require("../repository/profile_image_repository");
const cloudinaryService = require("../services/cloudinary_service");

const uploadProfileImageController = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "At least one image is required"
            });
        }

        const oldImage = await profileImageRepository.getImageByUserId(
            req.user.id
        );

        if (oldImage) {
            await cloudinaryService.deleteImage(
                oldImage.cloudinary_public_id
            );
        }

        const imagesFile = await cloudinaryService.uploadSingleImage(
            req.file, req.user.id, 'profile-images'
        );

        if (!imagesFile) {
            throw new Error(
                "Could not resolve image url generation"
            );
        }

        const image = await profileImageRepository.createImage(
            req.user.id,
            imagesFile
        );

        return res.status(201).json(
            new UploadProfileImageResponseDto(image)
        );
    } catch (error) {
        next(error);
    }
};

module.exports = uploadProfileImageController;