const carImageRepository = require("../repository/car_image_repository");
const cloudinaryService = require("../services/cloudinary_service");

const uploadCarImageController = async (req, res, next) => {
    try {
        const carId = req.params.carId;

        if (!req.files?.length) {
            return res.status(400).json({
                message: "At least one image is required"
            });
        }

        if (req.files.length > 5) {
            return res.status(400).json({
                message: "Maximum 5 images allowed"
            });
        }

        const imageUrls = await cloudinaryService.uploadImages(
            req.files, carId
        );

        if (!imageUrls.length) {
            throw new Error(
                "Could not resolve image url generation"
            );
        }

        const images = await carImageRepository.createImages(
            carId,
            imageUrls
        );

        return res.status(201).json(images);
    } catch (error) {
        next(error);
    }
};

module.exports = uploadCarImageController;