const normalize = require("../utils/empty_string_normalizer");

class CreateAuctionRequestDto {
    constructor(auction, ownerId) {
        this.car_id = normalize(auction.car_id);
        this.owner_id = normalize(ownerId);
        this.base_price = normalize(auction.base_price);
        this.start_time = normalize(auction.start_time);
        this.end_time = normalize(auction.end_time);
    }

    static fromRequest(reqBody, ownerId) {
        return new CreateAuctionRequestDto(reqBody, ownerId);
    }
}

module.exports = CreateAuctionRequestDto;