import AuctionCard from "../components/auction/AuctionCard";
import mockAuctions from "../data/mockAuctions";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="
            flex
            flex-col
            gap-6">
            {mockAuctions.map((auction) => (
                <AuctionCard
                    key={auction.id}
                    auction={auction}
                    onClick={() => navigate(`/auctions/${auction.id}`)
                    }
                />
            ))}
        </div>
    );
}