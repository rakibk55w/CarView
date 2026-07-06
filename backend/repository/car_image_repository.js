const pool = require("../config/db");

const createImages = async (carId, images) => {
    const values = [];
    const placeholders = [];

    images.forEach((image, index) => {
        const offset = index * 3;

        placeholders.push(
            `($${offset + 1}, $${offset + 2}, $${offset + 3}, NOW())`
        );

        values.push(carId, image.imageUrl, image.publicId);
    });

    const result = await pool.query(
        `
        INSERT INTO car_images (
            car_id,
            image_url,
            cloudinary_public_id,
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

const getImageForDeletion = async (imageId) => {
    const result = await pool.query(
        `
        SELECT
            ci.id,
            ci.car_id,
            ci.cloudinary_public_id,
            c.owner_id
        FROM car_images ci
        INNER JOIN cars c
            ON c.id = ci.car_id
        WHERE ci.id = $1
        `,
        [imageId]
    );

    return result.rows[0];
};

const getImagesByCarId = async (carId) => {
    const queryResult = await pool.query(
        `
        SELECT image_url
        FROM car_images
        WHERE car_id = $1
        ORDER BY created_at ASC
        `,
        [carId]
    );

    return queryResult.rows.map(row => row.image_url);
};

const deleteImageByImageId = async (imageId) => {
    const queryResult = await pool.query(
        `
        DELETE FROM car_images 
        WHERE id = $1
        RETURNING *
        `,
        [imageId]
    );

    return queryResult.rows[0];
};

module.exports = {
    createImages,
    getImageCountByCarId,
    carHasImage,
    getImageForDeletion,
    getImagesByCarId,
    deleteImageByImageId
};