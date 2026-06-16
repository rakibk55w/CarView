const carImageRepository = require("../repository/car_image_repository");

const getCarImagesController = async (req, res, next) => {
  try {
    const images = await carImageRepository.getImagesByCarId(req.params.carId);

    if (!images.length) {
            return res.status(404).json({
                message: "Car images not found"
            });
        }

    return res.status(200).json({
      message: "Car images fetched successfully",
      data: { images }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCarImagesController;
