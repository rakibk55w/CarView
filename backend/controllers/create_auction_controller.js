const CreateAuctionRequestDto = require("../dtos/create_auction_request_dto");
const auctionRepository = require("../repository/auction_repository");
const carRepository = require("../repository/car_repository");
const carImageRepository = require("../repository/car_image_repository");

const createAuctionController = async (req, res, next) => {
    try {
        const createAuctionDto = CreateAuctionRequestDto.fromRequest(req.body, req.user.id);

        const car = await carRepository.getCarDetailsWithProfileVerification(
            createAuctionDto.carId
        );

        if (!car) {
            return res.status(404).json({
                message: "Car not found"
            });
        }

        if (car.owner_id !== createAuctionDto.userId) {
            return res.status(403).json({
                message: "Car ownership conflict"
            });
        }

        if (!car.owner_profile_complete) {
            return res.status(403).json({
                message: "Complete your profile before creating an auction"
            });
        }

        const hasImagesForCar = await carImageRepository.carHasImage(
            createAuctionDto.carId
        );

        if (!hasImagesForCar) {
            return res.status(400).json({
                message: "Car must have at least one image before creating an auction"
            });
        }

        const activeAuction = await auctionRepository.findActiveAuctionByCarId(
            createAuctionDto.carId
        );

        if (activeAuction) {
            return res.status(409).json({
                message: "Car is already in an active auction"
            });
        }

        const auction = await auctionRepository.createAuction(
            createAuctionDto
        );

        return res.status(201).json({
            message: "Auction created successfully",
            auction_id: auction.id
        });
    } catch (error) {
        next(error);
    }
};

module.exports = createAuctionController;