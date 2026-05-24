const pool = require("../config/db");

const getProfile = async (userId) => {
    const result = await pool.query(
        `
        SELECT name, email, contact_number, date_of_birth, street_address, city
        FROM users WHERE id = $1
        `,
        [userId]
    );

    return result.rows[0];
};

const updateProfile = async (userId, {name, email, contact_number, date_of_birth, street_address, city}) => {
    const result = await pool.query(
        `
        UPDATE users
        SET
            name = COALESCE($1, name),
            email = COALESCE($2, email),
            contact_number = COALESCE($3, contact_number),
            date_of_birth = COALESCE($4, date_of_birth),
            street_address = COALESCE($5, street_address),
            city = COALESCE($6, city)
        WHERE id = $7
        RETURNING name, email, contact_number, date_of_birth, street_address, city
        `,
        [name, email, contact_number, date_of_birth, street_address, city, userId]
    );

    return result.rows[0];
}

const updatePassword = async (userId, newPassword) => {
    await pool.query(
        `
        UPDATE users
        SET password = $1
        WHERE id = $2
        `,
        [newPassword, userId]
    );
}

const getPassword = async (userId) => {
    const result = await pool.query(
        `
        SELECT password
        FROM users
        WHERE id = $1
        `,
        [userId]
    );

    return result.rows[0]?.password;
};

module.exports = { getProfile, updateProfile, updatePassword, getPassword };