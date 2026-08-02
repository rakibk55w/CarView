import { useEffect, useRef, useState } from "react";
import { useField } from "formik";
import { FiChevronDown, FiLoader } from "react-icons/fi";
import CarCard from "./CarCard";
import axiosAuthInstance from "../../api/axiosAuthInstance";
import { showErrorToast } from "../../utils/toast";
import { normalFieldStyle, errorFieldStyle } from "../../utils/fieldStyles";

const LIMIT = 5;

export default function CarSelectorField({
    label = "Select Car",
    ...props
}) {
    const [field, meta, helpers] = useField(props);

    const [isOpen, setIsOpen] = useState(false);
    const [cars, setCars] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    const dropdownRef = useRef(null);
    const optionsRef = useRef(null);

    const selectedCar = cars.find(
        (car) => car.id === field.value
    );

    const hasError = meta.touched && meta.error;

    const fetchCars = async (pageToFetch) => {
        if (
            isLoading ||
            pageToFetch > totalPages
        ) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await axiosAuthInstance.get(
                    "/my-cars",
                    {
                        params: {
                            page: pageToFetch,
                            limit: LIMIT,
                        },
                    }
                );

            const {
                items,
                page: currentPage,
                totalPages: fetchedTotalPages,
            } = response.data;

            setCars((previousCars) =>
                currentPage === 1
                    ? items
                    : [...previousCars, ...items]
            );

            setPage(currentPage);
            setTotalPages(fetchedTotalPages);
            setHasLoaded(true);
        } catch (error) {
            showErrorToast(
                error.response?.data?.message ||
                    "Failed to load your cars."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpen = () => {
        helpers.setTouched(true);
        setIsOpen((previous) => !previous);

        if (!hasLoaded) {
            fetchCars(1);
        }
    };

    const handleSelect = (car) => {
        helpers.setValue(car.id);
        setIsOpen(false);
    };

    const handleScroll = () => {
        const container = optionsRef.current;

        if (!container || isLoading) {
            return;
        }

        const isNearBottom =
            container.scrollTop +
            container.clientHeight >=
            container.scrollHeight - 50;

        const hasMoreCars = page < totalPages;

        if (isNearBottom && hasMoreCars) {
            fetchCars(page + 1);
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(
                    event.target
                )
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);

    return (
        <div ref={dropdownRef}>
            <label className="
                mb-2
                block
                font-medium">

                {label}
            </label>

            <button className={`
                flex
                w-full
                items-center
                justify-between
                rounded-lg
                border
                px-4
                py-2
                text-left
                outline-none
                transition-colors
                dark:bg-gray-900

                ${
                    hasError
                        ? errorFieldStyle
                        : normalFieldStyle
                }`}
                type="button"
                onClick={handleOpen}>

                <span className={
                    selectedCar
                        ? ""
                        : "text-gray-500"}>

                    {selectedCar
                        ? `${selectedCar.title}`
                        : "Select a car"}
                </span>

                <FiChevronDown className={`
                    transition-transform
                    ${
                        isOpen
                            ? "rotate-180"
                            : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div className="
                    relative
                    mt-2
                    overflow-hidden
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    shadow-lg
                    dark:border-gray-700
                    dark:bg-gray-800">

                    <div className="
                        max-h-112
                        overflow-y-auto
                        p-3"
                        ref={optionsRef}
                        onScroll={handleScroll}>

                        {cars.map((car) => (
                            <div className={`
                                mb-3
                                cursor-pointer
                                rounded-xl
                                transition
                                last:mb-0

                                ${
                                    field.value === car.id
                                        ? `ring-2 
                                        ring-primary-500`
                                        : `hover:ring-2 
                                        hover:ring-gray-300 
                                        dark:hover:ring-gray-600`
                                }`}
                                key={car.id}
                                onClick={() =>
                                    handleSelect(car)
                                }>
                                <CarCard 
                                    car={car} 
                                    showHover={false}
                                />
                            </div>
                        ))}

                        {isLoading && cars.length === 0 && (
                            <div className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                py-8
                                text-sm
                                text-gray-500
                                dark:text-gray-400">
                                <FiLoader className="
                                    animate-spin" 
                                />

                                Loading your cars...
                            </div>
                        )}

                        {isLoading && cars.length > 0 && (
                            <div className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                py-4
                                text-sm
                                text-gray-500
                                dark:text-gray-400">
                                <FiLoader className="
                                    animate-spin" 
                                />

                                Loading more cars...
                            </div>
                        )}

                        {!isLoading && hasLoaded && cars.length === 0 && (
                            <p className="
                                py-8
                                text-center
                                text-sm
                                text-gray-500
                                dark:text-gray-400">

                                You don't have any cars registered.
                            </p>
                        )}

                        {!isLoading && cars.length > 0 && page >= totalPages && (
                            <p className="
                                py-4
                                text-center
                                text-sm
                                text-gray-500
                                dark:text-gray-400">

                                No more cars to load.
                            </p>
                        )}
                    </div>
                </div>
            )}

            {hasError && (
                <p className="
                    mt-1
                    text-sm
                    text-red-500">

                    {meta.error}
                </p>
            )}
        </div>
    );
}