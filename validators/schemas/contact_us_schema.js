const Joi = require("joi");

const contactUsSchema = Joi.object({
    email: Joi.string()
        .trim()
        .email()
        .max(255)
        .required(),

    contact_number: Joi.string()
        .trim()
        .pattern(/^[0-9+\-\s()]+$/)
        .min(7)
        .max(20)
        .empty("")
        .default(null)
        .optional(),

    subject: Joi.string()
        .trim()
        .min(1)
        .max(50)
        .required(),

    message: Joi.string()
        .trim()
        .min(1)
        .max(500)
        .required()
});

module.exports = contactUsSchema;