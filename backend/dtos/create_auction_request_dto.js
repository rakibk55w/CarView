const normalize = require("../utils/empty_string_normalizer");

class CreateAuctionRequestDto {
    constructor(auction, userId) {
        this.carId = normalize(auction.car_id);
        this.basePrice = normalize(auction.base_price);
        this.startTime = normalize(auction.start_time);
        this.endTime = normalize(auction.end_time);
        this.userId = normalize(userId);
    }

    static fromRequest(reqBody, ownerId) {
        return new CreateAuctionRequestDto(reqBody, ownerId);
    }
}

module.exports = CreateAuctionRequestDto;