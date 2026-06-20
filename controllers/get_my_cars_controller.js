const carRepository = require("../repository/car_repository");

const getMyCarsController = async (req, res, next) => {
    try {
        const cars = await carRepository.findCarsByUserID(req.user.id);

        return res.status(200).json(cars);
    } catch (error) {
        next(error);
    }
};

module.exports = getMyCarsController;