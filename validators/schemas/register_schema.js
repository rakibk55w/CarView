const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),

  email: Joi.string().email().max(255).required(),

  password: Joi.string().min(8).max(255).required(),
});

module.exports = registerSchema;
