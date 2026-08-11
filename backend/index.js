require("dotenv").config();
const app = require("./app");
const pool = require("./config/db");

const port = process.env.PORT;

pool
    .query("SELECT 1")
    .then(() => {
        app.listen(port);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
