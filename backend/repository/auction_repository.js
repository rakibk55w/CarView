const pool = require("../config/db");

const createAuction = async (auctionData) => {
    const queryResult = await pool.query(
        `
        INSERT INTO auctions (
            car_id,
            owner_id,
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
            $1, $2, $3, 0, 0, $4, 
            $5, 0, 'ACTIVE', NOW()
        )
        RETURNING 
            id
        `,
        [
            auctionData.carId,
            auctionData.userId,
            auctionData.basePrice,
            auctionData.startTime,
            auctionData.endTime
        ]
    );

    return queryResult.rows[0];
};

const findActiveAuctionByCarId = async (carId) => {
    const queryResult = await pool.query(
        `
        SELECT EXISTS (
            SELECT 1
            FROM auctions
            WHERE car_id = $1
            AND status = 'ACTIVE'
        ) AS auction_exists;
        `,
        [carId]
    );

    return queryResult.rows[0].auction_exists;
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

const getMyAuctions = async ({
  ownerId,
  limit,
  offset,
}) => {
    const result = await pool.query(
        `
        SELECT
            a.id,
            a.base_price,
            a.current_highest_bid,
            a.start_time,
            a.end_time,
            a.status,

            c.title,
            c.description,
            c.brand,
            c.model,
            c.manufacture_year,
            c.fuel_type,
            COALESCE(
                ARRAY_AGG(
                    ci.image_url
                    ORDER BY ci.created_at ASC
                ) FILTER (
                    WHERE ci.image_url IS NOT NULL
                ),
                '{}'
            ) AS images

        FROM auctions a

        INNER JOIN cars c
            ON c.id = a.car_id

        LEFT JOIN car_images ci
            ON ci.car_id = c.id

        WHERE a.owner_id = $1

        GROUP BY
            a.id,
            a.base_price,
            a.current_highest_bid,
            a.end_time,
            a.status,
            c.id,
            c.title,
            c.description,
            c.brand,
            c.model,
            c.manufacture_year

        ORDER BY a.created_at DESC

        LIMIT $2
        OFFSET $3
        `,
        [ownerId, limit, offset]
    );

    return result.rows;
};

const getMyAuctionCount = async (ownerId) => {
    const result = await pool.query(
        `
        SELECT COUNT(*) AS total
        FROM auctions
        WHERE owner_id = $1
        `,
        [ownerId]
    );

    return Number(result.rows[0].total);
};

module.exports = {
    createAuction,
    findActiveAuctionByCarId,
    getAuctionById,
    getAuctions,
    getMyAuctions,
    getMyAuctionCount
};