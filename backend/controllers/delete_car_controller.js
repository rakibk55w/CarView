const carRepository = require("../repository/car_repository");

const deleteCarController = async (req, res, next) => {
    try {
        const result = await carRepository.deleteCarByCarId(
            req.params.carId, 
            req.user.id
        );

        if (result.reason === "NOT_FOUND") {
            return res.status(404).json({
                message: "Car not found."
            });
        }

        if (result.reason === "HAS_AUCTION") {
            return res.status(409).json({
                message: "This car cannot be deleted because it is listed in an auction."
            });
        }

        return res.status(200).json({
            message: "Car deleted successfully."
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteCarController;