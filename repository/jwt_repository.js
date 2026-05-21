const pool = require("../config/db");

const saveRefreshToken = async (userId, refreshToken, expiresAt) => {
  await pool.query(
    `
    INSERT INTO refresh_tokens 
    (user_id, refresh_token, expires_at) 
    VALUES ($1, $2, $3)
    `,
    [userId, refreshToken, expiresAt],
  );
};

const findRefreshToken = async (refreshToken) => {
  const result = await pool.query(
    `
    SELECT * FROM refresh_tokens WHERE refresh_token = $1
    LIMIT 1
    `,
    [refreshToken],
  );

  return result.rows[0] || null;
};

const deleteRefreshToken = async (refreshToken) => {
  await pool.query(
    `
    DELETE FROM refresh_tokens WHERE refresh_token = $1
    `,
    [refreshToken],
  );
};

module.exports = {
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
};
