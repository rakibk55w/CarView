const express = require("express");
const contactUsValidator = require("../validators/contact_us_validator");
const contactUsController = require("../controllers/contact_us_controller");

const contactUsRouter = express.Router();

contactUsRouter.post("/contact-us", contactUsValidator, contactUsController);

module.exports = contactUsRouter;