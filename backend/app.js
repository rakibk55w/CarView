const express = require("express");
const cors = require("cors");
const globalLimiter = require("./middlewares/limiters/global_limiter");
const cookieParser = require("cookie-parser");

const homeRouter = require("./routes/home_route");
const registerRouter = require("./routes/register_route");
const loginRouter = require("./routes/login_route");
const logoutRouter = require("./routes/logout_route");
const jwtRouter = require("./routes/jwt_route");
const profileRouter = require("./routes/profile_route");
const updateProfileRouter = require("./routes/update_profile_route");
const updatePasswordRouter = require("./routes/update_password_route");
const contactUsRouter = require("./routes/contact_us_route");

const notFound = require("./middlewares/not_found")
const errorHandler = require("./middlewares/error_handler");
const createAuctionRouter = require("./routes/create_auction_route");
const getAuctionDetailsRouter = require("./routes/get_auction_details_route");
const getMyAuctionsRouter = require("./routes/get_my_auctions_router");
const createBidRouter = require("./routes/create_bid_route");
const getBidHistoryRouter = require("./routes/get_bid_history_route");
const getMyBidsRouter = require("./routes/get_my_bids_route");
const createCarRouter = require("./routes/create_car_route");
const getCarDetailsRouter = require("./routes/get_car_details_route");
const getMyCarsRouter = require("./routes/get_my_cars_route");
const deleteCarImageRouter = require("./routes/delete_car_image_route");
const deleteCarRouter = require("./routes/delete_car_route");
const deleteProfileImageRouter = require("./routes/delete_profile_image_route");
const getCarImagesRouter = require("./routes/get_car_images_route");
const getProfileImageRouter = require("./routes/get_profile_image_route");
const updateCarRouter = require("./routes/update_car_route");
const uploadCarImageRouter = require("./routes/upload_car_image_route");
const uploadProfileImageRouter = require("./routes/upload_profile_image_route");

const app = express();

app.use(
    cors({ 
        origin: "http://localhost:5173", 
        credentials: true
    })
);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(globalLimiter);

app.use("/api", homeRouter);
app.use("/api", registerRouter);
app.use("/api", loginRouter);
app.use("/api", logoutRouter);

app.use("/api", profileRouter);
app.use("/api", updateProfileRouter);
app.use("/api", getProfileImageRouter);
app.use("/api", uploadProfileImageRouter);
app.use("/api", updatePasswordRouter);
app.use("/api", deleteProfileImageRouter);

app.use("/api", createAuctionRouter);
app.use("/api", getAuctionDetailsRouter);
app.use("/api", getMyAuctionsRouter);

app.use("/api", createBidRouter);
app.use("/api", getBidHistoryRouter);
app.use("/api", getMyBidsRouter);

app.use("/api", createCarRouter);
app.use("/api", getCarDetailsRouter);
app.use("/api", getMyCarsRouter);
app.use("/api", getCarImagesRouter);
app.use("/api", updateCarRouter);
app.use("/api", uploadCarImageRouter);
app.use("/api", deleteCarImageRouter);
app.use("/api", deleteCarRouter);



app.use("/api", contactUsRouter);

app.use("/api", jwtRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;