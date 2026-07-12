import AuctionCard from "../components/auction/AuctionCard";
import mockAuctions from "../data/mockAuctions";

export default function Home() {
    return (
        <div className="
            flex
            flex-col
            gap-6">
            {mockAuctions.map((auction) => (
                <AuctionCard
                    key={auction.id}
                    auction={auction}
                    onClick={(id) =>
                        console.log(
                            "Auction",
                            id
                        )
                    }
                />
            ))}
        </div>
    );
}