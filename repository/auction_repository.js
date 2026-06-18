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

const getAuctions = async ({
    limit = 20,
    cursorCreatedAt = null,
    cursorId = null,
    search = null
}) => {
    const values = [];
    let index = 1;

    let cursorCondition = "";
    let searchCondition = "";

    values.push(limit + 1);

    if (cursorCreatedAt && cursorId) {
        cursorCondition = `
            AND (
                a.created_at < $${index + 1}
                OR (
                    a.created_at = $${index + 1}
                    AND a.id < $${index + 2}
                )
            )
        `;

        values.push(cursorCreatedAt);
        values.push(cursorId);

        index += 2;
    }

    if (search) {
        searchCondition = `
            AND (
                c.title ILIKE $${index + 1}
                OR c.brand ILIKE $${index + 1}
                OR c.model ILIKE $${index + 1}
                OR c.trim ILIKE $${index + 1}
            )
        `;

        values.push(`%${search}%`);
    }

    const query = `
        SELECT
            a.id,
            a.car_id,
            a.base_price,
            a.current_highest_bid,
            a.bid_count,
            a.start_time,
            a.end_time,
            a.status,
            a.created_at,

            c.title,
            c.brand,
            c.model,
            c.trim

        FROM auctions a

        INNER JOIN cars c
            ON a.car_id = c.id

        WHERE 1 = 1

        ${cursorCondition}
        ${searchCondition}

        ORDER BY
            a.created_at DESC,
            a.id DESC

        LIMIT $1
    `;

    const result =
        await pool.query(
            query,
            values
        );

    return result.rows;
};

module.exports = {
    createAuction,
    findActiveAuctionByCarId,
    getAuctionById,
    getAuctions
};