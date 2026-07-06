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

        const existingImageCount = await carImageRepository.getImageCountByCarId(
            carId
        );

        const totalImages = existingImageCount + req.files.length;

        if (totalImages > 5) {
            return res.status(400).json({
                message: "Maximum 5 images allowed for a car"
            });
        }

        const imagesFiles = await cloudinaryService.uploadBatchImages(
            req.files, carId, 'car-images'
        );

        if (!imagesFiles.length) {
            throw new Error(
                "Could not resolve image url generation"
            );
        }

        const images = await carImageRepository.createImages(
            carId,
            imagesFiles
        );

        return res.status(201).json(images);
    } catch (error) {
        next(error);
    }
};

module.exports = uploadCarImageController;