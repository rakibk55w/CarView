const bidRepository = require("../repository/bid_repository");

const getMyBidsController = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;

        const offset = (page - 1) * limit;

        const bidsList = await bidRepository.getMyBids({
            bidderId: req.user.id,
            limit,
            offset,
        });

        return res.status(200).json({
            items: bidsList,
            page,
            limit,
            totalItems: bidsList.length,
            totalPages: Math.ceil(
                bidsList.length / limit
            ),
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getMyBidsController;