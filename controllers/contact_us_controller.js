const contactUsRepository = require("../repository/contact_us_repository");

const contactUsController = async (req, res, next) => {
    try {
        await contactUsRepository.sendMessage(
            req.body
        );

        return res.status(201).json({
            message: "Message sent successfully"
        });
    } catch (error) {
        next(error);
    }
    
};

module.exports = contactUsController;