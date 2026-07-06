const profileRepository = require("../repository/profile_repository");
const UpdateProfileRequestDto = require("../dtos/update_profile_request_dto");
const UpdateProfileResponseDto = require("../dtos/update_profile_response_dto");

const updateProfileController = async (req, res, next) => {
  try {
    const updateProfileRequestDto = UpdateProfileRequestDto.fromRequest(req.body);
    const newProfile = await profileRepository.updateProfile(req.user.id, updateProfileRequestDto);

    return res.status(200).json(new UpdateProfileResponseDto(newProfile));
  } catch (error) {
    next(error);
  }
};

module.exports = updateProfileController;