const auctionRepository = require("../repository/auction_repository");

const getMyAuctionsController = async (req, res, next) => {
    try {
        const page = Math.max(Number(req.query.page) || 1);

        const limit = Math.max(Number(req.query.limit) || 10);

        const offset = (page - 1) * limit;

        const [auctionList, totalItems] = await Promise.all([
            auctionRepository.getMyAuctions({
                ownerId: req.user.id,
                limit,
                offset,
            }),

            auctionRepository.getMyAuctionCount(
                req.user.id
            ),
        ]);

        return res.status(200).json({
            message: "Auction list fetched successfully",
            items: auctionList,
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

module.exports = getMyAuctionsController;