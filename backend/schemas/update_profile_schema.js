const Joi = require("joi");

const updateProfileSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required(),

  email: Joi.string()
    .trim()
    .email()
    .max(255)
    .allow("", null)
    .optional(),

  contact_number: Joi.string()
    .trim()
    .pattern(/^[0-9+\-\s()]+$/)
    .min(7)
    .max(20)
    .allow("", null)
    .optional(),

  date_of_birth: Joi.date()
    .max("now")
    .allow(null, "")
    .optional(),

  street_address: Joi.string()
    .trim()
    .max(255)
    .allow("", null)
    .optional(),

  city: Joi.string()
    .trim()
    .max(100)
    .allow("", null)
    .optional(),
});

module.exports = updateProfileSchema;