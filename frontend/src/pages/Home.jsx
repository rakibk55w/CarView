import AuctionCard from "../components/auction/AuctionCard";
import mockAuctions from "../data/mockAuctions";

export default function Home() {
    return (
        <main
            className="
                mx-auto
                flex
                max-w-7xl
                flex-col
                gap-6

                px-4
                py-8

                sm:px-6
                lg:px-8
            "
        >
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
        </main>
    );
}