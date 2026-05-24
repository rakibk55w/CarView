const profileRepository = require("../repository/profile_repository");

const normalize = (value) => value === "" ? null : value;

const updateProfileController = async (req, res, next) => {
  try {
    const updateData = {
        name: normalize(req.body.name),
        email: normalize(req.body.email),
        contact_number: normalize(req.body.contact_number),
        date_of_birth: normalize(req.body.date_of_birth),
        street_address: normalize(req.body.street_address),
        city: normalize(req.body.city)
    };
    const newProfile = await profileRepository.updateProfile(req.user.id, updateData);

    return res.status(200).json({
      message: "Profile updated successfully",
      data: newProfile,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateProfileController;