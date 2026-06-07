const normalizer = require("../utils/empty_string_normalizer");

class UpdateProfileRequestDto {
    constructor(profile) {
        this.name = normalize(profile.name);
        this.email = normalize(profile.email);
        this.contact_number = normalize(profile.contact_number);
        this.date_of_birth = normalize(profile.date_of_birth);
        this.street_address = normalize(profile.street_address);
        this.city = normalize(profile.city);
    }

    static fromRequest(reqBody) {
        return new UpdateProfileRequestDto(reqBody);
    }
}

module.exports = UpdateProfileRequestDto;