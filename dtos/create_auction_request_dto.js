const normalize = require("../utils/empty_string_normalizer");

class CreateAuctionRequestDto {
    constructor(auction) {
        this.car_id = normalize(auction.car_id);
        this.base_price = normalize(auction.base_price);
        this.start_time = normalize(auction.start_time);
        this.end_time = normalize(auction.end_time);
    }

    static fromRequest(reqBody) {
        return new CreateAuctionRequestDto(reqBody);
    }
}

module.exports = CreateAuctionRequestDto;