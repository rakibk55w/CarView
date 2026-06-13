const pool = require("../config/db");

const createImage = async (userId, image) => {
    const result = await pool.query(
        `
        INSERT INTO profile_images (
            user_id,
            image_url,
            cloudinary_public_id,
            updated_at
        )
        VALUES (
            $1, $2, $3, NOW()
        )
        ON CONFLICT (user_id)
        DO UPDATE SET
            image_url = EXCLUDED.image_url,
            cloudinary_public_id = EXCLUDED.cloudinary_public_id,
            updated_at = NOW()
        RETURNING *
        `,
        [userId, image.imageUrl, image.publicId]
    );

    return result.rows[0];
};

const userHasImage = async (userId) => {
    const result = await pool.query(
        `
        SELECT EXISTS (
            SELECT 1
            FROM profile_images
            WHERE user_id = $1
        ) AS has_image
        `,
        [userId]
    );

    return result.rows[0].has_image;
};

const getImageByUserId = async (userId) => {
    const result = await pool.query(
        `
        SELECT image_url
        FROM profile_images
        WHERE user_id = $1
        `,
        [userId]
    );

    return result.rows[0] ?? null;
};

const deleteImageByUserId = async (userId) => {
    const queryResult = await pool.query(
        `
        DELETE FROM profile_images 
        WHERE user_id = $1
        RETURNING *
        `,
        [userId]
    );

    return queryResult.rows[0] ?? null;
};

module.exports = {
    createImage,
    userHasImage,
    getImageByUserId,
    deleteImageByUserId
};