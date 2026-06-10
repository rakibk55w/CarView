const { getImageForDeletion, deleteImageByImageId } = require("../repository/car_image_repository");
const cloudinaryService = require("../services/cloudinary_service");

const deleteCarImageController = async (req, res, next) => {
    try {
        const image = await getImageForDeletion(req.params.imageId);

        if (!image) {
            return res.status(404).json({
                message: "Image not found"
            });
        }
        
        if (image.owner_id !== req.user.id) {
            return res.status(403).json({
                message: "Car ownership conflict"
            });
        }

        await cloudinaryService.deleteImage(
            image.cloudinary_public_id
        );

        const deletedImage = await deleteImageByImageId(
            req.params.imageId
        );

        if (!deletedImage) {
            return res.status(404).json({
                message: "Image not found"
            });
        }

        return res.status(200).json({
            message: "Image deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteCarImageController;