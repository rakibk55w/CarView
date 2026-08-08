const carRepository = require("../repository/car_repository");

const getCarDetailsController = async (req, res, next) => {
    try {
        const car = await carRepository.getCarDetailsByCarID(req.params.carId);

        if (!car) {
            return res.status(404).json({
                message: "Car not found"
            });
        }

        return res.status(200).json({
            message: "Car details fetched successfully.",
            data: car
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getCarDetailsController;