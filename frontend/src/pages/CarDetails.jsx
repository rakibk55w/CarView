import CarPictureCard from "../components/car/CarPictureCard";
import CarInformationCard from "../components/car/CarInformationCard";
import mockCarDetails from "../data/mockCarDetails";
import { useParams } from "react-router-dom";

export default function CarDetails() {
    const { carId } = useParams();

    console.log(carId);
    
    return (
        <div className="
            mx-auto
            max-w-7xl
            px-4
            py-8">
            <div className="
                grid
                gap-8
                lg:grid-cols-[420px_1fr]">

                <CarPictureCard
                    images={mockCarDetails.images}
                    title={mockCarDetails.title}
                />

                <CarInformationCard
                    car={mockCarDetails}
                />
            </div>
        </div>
    );
}