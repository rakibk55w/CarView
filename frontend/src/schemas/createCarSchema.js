import * as Yup from "yup";

const GASOLINE = "Gasoline / Petrol / Octane";
const DIESEL = "Diesel";
const HYBRID = "Hybrid";
const ELECTRIC = "Electric";
const CNG = "CNG / LPG";

export const initialCreateCarValues = {
    title: "",
    description: "",

    brand: "",
    model: "",
    trim: "",

    manufactureYear: "",

    fuelType: "",
    transmissionType: "",
    driveType: "",

    engineCapacityCc: "",
    cylinderCount: "",
    batteryCapacityKwh: "",

    mileageKm: "",

    color: "",

    drivingPosition: "",
    bodyType: "",

    doorCount: "",
    seatCount: "",

    registrationNumber: "",

    accidentHistory: false,
    serviceWarranty: false,

    ownershipCount: "",

    city: "",

    images: [],
};

export const createCarSchema = Yup.object({
    title: Yup.string()
        .trim()
        .max(
            200,
            "Title must not exceed 200 characters."
        )
        .required("Title is required."),

    description: Yup.string()
        .trim()
        .nullable(),

    brand: Yup.string()
        .trim()
        .max(
            50,
            "Brand name must not exceed 50 characters."
        )
        .required("Brand is required."),

    model: Yup.string()
        .trim()
        .max(
            50,
            "Model name must not exceed 50 characters."
        )
        .required("Model is required."),

    trim: Yup.string()
        .trim()
        .max(
            20,
            "Trim must not exceed 20 characters."
        )
        .nullable(),

    manufactureYear: Yup.number()
        .typeError("Manufacture year should be a number.")
        .integer("Manufacture year must be valid.")
        .min(
            1886,
            "Please enter a valid manufacture year."
        )
        .max(
            new Date().getFullYear(),
            "Manufacture year cannot be in the future."
        )
        .required("Manufacture year is required."),

    fuelType: Yup.string()
        .required("Fuel type is required."),

    transmissionType: Yup.string()
        .required("Transmission type is required."),

    driveType: Yup.string()
        .nullable(),

    engineCapacityCc: Yup.number()
        .transform((value, originalValue) =>
            originalValue === ""
                ? null
                : value
        )
        .nullable()
        .integer(
            "Engine capacity must be a whole number."
        )
        .min(
            1,
            "Engine capacity must be greater than 0."
        )
        .when("fuelType", {
            is: (fuelType) =>
                [
                    GASOLINE,
                    DIESEL,
                    HYBRID,
                    CNG,
                ].includes(fuelType),

            then: (schema) =>
                schema.required(
                    "Engine capacity is required."
                ),

            otherwise: (schema) =>
                schema.nullable(),
        }),

    cylinderCount: Yup.number()
        .transform((value, originalValue) =>
            originalValue === ""
                ? null
                : value
        )
        .nullable()
        .integer(
            "Cylinder count must be a whole number."
        )
        .min(
            1,
            "Cylinder count must be at least 1."
        )
        .when("fuelType", {
            is: (fuelType) =>
                [
                    GASOLINE,
                    DIESEL,
                    HYBRID,
                    CNG,
                ].includes(fuelType),

            then: (schema) =>
                schema.required(
                    "Cylinder count is required."
                ),

            otherwise: (schema) =>
                schema.nullable(),
        }),

    batteryCapacityKwh: Yup.number()
        .transform((value, originalValue) =>
            originalValue === ""
                ? null
                : value
        )
        .nullable()
        .min(
            0.01,
            "Battery capacity must be greater than 0."
        )
        .when("fuelType", {
            is: ELECTRIC,

            then: (schema) =>
                schema.required(
                    "Battery capacity is required."
                ),

            otherwise: (schema) =>
                schema.nullable(),
        }),

    mileageKm: Yup.number()
        .typeError("Mileage is required.")
        .integer(
            "Mileage must be a whole number."
        )
        .min(
            0,
            "Mileage cannot be negative."
        )
        .required("Mileage is required."),

    color: Yup.string()
        .trim()
        .max(
            25,
            "Color must not exceed 25 characters."
        )
        .nullable(),

    drivingPosition: Yup.string()
        .required(
            "Driving position is required."
        ),

    bodyType: Yup.string()
        .required("Body type is required."),

    doorCount: Yup.number()
        .typeError("Door count is required.")
        .integer()
        .min(
            1,
            "Door count must be at least 1."
        )
        .required("Door count is required."),

    seatCount: Yup.number()
        .typeError("Seat count is required.")
        .integer()
        .min(
            1,
            "Seat count must be at least 1."
        )
        .required("Seat count is required."),

    registrationNumber: Yup.string()
        .trim()
        .max(
            50,
            "Registration number must not exceed 50 characters."
        )
        .nullable(),

    accidentHistory: Yup.boolean(),

    serviceWarranty: Yup.boolean(),

    ownershipCount: Yup.number()
        .typeError(
            "Previous owner count is required."
        )
        .integer()
        .min(
            0,
            "Previous owner count cannot be negative."
        )
        .required(
            "Previous owner count is required."
        ),

    city: Yup.string()
        .trim()
        .max(
            50,
            "City must not exceed 50 characters."
        )
        .nullable(),

    images: Yup.array()
        .min(
            1,
            "Please select at least one image."
        )
        .max(
            5,
            "You can upload at most 5 images."
        ),
});