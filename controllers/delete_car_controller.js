const carRepository = require("../repository/car_repository");

const deleteCarController = async (req, res, next) => {
    try {
        const deletedCar = await carRepository.deleteCarByCarId(
            req.params.carId, req.user.id
        );

        if (!deletedCar) {
            return res.status(404).json({
                message: "Car not found"
            });
        }

        return res.status(200).json({
            message: "Car deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteCarController;