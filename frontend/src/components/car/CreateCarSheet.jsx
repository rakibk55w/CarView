import { Formik, Form } from "formik";
import {
    FiSave,
    FiX,
} from "react-icons/fi";

import PopupSheet from "../common/PopupSheet";
import CustomButton from "../button/CustomButton";
import FormField from "../form/FormField";
import CheckboxField from "../form/CheckBoxField";
import FormSection from "../form/FormSection";
import TextAreaField from "../form/TextAreaField";
import SelectField from "../form/SelectField";
import CarImagePicker from "./CarImagePicker";

import {
    createCarSchema,
    initialCreateCarValues,
} from "../../schemas/createCarSchema";

import {
    FUEL_TYPES,
    TRANSMISSION_TYPES,
    DRIVE_TYPES,
    DRIVING_POSITIONS,
    BODY_TYPES,
} from "../../constants/carOptions";
import axiosAuthInstance from "../../api/axiosAuthInstance";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

export default function CreateCarSheet({
    isOpen,
    onClose,
    onSuccess
}) {

    return (
        <PopupSheet isOpen={isOpen}>
            <Formik
                initialValues={initialCreateCarValues}
                validationSchema={createCarSchema}
                onSubmit={async (values, {resetForm}) => {
                    const { images, ...carData } = values;
                    let carId;

                    try {
                        const response = await axiosAuthInstance.post(
                            "/create-car", 
                            {
                                title: carData.title, 
                                description: carData.description, 
                                brand: carData.brand, 
                                model: carData.model, 
                                trim: carData.trim, 
                                manufacture_year: carData.manufactureYear, 
                                fuel_type: carData.fuelType, 
                                transmission_type: carData.transmissionType, 
                                drive_type: carData.driveType, 
                                engine_capacity_cc: carData.engineCapacityCc, 
                                cylinder_count: carData.cylinderCount, 
                                battery_capacity_kwh: carData.batteryCapacityKwh, 
                                mileage_km: carData.mileageKm, 
                                color: carData.color, 
                                driving_position: carData.drivingPosition, 
                                body_type: carData.bodyType, 
                                door_count: carData.doorCount, 
                                seat_count: carData.seatCount, 
                                registration_number: carData.registrationNumber, 
                                accident_history: carData.accidentHistory, 
                                service_warranty: carData.serviceWarranty, 
                                ownership_count: carData.ownershipCount, 
                                city: carData.city
                            }
                        );

                        showSuccessToast(
                            response.data.message || "Car has been saved successfully."
                        )

                        carId = response.data.data.id;
                        
                    } catch (error) {
                        showErrorToast(
                            error.response?.data?.message || "Failed to save car. Please try again."
                        )

                        return;
                    }

                    try {
                        const formData = new FormData();

                        images.forEach((image) =>
                            formData.append("images", image.file)
                        );

                        const response = await axiosAuthInstance.post(
                            `/cars/${carId}/images`,
                            formData
                        );

                        showSuccessToast(
                            response.data.message || "Car image uploaded successfully."
                        );
                    }
                    catch (error) {
                        showErrorToast(
                            error.response?.data?.message ??
                            "Could not upload images."
                        );
                    }

                    resetForm();
                    onSuccess?.();
                    onClose();
                }}>

                {({
                    values,
                    isSubmitting,
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
                        <Form className="space-y-5">
                            <div>
                                <h2 className="
                                    text-center
                                    text-3xl
                                    font-bold
                                    text-primary-600
                                    pt-6">

                                    Add New Car
                                </h2>
                            </div>

                            <FormSection title="General">
                                <div className="md:col-span-2">
                                    <FormField
                                        label="Title"
                                        name="title"
                                        type="text"
                                        placeholder="Enter title"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <TextAreaField
                                        label="Description"
                                        name="description"
                                        placeholder="Describe your vehicle"
                                        rows={5}
                                        maxLength={2000}
                                        showCharacterCount
                                    />
                                </div>

                                <FormField
                                    label="Brand"
                                    name="brand"
                                    type="text"
                                />

                                <FormField
                                    label="Model"
                                    name="model"
                                    type="text"
                                />

                                <FormField
                                    label="Trim"
                                    name="trim"
                                    type="text"
                                />

                                <FormField
                                    label="Manufacture Year"
                                    name="manufactureYear"
                                    type="number"
                                />
                            </FormSection>

                            <FormSection title="Powertrain">
                                <SelectField
                                    label="Fuel Type"
                                    name="fuelType"
                                    options={FUEL_TYPES}
                                />

                                <SelectField
                                    label="Transmission"
                                    name="transmissionType"
                                    options={TRANSMISSION_TYPES}
                                />

                                <SelectField
                                    label="Drive Type"
                                    name="driveType"
                                    options={DRIVE_TYPES}
                                />

                                {!isElectric && (
                                    <FormField
                                        label="Engine Capacity (cc)"
                                        name="engineCapacityCc"
                                        type="number"
                                    />
                                )}

                                {!isElectric && (
                                    <FormField
                                        label="Cylinder Count"
                                        name="cylinderCount"
                                        type="number"
                                    />
                                )}

                                {showBattery && (
                                    <FormField
                                        label="Battery Capacity (kWh)"
                                        name="batteryCapacityKwh"
                                        type="number"
                                        step="0.01"
                                    />
                                )}
                            </FormSection>

                            <FormSection title="Vehicle">
                                <FormField
                                    label="Mileage (km)"
                                    name="mileageKm"
                                    type="number"
                                />

                                <FormField
                                    label="Color"
                                    name="color"
                                    type="text"
                                />

                                <SelectField
                                    label="Driving Position"
                                    name="drivingPosition"
                                    options={DRIVING_POSITIONS}
                                />

                                <SelectField
                                    label="Body Type"
                                    name="bodyType"
                                    options={BODY_TYPES}
                                />

                                <FormField
                                    label="Door Count"
                                    name="doorCount"
                                    type="number"
                                />

                                <FormField
                                    label="Seat Count"
                                    name="seatCount"
                                    type="number"
                                />
                            </FormSection>

                            <FormSection title="Ownership & Registration">
                                <div className="md:col-span-2">

                                    <FormField
                                        label="Registration Number"
                                        name="registrationNumber"
                                        type="text"
                                    />
                                </div>

                                <FormField
                                    label="Previous Owners"
                                    name="ownershipCount"
                                    type="number"
                                />

                                <FormField
                                    label="City"
                                    name="city"
                                    type="text"
                                />

                                <CheckboxField
                                    label="Accident History"
                                    name="accidentHistory"
                                />

                                <CheckboxField
                                    label="Service Warranty"
                                    name="serviceWarranty"
                                />
                            </FormSection>

                            <FormSection title="Images">
                                <div className="md:col-span-2">
                                    <CarImagePicker
                                        name="images"
                                    />
                                </div>
                            </FormSection>

                            <div className="
                                sticky
                                bottom-0
                                -mx-5
                                pb-3
                                border-t
                                border-gray-200
                                bg-white
                                px-5
                                pt-3
                                dark:border-gray-700
                                dark:bg-gray-800
                                sm:-mx-8
                                sm:px-8
                                shadow-2xl">
                                <div className="
                                    flex
                                    flex-col-reverse
                                    gap-3
                                    sm:flex-row
                                    sm:justify-end">
                                    <CustomButton className="
                                        w-full
                                        sm:w-auto
                                        px-4"
                                        type="button"
                                        dangerButton={true}
                                        icon={ <FiX /> }
                                        disabled={isSubmitting}
                                        onClick={onClose}>

                                        Cancel
                                    </CustomButton>

                                    <CustomButton className="
                                        w-full
                                        sm:w-auto
                                        px-4"
                                        type="submit"
                                        icon={ <FiSave /> }
                                        disabled={isSubmitting}>

                                        {isSubmitting
                                            ? "Saving Car..."
                                            : "Save Car"
                                        }
                                    </CustomButton>
                                </div>
                            </div>                        
                        </Form>
                    );
                }}
            </Formik>
        </PopupSheet>
    );
}