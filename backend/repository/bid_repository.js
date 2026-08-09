const pool = require("../config/db");

const createBid = async (auctionId, bidderId, bidAmount) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const auctionResult = await client.query(
            `
            SELECT 
                status,
                end_time,
                current_highest_bid,
                highest_bidder_id,
                owner_id, 
                (
                    SELECT
                        contact_number IS NOT NULL
                        AND date_of_birth IS NOT NULL
                        AND street_address IS NOT NULL
                        AND city IS NOT NULL
                    FROM users
                    WHERE id = $2
                ) AS bidder_profile_complete
            FROM auctions
            WHERE id = $1
            FOR UPDATE
            `,
            [auctionId, bidderId]
        );

        const auction = auctionResult.rows[0];

        if (!auction) {
            throw new Error("AUCTION_NOT_FOUND");
        }

        if (auction.owner_id === bidderId) {
            throw new Error("OWNER_CANNOT_BID");
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

        if (auction.highest_bidder_id === bidderId) {
            throw new Error("ALREADY_HIGHEST_BIDDER");
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

const getBidHistoryByAuctionId = async (
    auctionId,
    limit,
    offset) => {
    const queryResult = await pool.query(
        `
        SELECT
            b.id,
            b.bidder_id,
            u.name AS bidder_name,
            b.bid_amount,
            b.created_at
            
        FROM bids b

        LEFT JOIN users u
            ON b.bidder_id = u.id

        WHERE b.auction_id = $1

        ORDER BY b.created_at ASC

        LIMIT $2
        OFFSET $3
        `,
        [auctionId, limit, offset]
    );

    return queryResult.rows;
};

const getBidCountByAuctionId = async (auctionId) => {
    const queryResult = await pool.query(
        `
        SELECT COUNT(*) AS count
        FROM bids
        WHERE auction_id = $1
        `,
        [auctionId]
    );

    return Number(queryResult.rows[0].count);
};

const getMyBids = async ({
  bidderId,
  limit,
  offset,
}) => {
    const result = await pool.query(
        `
        SELECT
            b.id,
            b.bid_amount,
            b.created_at AS bid_created_at,
            b.bidder_id,

            a.id AS auction_id,

            c.title AS car_title,

            u.name AS "user_name"

        FROM bids b

        INNER JOIN auctions a
            ON a.id = b.auction_id

        INNER JOIN cars c
            ON c.id = a.car_id

        INNER JOIN users u
            ON u.id = b.bidder_id

        WHERE b.bidder_id = $1

        ORDER BY b.created_at DESC

        LIMIT $2
        OFFSET $3
        `,
        [bidderId, limit, offset]
    );

    return result.rows;
};

const getMyBidCount = async (bidderId) => {
    const result = await pool.query(
        `
        SELECT COUNT(*) AS total
        FROM bids
        WHERE bidder_id = $1
        `,
        [bidderId]
    );

    return Number(result.rows[0].total);
};

module.exports = {
    createBid,
    getBidHistoryByAuctionId,
    getBidCountByAuctionId,
    getMyBids,
    getMyBidCount
};