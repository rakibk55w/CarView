const Joi = require("joi");

const updatePasswordSchema = Joi.object({
  current_password: Joi.string().trim().min(8).max(255).required(),
  new_password: Joi.string().trim().min(8).max(255).required()
});

module.exports = updatePasswordSchema;