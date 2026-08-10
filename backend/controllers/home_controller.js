const auctionRepository =
require("../repository/auction_repository");

const homeController = async (req, res, next) => {
    try {
        const limit = Number(req.query.limit) || 20;

        const cursorCreatedAt = req.query.cursorCreatedAt;
        const cursorId = req.query.cursorId;

        const search = req.query.search?.trim();

        const auctions = await auctionRepository.getAuctions({
            limit,
            cursorCreatedAt,
            cursorId,
            search
        });

        let nextCursor = null;

        const hasMore = auctions.length > limit;
        if (hasMore) {
            auctions.pop();
        }

        if (hasMore && auctions.length) {
            const last = auctions[auctions.length - 1];

            nextCursor = {
                cursorCreatedAt: last.created_at,
                cursorId: last.id
            };
        }

        return res.status(200).json({
            message: "Auctions fetched successfully",
            pagination: {
                limit,
                hasMore,
                nextCursor
            },
            data: auctions
        });

    } catch (error) {
        next(error);
    }
};

module.exports = homeController;