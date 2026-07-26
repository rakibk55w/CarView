const Joi = require("joi");

const createBidSchema = Joi.object({
    auction_id: Joi.string()
        .uuid()
        .required(),

    bid_amount: Joi.number()
        .positive()
        .precision(2)
        .required()
});

module.exports = createBidSchema;