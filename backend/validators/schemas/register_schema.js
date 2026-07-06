const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),

  email: Joi.string().trim().email().max(255).required(),

  password: Joi.string().trim().min(8).max(255).required(),
});

module.exports = registerSchema;
