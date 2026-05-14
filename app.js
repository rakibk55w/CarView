const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const homeRouter = require("./routes/home_route");
const notFound = require("./middlewares/not_found")
const errorHandler = require("./middlewares/error_handler");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use("/api", homeRouter)

app.use(notFound);
app.use(errorHandler);


module.exports = app;