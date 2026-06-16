const auctionRepository = require("../repository/auction_repository");

const getAuctionDetailsController = async (req, res, next) => {
    try {
        const auction = await auctionRepository.getAuctionById(req.params.auctionId);

        if (!auction) {
            return res.status(404).json({
                message: "No auction found"
            });
        }

        return res.status(200).json({
            message: "Auction details fetched successfully",
            data: auction
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getAuctionDetailsController;