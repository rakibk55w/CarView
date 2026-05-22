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

module.exports = {getProfile};