const mockAuctionDetails = {
    id: "auction-1",

    car: {
        id: "car-1",
        title: "2022 Toyota Corolla Hybrid G",
    },

    owner: {
        id: "user-123",
        name: "Rakib Khondokar",
    },

    created_at: "2026-07-18T10:30:00Z",
    start_time: "2026-07-19T10:30:00Z",
    end_time: "2026-07-25T10:30:00Z",

    status: "active",

    highest_bidder: null,

    base_price: 2500000,
    current_highest_bid: 2750000,

    extension_count: 2,

    bid_count: 24,

    bids: [
        {
            id: "bid-1",
            bidder: {
                id: "user-456",
                name: "Tanvir Ahmed",
            },
            bid_amount: 2750000,
            created_at: "2026-07-21T13:45:00Z",
        },
        {
            id: "bid-2",
            bidder: {
                id: "user-789",
                name: "Nusrat Jahan",
            },
            bid_amount: 2700000,
            created_at: "2026-07-21T12:30:00Z",
        },
        {
            id: "bid-3",
            bidder: {
                id: "user-234",
                name: "Sakib Hasan",
            },
            bid_amount: 2650000,
            created_at: "2026-07-21T11:15:00Z",
        },
        {
            id: "bid-4",
            bidder: {
                id: "user-567",
                name: "Mehedi Hasan",
            },
            bid_amount: 2600000,
            created_at: "2026-07-21T09:50:00Z",
        },
        {
            id: "bid-5",
            bidder: {
                id: "user-890",
                name: "Ayesha Rahman",
            },
            bid_amount: 2550000,
            created_at: "2026-07-21T08:20:00Z",
        },
        {
            id: "bid-6",
            bidder: {
                id: "user-456",
                name: "Tanvir Ahmed",
            },
            bid_amount: 2750000,
            created_at: "2026-07-21T13:45:00Z",
        },
        {
            id: "bid-7",
            bidder: {
                id: "user-789",
                name: "Nusrat Jahan",
            },
            bid_amount: 2700000,
            created_at: "2026-07-21T12:30:00Z",
        },
        {
            id: "bid-8",
            bidder: {
                id: "user-234",
                name: "Sakib Hasan",
            },
            bid_amount: 2650000,
            created_at: "2026-07-21T11:15:00Z",
        },
        {
            id: "bid-9",
            bidder: {
                id: "user-567",
                name: "Mehedi Hasan",
            },
            bid_amount: 2600000,
            created_at: "2026-07-21T09:50:00Z",
        },
        {
            id: "bid-10",
            bidder: {
                id: "user-890",
                name: "Ayesha Rahman",
            },
            bid_amount: 2550000,
            created_at: "2026-07-21T08:20:00Z",
        },
    ],
};

export default mockAuctionDetails;