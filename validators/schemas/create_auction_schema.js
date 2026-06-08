const Joi = require("joi");

const createAuctionSchema = Joi.object({
    car_id: Joi.string()
        .uuid()
        .required(),

    base_price: Joi.number()
        .positive()
        .precision(2)
        .required(),

    start_time: Joi.date()
        .iso()
        .required(),

    end_time: Joi.date()
        .iso()
        .greater(Joi.ref("start_time"))
        .required()
});

module.exports = createAuctionSchema;