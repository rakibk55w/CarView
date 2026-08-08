const auctionRepository = require("../repository/auction_repository");

const deleteAuctionController = async (req, res, next) => {
    try {
        const deletedAuction = await auctionRepository.deleteAuctionByAuctionId(
            req.params.auctionId, req.user.id
        );

        if (!deletedAuction) {
            return res.status(404).json({
                message: "Auction not found"
            });
        }

        return res.status(200).json({
            message: "Auction deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteAuctionController;