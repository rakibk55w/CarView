const pool = require("../config/db");

const createUser = async (userData) => {
    await pool.query(
        `
        INSERT INTO 
        users(name, email, password, updated_at, password_updated_at) 
        VALUES ($1, $2, $3, NOW(), NOW())
        `,
        [
            userData.name, 
            userData.email, 
            userData.password
        ]
    );
};

const findUserByEmail = async (email) => {
    const queryResult = await pool.query(
        `
        SELECT id, password 
        FROM users 
        WHERE email = $1
        `,
        [email]
    );

    return queryResult.rows[0];
};

module.exports = {
    createUser,
    findUserByEmail
};