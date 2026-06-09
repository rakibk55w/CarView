const CreateAuctionRequestDto = require("../dtos/create_auction_request_dto");
const { createAuction, findActiveAuctionByCarId } = require("../repository/auction_repository");
const { getCarDetailsByCarID } = require("../repository/car_repository");
const { carHasImage } = require("../repository/car_image_repository");

const createAuctionController = async (req, res, next) => {
    try {
        const createAuctionDto = CreateAuctionRequestDto.fromRequest(req.body);

        const car = await getCarDetailsByCarID(
            createAuctionDto.car_id
        );

        if (!car) {
            return res.status(404).json({
                message: "Car not found"
            });
        }

        if (car.owner_id !== req.user.id) {
            return res.status(403).json({
                message: "Car ownership conflict"
            });
        }

        const hasImagesForCar  = await carHasImage(
            createAuctionDto.car_id
        );

        if (!hasImagesForCar) {
            return res.status(400).json({
                message: "Car must have at least one image before creating an auction"
            });
        }

        const activeAuction = await findActiveAuctionByCarId(
            createAuctionDto.car_id
        );

        if (activeAuction) {
            return res.status(409).json({
                message: "Car is already in an active auction"
            });
        }

        const auction = await createAuction(createAuctionDto);

        return res.status(201).json({
            message: "Auction created successfully",
            auction_id: auction.id
        });
    } catch (error) {
        next(error);
    }
};

module.exports = createAuctionController;