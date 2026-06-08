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

module.exports = {
    createAuction,
    findActiveAuctionByCarId
};