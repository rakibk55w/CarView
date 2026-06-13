const CreateCarRequestDto = require("../dtos/create_car_request_dto");
const carRepository = require("../repository/car_repository");

const createCarController = async (req, res, next) => {
    try {
        const createCarDto = CreateCarRequestDto.fromRequest(req.body);

        await carRepository.createCar(req.user.id, createCarDto);

        return res.status(201).json({
            message: "Car registered successfully"
        });

    } catch (error) {
        next(error);
    }
}

module.exports = createCarController;