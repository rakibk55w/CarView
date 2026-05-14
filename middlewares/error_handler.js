const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({"message": "Server error!"})
};

module.exports = errorHandler;