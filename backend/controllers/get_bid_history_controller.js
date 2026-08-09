const bidRepository = require("../repository/bid_repository");

const getBidHistoryController = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const [bids, totalItems] = await Promise.all([
            bidRepository.getBidHistoryByAuctionId(
                req.params.auctionId,
                limit,
                offset
            ),
            bidRepository.getBidCountByAuctionId(
                req.params.auctionId
            )
        ]);

        const hasMore = offset + bids.length < totalItems;

        return res.status(200).json({
            message: "Bids fetched successfully",
            data: bids,
            page,
            limit,
            totalItems,
            hasMore
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getBidHistoryController;