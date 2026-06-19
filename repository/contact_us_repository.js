const pool = require("../config/db");

const sendMessage = async ({
    email,
    contact_number,
    subject,
    message
}) => {
    await pool.query(
        `
        INSERT INTO user_messages(
            email,
            contact_number,
            subject,
            message
        )
        VALUES(
            $1, $2, $3, $4
        )`,
        [email, contact_number, subject, message]
    );
};

module.exports = {
    sendMessage
};