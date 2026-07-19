const PLACEHOLDER = "https://placehold.co/600x600?text=Car";

const mockCars = [
    {
        id: 1,
        title: "2019 Toyota Corolla Hybrid Premium Edition",
        description:
            "Excellent condition with full service history. One owner. Reverse camera, cruise control, alloy wheels, Bluetooth connectivity and recently replaced tires.",
        image: PLACEHOLDER,
    },
    {
        id: 2,
        title: "2018 Honda Civic RS Turbo",
        description:
            "Turbocharged sedan with sporty appearance package. Leather seats, sunroof, adaptive cruise control and premium audio.",
        image: PLACEHOLDER,
    },
    {
        id: 3,
        title: "2020 Mazda CX-5 AWD",
        description:
            "Family SUV with AWD, Apple CarPlay, Android Auto, power tailgate and excellent fuel economy.",
        image: PLACEHOLDER,
    },
    {
        id: 4,
        title: "2019 Toyota Corolla Hybrid Premium Edition",
        description:
            "Excellent condition with full service history. One owner. Reverse camera, cruise control, alloy wheels, Bluetooth connectivity and recently replaced tires.",
        image: PLACEHOLDER,
    },
    {
        id: 5,
        title: "2018 Honda Civic RS Turbo",
        description:
            "Turbocharged sedan with sporty appearance package. Leather seats, sunroof, adaptive cruise control and premium audio.",
        image: PLACEHOLDER,
    },
    {
        id: 6,
        title: "2020 Mazda CX-5 AWD",
        description:
            "Family SUV with AWD, Apple CarPlay, Android Auto, power tailgate and excellent fuel economy.",
        image: PLACEHOLDER,
    },
    {
        id: 7,
        title: "2019 Toyota Corolla Hybrid Premium Edition",
        description:
            "Excellent condition with full service history. One owner. Reverse camera, cruise control, alloy wheels, Bluetooth connectivity and recently replaced tires.",
        image: PLACEHOLDER,
    },
    {
        id: 8,
        title: "2018 Honda Civic RS Turbo",
        description:
            "Turbocharged sedan with sporty appearance package. Leather seats, sunroof, adaptive cruise control and premium audio.",
        image: PLACEHOLDER,
    },
    {
        id: 9,
        title: "2020 Mazda CX-5 AWD",
        description:
            "Family SUV with AWD, Apple CarPlay, Android Auto, power tailgate and excellent fuel economy.",
        image: PLACEHOLDER,
    },
    {
        id: 10,
        title: "2019 Toyota Corolla Hybrid Premium Edition",
        description:
            "Excellent condition with full service history. One owner. Reverse camera, cruise control, alloy wheels, Bluetooth connectivity and recently replaced tires.",
        image: PLACEHOLDER,
    },
    {
        id: 11,
        title: "2018 Honda Civic RS Turbo",
        description:
            "Turbocharged sedan with sporty appearance package. Leather seats, sunroof, adaptive cruise control and premium audio.",
        image: PLACEHOLDER,
    },
    {
        id: 12,
        title: "2020 Mazda CX-5 AWD",
        description:
            "Family SUV with AWD, Apple CarPlay, Android Auto, power tailgate and excellent fuel economy.",
        image: PLACEHOLDER,
    },
    {
        id: 13,
        title: "2019 Toyota Corolla Hybrid Premium Edition",
        description:
            "Excellent condition with full service history. One owner. Reverse camera, cruise control, alloy wheels, Bluetooth connectivity and recently replaced tires.",
        image: PLACEHOLDER,
    },
    {
        id: 14,
        title: "2018 Honda Civic RS Turbo",
        description:
            "Turbocharged sedan with sporty appearance package. Leather seats, sunroof, adaptive cruise control and premium audio.",
        image: PLACEHOLDER,
    },
    {
        id: 15,
        title: "2020 Mazda CX-5 AWD",
        description:
            "Family SUV with AWD, Apple CarPlay, Android Auto, power tailgate and excellent fuel economy.",
        image: PLACEHOLDER,
    },
    {
        id: 16,
        title: "2019 Toyota Corolla Hybrid Premium Edition",
        description:
            "Excellent condition with full service history. One owner. Reverse camera, cruise control, alloy wheels, Bluetooth connectivity and recently replaced tires.",
        image: PLACEHOLDER,
    },
    {
        id: 17,
        title: "2018 Honda Civic RS Turbo",
        description:
            "Turbocharged sedan with sporty appearance package. Leather seats, sunroof, adaptive cruise control and premium audio.",
        image: PLACEHOLDER,
    },
    {
        id: 18,
        title: "2020 Mazda CX-5 AWD",
        description:
            "Family SUV with AWD, Apple CarPlay, Android Auto, power tailgate and excellent fuel economy.",
        image: PLACEHOLDER,
    },
    {
        id: 19,
        title: "2019 Toyota Corolla Hybrid Premium Edition",
        description:
            "Excellent condition with full service history. One owner. Reverse camera, cruise control, alloy wheels, Bluetooth connectivity and recently replaced tires.",
        image: PLACEHOLDER,
    },
    {
        id: 20,
        title: "2018 Honda Civic RS Turbo",
        description:
            "Turbocharged sedan with sporty appearance package. Leather seats, sunroof, adaptive cruise control and premium audio.",
        image: PLACEHOLDER,
    },
    {
        id: 21,
        title: "2020 Mazda CX-5 AWD",
        description:
            "Family SUV with AWD, Apple CarPlay, Android Auto, power tailgate and excellent fuel economy.",
        image: PLACEHOLDER,
    },
    {
        id: 22,
        title: "2019 Toyota Corolla Hybrid Premium Edition",
        description:
            "Excellent condition with full service history. One owner. Reverse camera, cruise control, alloy wheels, Bluetooth connectivity and recently replaced tires.",
        image: PLACEHOLDER,
    },
    {
        id: 23,
        title: "2018 Honda Civic RS Turbo",
        description:
            "Turbocharged sedan with sporty appearance package. Leather seats, sunroof, adaptive cruise control and premium audio.",
        image: PLACEHOLDER,
    },
    {
        id: 24,
        title: "2020 Mazda CX-5 AWD",
        description:
            "Family SUV with AWD, Apple CarPlay, Android Auto, power tailgate and excellent fuel economy.",
        image: PLACEHOLDER,
    },
    {
        id: 25,
        title: "2019 Toyota Corolla Hybrid Premium Edition",
        description:
            "Excellent condition with full service history. One owner. Reverse camera, cruise control, alloy wheels, Bluetooth connectivity and recently replaced tires.",
        image: PLACEHOLDER,
    },
    {
        id: 26,
        title: "2018 Honda Civic RS Turbo",
        description:
            "Turbocharged sedan with sporty appearance package. Leather seats, sunroof, adaptive cruise control and premium audio.",
        image: PLACEHOLDER,
    },
    {
        id: 27,
        title: "2020 Mazda CX-5 AWD",
        description:
            "Family SUV with AWD, Apple CarPlay, Android Auto, power tailgate and excellent fuel economy.",
        image: PLACEHOLDER,
    },
    {
        id: 28,
        title: "2019 Toyota Corolla Hybrid Premium Edition",
        description:
            "Excellent condition with full service history. One owner. Reverse camera, cruise control, alloy wheels, Bluetooth connectivity and recently replaced tires.",
        image: PLACEHOLDER,
    },
    {
        id: 29,
        title: "2018 Honda Civic RS Turbo",
        description:
            "Turbocharged sedan with sporty appearance package. Leather seats, sunroof, adaptive cruise control and premium audio.",
        image: PLACEHOLDER,
    },
    {
        id: 30,
        title: "2020 Mazda CX-5 AWD",
        description:
            "Family SUV with AWD, Apple CarPlay, Android Auto, power tailgate and excellent fuel economy.",
        image: PLACEHOLDER,
    },
    {
        id: 31,
        title: "2019 Toyota Corolla Hybrid Premium Edition",
        description:
            "Excellent condition with full service history. One owner. Reverse camera, cruise control, alloy wheels, Bluetooth connectivity and recently replaced tires.",
        image: PLACEHOLDER,
    },
    {
        id: 32,
        title: "2018 Honda Civic RS Turbo",
        description:
            "Turbocharged sedan with sporty appearance package. Leather seats, sunroof, adaptive cruise control and premium audio.",
        image: PLACEHOLDER,
    },
    {
        id: 33,
        title: "2020 Mazda CX-5 AWD",
        description:
            "Family SUV with AWD, Apple CarPlay, Android Auto, power tailgate and excellent fuel economy.",
        image: PLACEHOLDER,
    },
    {
        id: 34,
        title: "2019 Toyota Corolla Hybrid Premium Edition",
        description:
            "Excellent condition with full service history. One owner. Reverse camera, cruise control, alloy wheels, Bluetooth connectivity and recently replaced tires.",
        image: PLACEHOLDER,
    },
    {
        id: 35,
        title: "2018 Honda Civic RS Turbo",
        description:
            "Turbocharged sedan with sporty appearance package. Leather seats, sunroof, adaptive cruise control and premium audio.",
        image: PLACEHOLDER,
    },
    {
        id: 36,
        title: "2020 Mazda CX-5 AWD",
        description:
            "Family SUV with AWD, Apple CarPlay, Android Auto, power tailgate and excellent fuel economy.",
        image: PLACEHOLDER,
    },
    {
        id: 37,
        title: "2019 Toyota Corolla Hybrid Premium Edition",
        description:
            "Excellent condition with full service history. One owner. Reverse camera, cruise control, alloy wheels, Bluetooth connectivity and recently replaced tires.",
        image: PLACEHOLDER,
    },
    {
        id: 38,
        title: "2018 Honda Civic RS Turbo",
        description:
            "Turbocharged sedan with sporty appearance package. Leather seats, sunroof, adaptive cruise control and premium audio.",
        image: PLACEHOLDER,
    },
    {
        id: 39,
        title: "2020 Mazda CX-5 AWD",
        description:
            "Family SUV with AWD, Apple CarPlay, Android Auto, power tailgate and excellent fuel economy.",
        image: PLACEHOLDER,
    },
    {
        id: 40,
        title: "2019 Toyota Corolla Hybrid Premium Edition",
        description:
            "Excellent condition with full service history. One owner. Reverse camera, cruise control, alloy wheels, Bluetooth connectivity and recently replaced tires.",
        image: PLACEHOLDER,
    },
    {
        id: 41,
        title: "2018 Honda Civic RS Turbo",
        description:
            "Turbocharged sedan with sporty appearance package. Leather seats, sunroof, adaptive cruise control and premium audio.",
        image: PLACEHOLDER,
    },
    {
        id: 42,
        title: "2020 Mazda CX-5 AWD",
        description:
            "Family SUV with AWD, Apple CarPlay, Android Auto, power tailgate and excellent fuel economy.",
        image: PLACEHOLDER,
    },
    {
        id: 43,
        title: "2019 Toyota Corolla Hybrid Premium Edition",
        description:
            "Excellent condition with full service history. One owner. Reverse camera, cruise control, alloy wheels, Bluetooth connectivity and recently replaced tires.",
        image: PLACEHOLDER,
    },
    {
        id: 44,
        title: "2018 Honda Civic RS Turbo",
        description:
            "Turbocharged sedan with sporty appearance package. Leather seats, sunroof, adaptive cruise control and premium audio.",
        image: PLACEHOLDER,
    },
    {
        id: 45,
        title: "2020 Mazda CX-5 AWD",
        description:
            "Family SUV with AWD, Apple CarPlay, Android Auto, power tailgate and excellent fuel economy.",
        image: PLACEHOLDER,
    },
    {
        id: 46,
        title: "2019 Toyota Corolla Hybrid Premium Edition",
        description:
            "Excellent condition with full service history. One owner. Reverse camera, cruise control, alloy wheels, Bluetooth connectivity and recently replaced tires.",
        image: PLACEHOLDER,
    },
    {
        id: 47,
        title: "2018 Honda Civic RS Turbo",
        description:
            "Turbocharged sedan with sporty appearance package. Leather seats, sunroof, adaptive cruise control and premium audio.",
        image: PLACEHOLDER,
    },
    {
        id: 48,
        title: "2020 Mazda CX-5 AWD",
        description:
            "Family SUV with AWD, Apple CarPlay, Android Auto, power tailgate and excellent fuel economy.",
        image: PLACEHOLDER,
    },
];

export default mockCars;