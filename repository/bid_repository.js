const pool = require("../config/db");

const createBid = async (auctionId, bidderId, bidAmount) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const auctionResult = await client.query(
            `
            SELECT *
            FROM auctions
            WHERE id = $1
            FOR UPDATE
            `,
            [auctionId]
        );

        const auction = auctionResult.rows[0];

        if (!auction) {
            throw new Error("AUCTION_NOT_FOUND");
        }

        if (auction.status !== "ACTIVE") {
            throw new Error("AUCTION_NOT_ACTIVE");
        }

        if (bidAmount <= auction.current_highest_bid) {
            throw new Error("BID_TOO_LOW");
        }

        const now = new Date();

        if (now >= auction.end_time) {
            throw new Error("AUCTION_ENDED");
        }

        await client.query(
            `
            INSERT INTO bids(
                auction_id,
                bidder_id,
                bid_amount,
                created_at
            )
            VALUES ($1, $2, $3, NOW())
            `,
            [
                auctionId,
                bidderId,
                bidAmount
            ]
        );

        let endTimeQuery = "";
        let endTimeValues = [];

        const millisecondsRemaining =
            new Date(auction.end_time) - now;

        if (millisecondsRemaining <= 60000) {
            endTimeQuery = `
                ,
                end_time = end_time + INTERVAL '2 minutes',
                extension_count = extension_count + 1
            `;
        }

        await client.query(
            `
            UPDATE auctions
            SET
                current_highest_bid = $1,
                highest_bidder_id = $2,
                bid_count = bid_count + 1,
                updated_at = NOW()
                ${endTimeQuery}
            WHERE id = $3
            `,
            [
                bidAmount,
                bidderId,
                auctionId
            ]
        );

        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};

const getBidHistoryByAuctionId = async (auctionId) => {
    const queryResult = await pool.query(
        `
        SELECT
            b.bidder_id,
            u.name AS bidder_name,
            b.bid_amount,
            b.created_at
            
        FROM bids b

        LEFT JOIN users u
            ON b.bidder_id = u.id

        WHERE b.auction_id = $1

        ORDER BY b.created_at ASC
        `,
        [auctionId]
    );

    return queryResult.rows;
};

module.exports = {
    createBid,
    getBidHistoryByAuctionId
};