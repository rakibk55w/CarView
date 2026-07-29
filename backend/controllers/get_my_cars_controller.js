const carRepository = require("../repository/car_repository");

const getMyCarsController = async (req, res, next) => {
    try {
        const page = Math.max(Number(req.query.page) || 1);

        const limit = Math.max(Number(req.query.limit) || 10);

        const offset = (page - 1) * limit;

        const [carsList, totalItems] = await Promise.all([ 
            carRepository.findCarsByUserID(
                req.user.id, 
                limit, 
                offset
            ),
            carRepository.getCarCountByUserID(
                req.user.id
            ),
        ]);

        return res.status(200).json({
            message: "Car list fetched successfully",
            items: carsList,
            page: page,
            limit: limit,
            totalItems: totalItems,
            totalPages: Math.ceil(
                totalItems / limit
            ),
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getMyCarsController;