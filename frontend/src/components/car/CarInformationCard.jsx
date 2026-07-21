import { formStyle } from "../../utils/formStyle";

import CarInfoRow from "./CarInfoRow";

export default function CarInformationCard({
    car,
}) {
    return (
        <section className={formStyle}>

            <div className="
                mb-8
                flex
                items-start
                gap-4">

                <div className="
                    w-35
                    shrink-0
                    hidden
                    md:block"
                />

                <h2 className="
                    flex-1
                    text-center
                    text-2xl
                    font-semibold
                    leading-tight">
                    Car
                    <span className="
                        block
                        sm:inline">
                        {" "}Information
                    </span>
                </h2>

                <div className="
                    w-35
                    shrink-0
                    hidden
                    md:block"
                />

            </div>

            <div className="space-y-8">

                <div>
                    <h3 className="
                        mb-5
                        border-b
                        border-gray-200
                        pb-2
                        text-lg
                        font-semibold
                        dark:border-gray-700">
                        General
                    </h3>

                    <div className="space-y-6">

                        <CarInfoRow
                            label="Title"
                            value={car.title}
                        />

                        <CarInfoRow
                            label="Description"
                            value={car.description}
                            isMultiLineField={true}
                        />

                        <CarInfoRow
                            label="Brand"
                            value={car.brand}
                        />

                        <CarInfoRow
                            label="Model"
                            value={car.model}
                        />

                        <CarInfoRow
                            label="Trim"
                            value={car.trim}
                        />

                        <CarInfoRow
                            label="Manufacture Year"
                            value={car.manufacture_year}
                        />

                    </div>
                </div>

                <div>
                    <h3 className="
                        mb-5
                        border-b
                        border-gray-200
                        pb-2
                        text-lg
                        font-semibold
                        dark:border-gray-700">
                        Powertrain
                    </h3>

                    <div className="space-y-6">

                        <CarInfoRow
                            label="Fuel Type"
                            value={car.fuel_type}
                        />

                        <CarInfoRow
                            label="Transmission"
                            value={car.transmission_type}
                        />

                        <CarInfoRow
                            label="Drive Type"
                            value={car.drive_type}
                        />

                        <CarInfoRow
                            label="Engine Capacity"
                            value={
                                car.engine_capacity_cc !== null
                                    ? `${car.engine_capacity_cc} cc`
                                    : null
                            }
                        />

                        <CarInfoRow
                            label="Cylinder Count"
                            value={car.cylinder_count}
                        />

                        <CarInfoRow
                            label="Battery Capacity"
                            value={
                                car.battery_capacity_kwh !== null
                                    ? `${car.battery_capacity_kwh} kWh`
                                    : null
                            }
                        />

                    </div>
                </div>

                <div>
                    <h3 className="
                        mb-5
                        border-b
                        border-gray-200
                        pb-2
                        text-lg
                        font-semibold
                        dark:border-gray-700">
                        Vehicle
                    </h3>

                    <div className="space-y-6">

                        <CarInfoRow
                            label="Mileage"
                            value={
                                car.mileage_km !== null
                                    ? `${car.mileage_km.toLocaleString()} km`
                                    : null
                            }
                        />

                        <CarInfoRow
                            label="Color"
                            value={car.color}
                        />

                        <CarInfoRow
                            label="Driving Position"
                            value={car.driving_position}
                        />

                        <CarInfoRow
                            label="Body Type"
                            value={car.body_type}
                        />

                        <CarInfoRow
                            label="Door Count"
                            value={car.door_count}
                        />

                        <CarInfoRow
                            label="Seat Count"
                            value={car.seat_count}
                        />

                    </div>
                </div>

                <div>
                    <h3 className="
                        mb-5
                        border-b
                        border-gray-200
                        pb-2
                        text-lg
                        font-semibold
                        dark:border-gray-700">
                        Ownership & Registration
                    </h3>

                    <div className="space-y-6">

                        <CarInfoRow
                            label="Registration Number"
                            value={car.registration_number}
                        />

                        <CarInfoRow
                            label="Accident History"
                            value={
                                car.accident_history
                                    ? "Yes"
                                    : "No"
                            }
                        />

                        <CarInfoRow
                            label="Service Warranty"
                            value={
                                car.service_warranty
                                    ? "Yes"
                                    : "No"
                            }
                        />

                        <CarInfoRow
                            label="Previous Owners"
                            value={car.ownership_count}
                        />

                        <CarInfoRow
                            label="City"
                            value={car.city}
                        />

                    </div>
                </div>

            </div>
        </section>
    );
}