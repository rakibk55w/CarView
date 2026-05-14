const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const homeRouter = require("./routes/home_route");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use("/api", homeRouter)

app.use((req, res) => {
    res.status(404).json({
        "message": "Page not found"
    });
})

app.use((err, req, res, next) => {
    res.status(500).json({"message": "Server error!"})
})


module.exports = app;