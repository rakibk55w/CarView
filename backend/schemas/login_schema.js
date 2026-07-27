const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email()
    .max(255)
    .required(),
  
  password: Joi.string()
    .trim()
    .max(255)
    .required(),
});

module.exports = loginSchema;
