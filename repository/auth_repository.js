const pool = require("../config/db");

const createUser = async (userData) => {
    await pool.query(
        `INSERT INTO users(name, email, password) VALUES ($1, $2, $3)`,
        [userData.name, userData.email, userData.password]
    );
};

const findUserByEmail = async (email) => {
    const queryResult = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );

    return queryResult.rows[0];
};

module.exports = {
    createUser,
    findUserByEmail
};