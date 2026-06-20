const auctionRepository = require("../repository/auction_repository");

const getMyAuctionsController = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;

        const offset = (page - 1) * limit;

        const auctionList = await auctionRepository.getMyAuctions({
            ownerId: req.user.id,
            limit,
            offset,
        });

        return res.status(200).json({
            message: "Auction list fetched successfully",
            items: auctionList,
            page,
            limit,
            totalItems: auctionList.length,
            totalPages: Math.ceil(
                auctionList.length / limit
            ),
        });

    } catch (error) {
        next(error);
    }
};

module.exports = getMyAuctionsController;