const pool = require("../config/db");

const createAuction = async (auctionData) => {
    const queryResult = await pool.query(
        `
        INSERT INTO auctions (
            car_id,
            base_price,
            current_highest_bid,
            bid_count,
            start_time,
            end_time,
            extension_count,
            status,
            updated_at
        )
        VALUES (
            $1, $2, $2, 0, $3, $4, 
            0, 'ACTIVE', NOW()
        )
        RETURNING *
        `,
        [
            auctionData.car_id,
            auctionData.base_price,
            auctionData.start_time,
            auctionData.end_time
        ]
    );

    return queryResult.rows[0];
};

const findActiveAuctionByCarId = async (carId) => {
    const queryResult = await pool.query(
        `
        SELECT *
        FROM auctions
        WHERE car_id = $1
        AND status = 'ACTIVE'
        `,
        [carId]
    );

    return queryResult.rows[0];
};

const getAuctionById = async (auctionId) => {
    const queryResult = await pool.query(
        `
        SELECT 
            a.car_id,
            a.base_price,
            a.current_highest_bid,
            a.highest_bidder_id, 
            hb.name AS highest_bidder_name,
            a.bid_count,
            a.start_time,
            a.end_time,
            a.extension_count,
            a.status, 
            a.winner_id,
            w.name AS winner_name,
            a.winning_bid,
            a.created_at 
        FROM auctions a
        LEFT JOIN users hb
            ON a.highest_bidder_id = hb.id
        LEFT JOIN users w
            ON a.winner_id = w.id
        WHERE id = $1 
        `,
        [auctionId]
    );

    return queryResult.rows[0] ?? null;
};

module.exports = {
    createAuction,
    findActiveAuctionByCarId,
    getAuctionById
};