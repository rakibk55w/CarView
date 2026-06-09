const pool = require("../config/db");

const createImages = async (carId, imageUrls) => {
    const values = [];
    const placeholders = [];

    imageUrls.forEach((url, index) => {
        const offset = index * 2;

        placeholders.push(
            `($${offset + 1}, $${offset + 2}, NOW())`
        );

        values.push(carId, url);
    });

    const result = await pool.query(
        `
        INSERT INTO car_images (
            car_id,
            image_url,
            updated_at
        )
        VALUES
        ${placeholders.join(",")}
        RETURNING *
        `,
        values
    );

    return result.rows;
};

const getImageCountByCarId = async (carId) => {
    const result = await pool.query(
        `
        SELECT COUNT(*) AS image_count
        FROM car_images
        WHERE car_id = $1
        `,
        [carId]
    );

    return Number(result.rows[0].image_count);
};

const carHasImage = async (carId) => {
    const result = await pool.query(
        `
        SELECT EXISTS (
            SELECT 1
            FROM car_images
            WHERE car_id = $1
        ) AS has_images
        `,
        [carId]
    );

    return result.rows[0].has_images;
};

module.exports = {
    createImages,
    getImageCountByCarId,
    carHasImage
};