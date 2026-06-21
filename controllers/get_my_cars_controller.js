const carRepository = require("../repository/car_repository");

const getMyCarsController = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;

        const offset = (page - 1) * limit;

        const carsList = await carRepository.findCarsByUserID(
            req.user.id, 
            limit, 
            offset
        );

        return res.status(200).json({
            message: "Car list fetched successfully",
            items: carsList,
            page: page,
            limit: limit,
            totalItems: carsList.length,
            totalPages: Math.ceil(
                carsList.length / limit
            ),
    });
    } catch (error) {
        next(error);
    }
};

module.exports = getMyCarsController;