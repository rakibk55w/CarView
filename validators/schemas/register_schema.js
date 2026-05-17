const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),

  email: Joi.string().email().max(255).required(),

  password: Joi.string().min(8).max(255).required(),

  contact_number: Joi.string().max(30).allow("", null),

  date_of_birth: Joi.date().allow(null),

  street_address: Joi.string().max(255).allow("", null),

  city: Joi.string().max(50).allow("", null),
});

module.exports = registerSchema;
