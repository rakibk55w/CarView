const express = require("express");
const cors = require("cors");
const globalLimiter = require("./middlewares/limiters/global_limiter");
const homeRouter = require("./routes/home_route");
const notFound = require("./middlewares/not_found")
const errorHandler = require("./middlewares/error_handler");
const registerRouter = require("./routes/register_route");
const loginRouter = require("./routes/login_route");
const logoutRouter = require("./routes/logout_route");
const jwtRouter = require("./routes/jwt_route");
const cookieParser = require("cookie-parser");
const profileRouter = require("./routes/profile_route");
const updateProfileRouter = require("./routes/update_profile_route");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(globalLimiter);

app.use("/api", homeRouter)
app.use("/api", registerRouter);
app.use("/api", loginRouter);
app.use("/api", logoutRouter);

app.use("/api", profileRouter);
app.use("/api", updateProfileRouter);

app.use("/api", jwtRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;