const mockAuctions = [
    {
        id: 1,
        title:
            "2022 Toyota Corolla Cross Hybrid Premium Package with Full Service History",
        description:
            "Excellent condition with complete dealer service history. Accident free, original paint, leather seats, adaptive cruise control, Apple CarPlay, Android Auto, 360 camera and factory alloy wheels.",

        brand: "Toyota",
        model: "Corolla Cross",
        manufactureYear: 2022,

        status: "active",

        basePrice: 2500000,
        currentHighestBid: 2835000,

        endTime: "2026-07-15T20:30:00",

        images: [
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200",
            "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200",
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200",
        ],
    },

    {
        id: 2,
        title:
            "2021 Honda Civic RS Turbo",

        description:
            "Single owner vehicle with low mileage. Ceramic coated, factory navigation, paddle shifters and complete maintenance records.",

        brand: "Honda",
        model: "Civic RS",

        manufactureYear: 2021,

        status: "active",

        basePrice: 2150000,

        currentHighestBid: 2410000,

        endTime: "2026-07-12T18:00:00",

        images: [
            "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=1200",
            "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200",
        ],
    },

    {
        id: 3,

        title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            // "2018 BMW 530i M Sport",

        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            // "Imported M Sport package with panoramic sunroof, Harman Kardon sound system and adaptive suspension. Vehicle has been maintained exclusively by BMW authorized service center.",

        brand: "BMW",

        model: "530i",

        manufactureYear: 2018,

        status: "closed",

        basePrice: 4700000,

        currentHighestBid: 5510000,

        endTime: "2026-06-30T16:00:00",

        images: [
            "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200",
            "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200",
        ],
    },
];

export default mockAuctions;