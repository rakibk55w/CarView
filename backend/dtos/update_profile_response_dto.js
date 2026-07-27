class UpdateProfileResponseDto {
    constructor(profile) {
        this.message = "Profile updated successfully";
        this.data = {
            name: profile.name,
            email: profile.email,
            contact_number: profile.contact_number,
            date_of_birth: profile.date_of_birth,
            street_address: profile.street_address,
            city: profile.city,
            password_updated_at: profile.password_updated_at
        };
    }
}

module.exports = UpdateProfileResponseDto;