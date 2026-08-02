import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarCard from "../components/car/CarCard";
import CarCardSkeleton from "../components/car/CarCardSkeleton";
import Pagination from "../components/pagination/Pagination";
import axiosAuthInstance from "../api/axiosAuthInstance";
import { showErrorToast } from "../utils/toast";
import CreateButton from "../components/button/CreateButton";
import CreateCarSheet from "../components/car/CreateCarSheet";

const LIMIT = 5;

export default function MyCars() {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateCarSheetOpen, setIsCreateCarSheetOpen] = useState(false);

    const [refreshKey, setRefreshKey] = useState(0);

    const handleCreateCar = () => {
        setIsCreateCarSheetOpen(true);
    };

    const handleCarCreated = () => {
        setPage(1);
        setRefreshKey((prev) => prev + 1);
    };

    useEffect(() => {
        const fetchMyCars = async () => {
            try {
                setIsLoading(true);

                const response = await axiosAuthInstance.get(
                    "/my-cars",
                    {
                        params: {
                            page,
                            limit: LIMIT,
                        },
                    }
                );

                setCars(response.data.items);
                setTotalPages(
                    response.data.totalPages
                );
            } catch (error) {
                showErrorToast(
                    error.response?.data?.message ||
                    "Failed to fetch your cars"
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchMyCars();
    }, [page, refreshKey]);

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

            <CreateButton className="
                mb-6
                w-38"
                title="Add New Car"
                onClick={handleCreateCar}
            />

            <div className="
                flex
                flex-col
                items-center
                gap-5">
                {isLoading ? (
                    Array.from({ length: LIMIT }).map(
                        (_, index) => (
                            <CarCardSkeleton
                                key={index}
                            />
                        )
                    )
                ) : cars.length === 0 ? (
                    <div className="
                        py-12
                        text-center
                        text-gray-500
                        dark:text-gray-400">
                        You haven't added any cars yet.
                    </div>
                ) : (
                    cars.map((car) => (
                        <CarCard
                            key={car.id}
                            car={car}
                            onClick={() =>
                                navigate(
                                    `/cars/${car.id}`
                                )
                            }
                        />
                    ))
                )}
            </div>

            {!isLoading && totalPages > 1 && (
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
            )}

            <CreateCarSheet
                isOpen={isCreateCarSheetOpen}
                onClose={() =>
                    setIsCreateCarSheetOpen(false)
                }
                onSuccess={handleCarCreated}
            />
        </section>
    );
}