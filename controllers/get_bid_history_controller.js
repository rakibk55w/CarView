const bidRepository = require("../repository/bid_repository");

const getBidHistoryController = async (req, res, next) => {
    try {
        const bids = await bidRepository.getBidHistoryByAuctionId(req.params.auctionId);

        if (!bids.length) {
            return res.status(404).json({
                message: "No bids placed yet"
            });
        }

        return res.status(200).json({
            message: "Bids fetched successfully",
            data: bids
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getBidHistoryController;