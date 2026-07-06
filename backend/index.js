require("dotenv").config();
const app = require("./app");
const pool = require("./config/db");

const port = process.env.PORT;

pool
  .connect()
  .then(() => {
    console.log("Database connected");

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/api/`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed");
    console.log(err);
  });
