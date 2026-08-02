const profileRepository = require("../repository/profile_repository");
const UpdateProfileRequestDto = require("../dtos/update_profile_request_dto");
const UpdateProfileResponseDto = require("../dtos/update_profile_response_dto");

const updateProfileController = async (req, res, next) => {
	try {
		const updateProfileRequestDto = UpdateProfileRequestDto.fromRequest(
			req.body
		);

		const auctionExists = await profileRepository.auctionExistCheck(
			req.user.id
		);

		if (auctionExists && updateProfileRequestDto.contact_number === null
			|| updateProfileRequestDto.date_of_birth === null
			|| updateProfileRequestDto.street_address === null
			|| updateProfileRequestDto.city === null
		) {
			return res.status(400).json({
				message: "Cannot save incomplete profile if you have created auctions previously."
			});
		}

		const newProfile = await profileRepository.updateProfile(
			req.user.id, 
			updateProfileRequestDto
		);

		return res.status(200).json(
			new UpdateProfileResponseDto(newProfile)
		);
	} catch (error) {
		next(error);
  	}
};

module.exports = updateProfileController;