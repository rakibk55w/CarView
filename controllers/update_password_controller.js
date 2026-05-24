const profileRepository = require("../repository/profile_repository");
const bcrypt = require("bcrypt");

const updatePasswordController = async (req, res, next) => {
    try {
        const currentPassword = await profileRepository.getPassword(
            req.user.id
        );

        const isMatch = await bcrypt.compare(
            req.body.current_password,
            currentPassword
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Current password is incorrect",
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.new_password, 10);

        await profileRepository.updatePassword(
            req.user.id,
            hashedPassword
        );

        return res.status(200).json({
            message: "Password changed successfully"
        });

    } catch (error) {
        next(error);
    }
}

module.exports = updatePasswordController;