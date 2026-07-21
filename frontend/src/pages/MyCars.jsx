import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarCard from "../components/car/CarCard";
import Pagination from "../components/pagination/Pagination";
import mockCars from "../data/mockCars";

const LIMIT = 5;

export default function MyCars() {
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(mockCars.length / LIMIT);

    const displayedCars = useMemo(() => {
        const offset = (page - 1) * LIMIT;

        return mockCars.slice(
            offset,
            offset + LIMIT
        );
    }, [page]);

    const navigate = useNavigate();

    return (
        <section className="
            mx-auto
            max-w-5xl
            px-4
            py-8">
            <h1 className="
                mb-8
                text-3xl
                font-bold
                text-primary-600">
                My Cars
            </h1>

            <div className="
                flex
                flex-col
                items-center
                gap-5">
                {displayedCars.map((car) => (
                    <CarCard
                        key={car.id}
                        car={car}
                        onClick={() => navigate(`/cars/${car.id}`)}
                    />
                ))}
            </div>

            <div className="
                mt-10
                flex
                justify-center">
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>
        </section>
    );
}