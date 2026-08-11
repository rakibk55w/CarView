import { Formik, Form } from "formik";
import { useState } from "react";
import {
    FiEdit2,
    FiSave,
    FiTrash2,
    FiX,
} from "react-icons/fi";

import CustomButton from "../button/CustomButton";
import CarInfoRow from "./CarInfoRow";

import {
    createCarSchema,
} from "../../schemas/createCarSchema";

import {
    FUEL_TYPES,
    TRANSMISSION_TYPES,
    DRIVE_TYPES,
    DRIVING_POSITIONS,
    BODY_TYPES,
} from "../../constants/carOptions";

import { formStyle } from "../../utils/formStyle";

import axiosAuthInstance from "../../api/axiosAuthInstance";

import {
    showErrorToast,
    showSuccessToast,
} from "../../utils/toast";
import FormSection from "../form/FormSection";

export default function CarInformationCard({
    car,
    setCar,
    isOwnCar,
    isLoading,
    onCarDelete,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    if (isLoading) {
        return (
            <section className={formStyle}>
                <div className="
                    mb-8
                    flex
                    items-start
                    gap-4">

                    <div className="
                        hidden
                        h-10
                        w-35
                        animate-pulse
                        rounded-lg
                        bg-gray-200
                        dark:bg-gray-700
                        md:block"
                    />

                    <div className="
                        h-8
                        flex-1
                        animate-pulse
                        rounded-lg
                        bg-gray-200
                        dark:bg-gray-700"
                    />

                    <div className="
                        h-10
                        w-35
                        animate-pulse
                        rounded-lg
                        bg-gray-200
                        dark:bg-gray-700"
                    />
                </div>

                <div className="space-y-8">
                    {[...Array(4)].map((_, sectionIndex) => (
                        <section key={sectionIndex}>
                            <div className="
                                mb-6
                                h-8
                                w-60
                                animate-pulse
                                rounded
                                bg-gray-200
                                dark:bg-gray-700
                                mx-auto"
                            />

                            <div className="
                                grid
                                gap-6
                                md:grid-cols-2">
                                {[...Array(6)].map((_, rowIndex) => (
                                    <div className="space-y-2"
                                        key={rowIndex}>
                                        <div className="
                                            h-5
                                            w-32
                                            animate-pulse
                                            rounded
                                            bg-gray-200
                                            dark:bg-gray-700"
                                        />

                                        <div className="
                                            h-10
                                            w-full
                                            animate-pulse
                                            rounded-lg
                                            bg-gray-200
                                            dark:bg-gray-700"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <Formik
            enableReinitialize
            initialValues={{
                title: car?.title ?? "",
                description: car?.description ?? "",
                brand: car?.brand ?? "",
                model: car?.model ?? "",
                trim: car?.trim ?? "",
                manufactureYear: car?.manufacture_year ?? "",

                fuelType: car?.fuel_type ?? "",
                transmissionType: car?.transmission_type ?? "",
                driveType: car?.drive_type ?? "",
                engineCapacityCc: car?.engine_capacity_cc ?? "",
                cylinderCount: car?.cylinder_count ?? "",
                batteryCapacityKwh: car?.battery_capacity_kwh ?? "",

                mileageKm: car?.mileage_km ?? "",
                color: car?.color ?? "",
                drivingPosition: car?.driving_position ?? "",
                bodyType: car?.body_type ?? "",
                doorCount: car?.door_count ?? "",
                seatCount: car?.seat_count ?? "",

                registrationNumber: car?.registration_number ?? "",
                accidentHistory: car?.accident_history ?? false,
                serviceWarranty: car?.service_warranty ?? false,
                ownershipCount: car?.ownership_count ?? 0,
                city: car?.city || "",
            }}
            validationSchema={createCarSchema}
            onSubmit={async (values) => {
                try {
                    setIsSaving(true);

                    const response = await axiosAuthInstance.put(
                        `/cars/${car.id}`,
                        {
                            title: values.title,
                            description: values.description,
                            brand: values.brand,
                            model: values.model,
                            trim: values.trim,
                            manufacture_year: values.manufactureYear,

                            fuel_type: values.fuelType,
                            transmission_type: values.transmissionType,
                            drive_type: values.driveType,
                            engine_capacity_cc: values.engineCapacityCc,
                            cylinder_count: values.cylinderCount,
                            battery_capacity_kwh: values.batteryCapacityKwh,

                            mileage_km: values.mileageKm,
                            color: values.color,
                            driving_position: values.drivingPosition,
                            body_type: values.bodyType,
                            door_count: values.doorCount,
                            seat_count: values.seatCount,

                            registration_number: values.registrationNumber,

                            accident_history: values.accidentHistory,

                            service_warranty: values.serviceWarranty,

                            ownership_count: values.ownershipCount,

                            city: values.city,
                        }
                    );

                    setCar({
                        ...car,

                        title: values.title,
                        description: values.description,
                        brand: values.brand,
                        model: values.model,
                        trim: values.trim,
                        manufacture_year: values.manufactureYear,

                        fuel_type: values.fuelType,

                        transmission_type: values.transmissionType,

                        drive_type: values.driveType,

                        engine_capacity_cc: values.engineCapacityCc,

                        cylinder_count: values.cylinderCount,

                        battery_capacity_kwh: values.batteryCapacityKwh,

                        mileage_km: values.mileageKm,

                        color: values.color,

                        driving_position: values.drivingPosition,

                        body_type: values.bodyType,

                        door_count: values.doorCount,

                        seat_count: values.seatCount,

                        registration_number: values.registrationNumber,

                        accident_history: values.accidentHistory,

                        service_warranty: values.serviceWarranty,

                        ownership_count: values.ownershipCount,

                        city: values.city,
                    });

                    setIsEditing(false);

                    showSuccessToast(
                        response.data.message ||
                        "Car updated successfully."
                    );
                }
                catch (error) {
                    showErrorToast(
                        error.response?.data?.message ||
                        "Failed to update car."
                    );
                }
                finally {
                    setIsSaving(false);
                }
            }}>
            
            {({
                values,
                resetForm,
            }) => {

                const isElectric =
                    values.fuelType ===
                    "Electric";

                const showBattery =
                    values.fuelType ===
                        "Electric" ||
                    values.fuelType ===
                        "Hybrid";
            
        
                return (
                    <Form className={formStyle}>

                        <div className="
                            mb-8
                            flex
                            items-start
                            gap-4">

                            <div className={`
                                ${isEditing ? "hidden" : "hidden md:block"}
                                w-35
                                shrink-0`}
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

                            {!isEditing && isOwnCar && (
                                <CustomButton className="
                                    w-auto
                                    px-4"
                                    primaryButton={false}
                                    icon={<FiEdit2 />}
                                    onClick={() => setIsEditing(true)}>

                                    Edit Car

                                </CustomButton>
                            )}

                            {!isOwnCar && (
                                <div className="
                                    hidden
                                    w-35
                                    shrink-0
                                    md:block"
                                />
                            )}
                        </div>

                        <div className="space-y-8">
                            <FormSection title="General">
                                <div className="md:col-span-2">
                                    <CarInfoRow
                                        label="Title"
                                        fieldName="title"
                                        value={values.title}
                                        isEditing={isEditing}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <CarInfoRow
                                        label="Description"
                                        fieldName="description"
                                        value={values.description}
                                        isEditing={isEditing}
                                        isMultiLineField={true}
                                    />
                                </div>

                                <CarInfoRow
                                    label="Brand"
                                    fieldName="brand"
                                    value={values.brand}
                                    isEditing={isEditing}
                                />

                                <CarInfoRow
                                    label="Model"
                                    fieldName="model"
                                    value={values.model}
                                    isEditing={isEditing}
                                />

                                <CarInfoRow
                                    label="Trim"
                                    fieldName="trim"
                                    value={values.trim}
                                    isEditing={isEditing}
                                />

                                <CarInfoRow
                                    label="Manufacture Year"
                                    fieldName="manufactureYear"
                                    fieldType="number"
                                    value={values.manufactureYear}
                                    isEditing={isEditing}
                                />
                            </FormSection>

                            <FormSection title="Powertrain">
                                <CarInfoRow
                                    label="Fuel Type"
                                    fieldName="fuelType"
                                    fieldType="select"
                                    options={FUEL_TYPES}
                                    value={values.fuelType}
                                    isEditing={isEditing}
                                />

                                <CarInfoRow
                                    label="Transmission"
                                    fieldName="transmissionType"
                                    fieldType="select"
                                    options={TRANSMISSION_TYPES}
                                    value={values.transmissionType}
                                    isEditing={isEditing}
                                />

                                <CarInfoRow
                                    label="Drive Type"
                                    fieldName="driveType"
                                    fieldType="select"
                                    options={DRIVE_TYPES}
                                    value={values.driveType}
                                    isEditing={isEditing}
                                />

                                {!isElectric && (
                                    <CarInfoRow
                                        label="Engine Capacity"
                                        fieldName="engineCapacityCc"
                                        fieldType="number"
                                        value={
                                            values.engineCapacityCc !== null
                                                ? `${values.engineCapacityCc} cc`
                                                : null
                                        }
                                        isEditing={isEditing}
                                    />
                                )}

                                {!isElectric && (
                                    <CarInfoRow
                                        label="Cylinder Count"
                                        fieldName="cylinderCount"
                                        fieldType="number"
                                        value={values.cylinderCount}
                                        isEditing={isEditing}
                                    />
                                )}

                                {showBattery && (
                                    <CarInfoRow
                                        label="Battery Capacity"
                                        fieldName="batteryCapacityKwh"
                                        fieldType="number"
                                        value={
                                            values.batteryCapacityKwh !== null
                                                ? `${values.batteryCapacityKwh} kWh`
                                                : null
                                        }
                                        isEditing={isEditing}
                                    />
                                )}
                            </FormSection>

                            <FormSection title="Vehicle">
                                <CarInfoRow
                                    label="Mileage"
                                    fieldName="mileageKm"
                                    value={
                                        values.mileageKm !== null
                                            ? `${Number(values.mileageKm).toLocaleString()} km`
                                            : null
                                    }
                                    isEditing={isEditing}
                                />

                                <CarInfoRow
                                    label="Color"
                                    fieldName="color"
                                    value={values.color}
                                    isEditing={isEditing}
                                />

                                <CarInfoRow
                                    label="Driving Position"
                                    fieldName="drivingPosition"
                                    fieldType="select"
                                    options={DRIVING_POSITIONS}
                                    value={values.drivingPosition}
                                    isEditing={isEditing}
                                />

                                <CarInfoRow
                                    label="Body Type"
                                    fieldName="bodyType"
                                    fieldType="select"
                                    options={BODY_TYPES}
                                    value={values.bodyType}
                                    isEditing={isEditing}
                                />

                                <CarInfoRow
                                    label="Door Count"
                                    fieldName="doorCount"
                                    fieldType="number"
                                    value={values.doorCount}
                                    isEditing={isEditing}
                                />

                                <CarInfoRow
                                    label="Seat Count"
                                    fieldName="seatCount"
                                    fieldType="number"
                                    value={values.seatCount}
                                    isEditing={isEditing}
                                />
                            </FormSection>

                            <FormSection title="Ownership & Registration">
                                <div className="md:col-span-2">
                                    <CarInfoRow
                                        label="Registration Number"
                                        fieldName="registrationNumber"
                                        value={values.registrationNumber}
                                        isEditing={isEditing}
                                    />
                                </div>

                                <CarInfoRow
                                    label="Previous Owners"
                                    fieldName="ownershipCount"
                                    fieldType="number"
                                    value={values.ownershipCount}
                                    isEditing={isEditing}
                                />

                                <CarInfoRow
                                    label="City"
                                    fieldName="city"
                                    value={values.city}
                                    isEditing={isEditing}
                                />

                                <CarInfoRow
                                    label="Accident History"
                                    fieldName="accidentHistory"
                                    value={
                                        values.accidentHistory
                                            ? "Yes"
                                            : "No"
                                    }
                                    isEditing={isEditing}
                                    isCheckbox={true}
                                />

                                <CarInfoRow
                                    label="Service Warranty"
                                    fieldName="serviceWarranty"
                                    value={
                                        values.serviceWarranty
                                            ? "Yes"
                                            : "No"
                                    }
                                    isEditing={isEditing}
                                    isCheckbox={true}
                                />
                            </FormSection>

                            {isEditing && (
                                <div className="
                                    flex
                                    justify-between
                                    items-center
                                    gap-3
                                    pt-8">

                                    <CustomButton className="
                                        w-auto
                                        px-4"
                                        dangerButton={true}
                                        icon={<FiTrash2 />}
                                        onClick={onCarDelete}>

                                        Delete Car
                                    </CustomButton>

                                    <div className="
                                        flex
                                        justify-end
                                        gap-3">

                                        <CustomButton className="
                                            w-auto
                                            px-4"
                                            dangerButton={true}
                                            icon={<FiX />}
                                            onClick={() => {
                                                resetForm();
                                                setIsEditing(false);
                                            }}>

                                            Cancel
                                        </CustomButton>

                                        <CustomButton className="
                                            w-auto
                                            px-4"
                                            type="submit"
                                            disabled={isSaving}
                                            icon={<FiSave />}>

                                            {isSaving ? "Saving..." : "Save Car"}
                                        </CustomButton>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}
