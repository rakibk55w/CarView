import AuctionDetailsCard from "../components/auction/AuctionDetailsCard";
import BidHistory from "../components/bid/BidHistory";

import mockAuctionDetails from "../data/mockAuctionDetails";

export default function AuctionDetails() {
    return (
        <div className="
            mx-auto
            max-w-7xl
            px-4
            py-8">

            <div className="
                grid
                gap-8
                lg:grid-cols-[2fr_1fr]">

                <AuctionDetailsCard
                    auction={mockAuctionDetails}
                />

                <BidHistory
                    auction={mockAuctionDetails}
                />

            </div>
        </div>
    );
}