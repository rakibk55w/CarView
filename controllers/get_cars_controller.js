const { findCarsByUserID } = require("../repository/car_repository");

const getCarsController = async (req, res, next) => {
    try {
        const cars = await findCarsByUserID(req.user.id);

        return res.status(200).json(cars);
    } catch (error) {
        next(error);
    }
};

module.exports = getCarsController;