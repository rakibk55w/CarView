const express = require("express");
const cors = require("cors");
const homeRouter = require("./routes/home_route");
const notFound = require("./middlewares/not_found")
const errorHandler = require("./middlewares/error_handler");
const registerRouter = require("./routes/register_route");
const loginRouter = require("./routes/login_route");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use("/api", homeRouter)
app.use("/api", registerRouter);
app.use("/api", loginRouter);

app.use(notFound);
app.use(errorHandler);



module.exports = app;