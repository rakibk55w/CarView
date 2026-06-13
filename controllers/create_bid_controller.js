const CreateBidRequestDto = require("../dtos/create_bid_request_dto");
const { createBid } = require("../repository/bid_repository");

const createBidController = async (req, res, next) => {
    try {
        const bidDto = CreateBidRequestDto.fromRequest(
            req.body
        );

        await createBid(
            bidDto.auction_id,
            req.user.id,
            bidDto.bid_amount
        );

        return res.status(201).json({
            message: "Bid placed successfully"
        });
    } catch (error) {
        switch (error.message) {
            case "AUCTION_NOT_FOUND":
                return res.status(404).json({
                    message: "Auction not found"
                });

            case "AUCTION_NOT_ACTIVE":
                return res.status(400).json({
                    message: "Auction is not active"
                });

            case "BID_TOO_LOW":
                return res.status(400).json({
                    message: "Bid must be greater than current highest bid"
                });

            case "AUCTION_ENDED":
                return res.status(400).json({
                    message: "Auction has already ended"
                });

            default:
                next(error);
        }
    }
};

module.exports = createBidController;