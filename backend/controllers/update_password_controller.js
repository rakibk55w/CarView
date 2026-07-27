const profileRepository = require("../repository/profile_repository");
const UpdatePasswordRequestDto = require("../dtos/update_password_request_dto");
const bcrypt = require("bcrypt");

const updatePasswordController = async (req, res, next) => {
    try {
        const updatePasswordDto = UpdatePasswordRequestDto.fromRequest(req.body);
        const currentPassword = await profileRepository.getPassword(
            req.user.id
        );

        const isMatch = await bcrypt.compare(
            updatePasswordDto.currentPassword,
            currentPassword
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Current password is incorrect",
            });
        }
        const hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, 10);

        const currentPasswordTime = await profileRepository.updatePassword(
            req.user.id,
            hashedPassword
        );

        return res.status(200).json({
            message: "Password changed successfully",
            data: { password_updated_at: currentPasswordTime }
        });

    } catch (error) {
        next(error);
    }
}

module.exports = updatePasswordController;