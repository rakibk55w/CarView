const CreateCarRequestDto = require("../dtos/create_car_request_dto");
const {
    updateCarById
} = require("../repository/car_repository");

const updateCarController = async (req, res, next) => {
    try {
        const updateCarDto =
            CreateCarRequestDto.fromRequest(req.body);

        const updatedCar = await updateCarById(
            req.params.carId,
            req.user.id,
            updateCarDto
        );

        if (!updatedCar) {
            return res.status(404).json({
                message: "Car not found"
            });
        }

        return res.status(200).json({
            message: "Car updated successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateCarController;