class CreateBidRequestDto {
    constructor(bid) {
        this.auction_id = bid.auction_id;
        this.bid_amount = bid.bid_amount;
    }

    static fromRequest(reqBody) {
        return new CreateBidRequestDto(reqBody);
    }
}

module.exports = CreateBidRequestDto;