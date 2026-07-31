const Joi = require("joi");

const createCarSchema = Joi.object({
    title: Joi.string()
        .trim()
        .max(200)
        .required(),

    description: Joi.string()
        .trim()
        .allow("", null),

    brand: Joi.string()
        .trim()
        .max(50)
        .required(),

    model: Joi.string()
        .trim()
        .max(50)
        .required(),

    trim: Joi.string()
        .trim()
        .max(20)
        .allow("", null),

    manufacture_year: Joi.number()
        .integer()
        .required(),

    fuel_type: Joi.string()
        .max(20)
        .required(),

    transmission_type: Joi.string()
        .max(20)
        .required(),

    drive_type: Joi.string()
        .trim()
        .max(10)
        .allow("", null),

    engine_capacity_cc: Joi.number()
        .integer()
        .allow(null),

    cylinder_count: Joi.number()
        .integer()
        .min(1)
        .max(99)
        .allow(null),

    battery_capacity_kwh: Joi.number()
        .precision(2)
        .allow(null),

    mileage_km: Joi.number()
        .integer()
        .min(0)
        .required(),

    color: Joi.string()
        .trim()
        .max(25)
        .allow("", null),

    driving_position: Joi.string()
        .trim()
        .max(10)
        .required(),

    body_type: Joi.string()
        .trim()
        .max(20)
        .required(),

    door_count: Joi.number()
        .integer()
        .min(1)
        .required(),

    seat_count: Joi.number()
        .integer()
        .min(1)
        .required(),

    registration_number: Joi.string()
        .trim()
        .max(50)
        .allow("", null),

    accident_history: Joi.boolean()
        .required(),

    service_warranty: Joi.boolean()
        .required(),

    ownership_count: Joi.number()
        .integer()
        .min(0)
        .required(),

    city: Joi.string()
        .trim()
        .max(50)
        .allow("", null)
});

module.exports = createCarSchema;
