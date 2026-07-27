const Joi = require("joi");

const updatePasswordSchema = Joi.object({
  current_password: Joi.string()
    .trim()
    .max(255)
    .required(),

  new_password: Joi.string()
    .trim()
    .min(8)
    .max(255)
    .pattern(/[A-Z]/, "uppercase")
    .pattern(/[a-z]/, "lowercase")
    .pattern(/[0-9]/, "number")
    .pattern(/[^A-Za-z0-9]/, "special character")
    .required()
});

module.exports = updatePasswordSchema;